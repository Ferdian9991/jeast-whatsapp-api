const EventEmitter = require("events");
const fsp = require("fs").promises;
const { existsSync, unlinkSync, rmSync } = require("fs");
const qr_code_terminal = require("qrcode-terminal");
const moduleRaid = require("@pedroslopez/moduleraid/moduleraid");
const {
  Events,
  whatsappURL,
  sendMessageURL,
  ConnWAState,
} = require("./jeast-utils/config");
const { selectors } = require("./jeast-utils/selectors");
const { ExposeStore, LoadModule } = require("./jeast-utils/WAModule");
const {
  ClientInfo,
  Message,
  MessageMedia,
  Location,
  Buttons,
  List,
  Contact,
} = require("./jeast-models");
const { QR_CANVAS, QR_RETRY_BUTTON, QR_CONTAINER, MAIN_SELECTOR } = selectors;
const ContactMap = require("./jeast-tools/contact-map");
const { ws } = require("./jeast-utils/ws");
const { getSession, setSession } = require("./jeast-utils/session");
const { join } = require("path");

const logger = (condition, message) => {
  condition && console.log(message);
};

class Jeast extends EventEmitter {
  constructor(clientPage, clientBrowser) {
    super();
    this.clientPage = null;
    this.clientBrowser = null;
  }

  /**
   *
   * @param {Object} options Passing with options!
   * @param {Boolean} options.qr_terminal Passing with boolean type to display qr code terminal
   * @param {Boolean} options.log Passing with boolean type to display logs
   * @param {Object} options.authState Choose auth options
   * @param {Boolean} options.authState.isAuth Required for authentication if true
   * @param {string} options.authState.authType Select your auth type legacy or multidevice
   * @param {string} options.authState.authId Required if using legacy auth
   * @returns {EventEmitter}
   */
  async connect(
    options = {
      qr_terminal: false,
      log: true,
      authState: { isAuth: true, authType: "legacy", authId: "" },
    }
  ) {
    if (typeof options.authState != "object") {
      throw new Error(`Auth state can't be null!!`);
    } else {
      if (options.authState.authId == "")
        throw new Error(`Auth id can't be null!!`);
    }

    const sessionDir = join(
      __dirname,
      `../session/`,
      options.authState.authId + "_wa"
    );

    if (!existsSync(sessionDir)) {
      await fsp.mkdir(sessionDir, {
        recursive: true,
      });
    }

    const puppeteer = ws(
      whatsappURL,
      options.authState.isAuth && options.authState.authId
    );

    const { page, browser } = await puppeteer;

    this.clientPage = page;
    this.clientBrowser = browser;

    if (
      existsSync(join(sessionDir, options.authState.authId + ".json")) &&
      options.authState.isAuth
    ) {
      console.log("Session found, try to retrieve session!!");
      await setSession(page, options.authState.authId);
    }

    await page.goto(whatsappURL, {
      waitUntil: "load",
      timeout: 0,
      referer: "https://whatsapp.com/",
    });

    const isAuthentication = await Promise.race([
      new Promise((resolve) => {
        page
          .waitForSelector(MAIN_SELECTOR, {
            timeout: 0,
          })
          .then(() => resolve(false))
          .catch((err) => resolve(err));
      }),
      new Promise((resolve) => {
        page
          .waitForSelector(QR_CANVAS, {
            timeout: 0,
          })
          .then(() => resolve(true))
          .catch((err) => resolve(err));
      }),
    ]);

    /**
     *
     * @param {Object} connection
     * @param {Boolean} connection.isConnected
     * @param {Object} connection.driver
     * @param {page} connection.driver.page
     * @param {browser} connection.driver.browser
     */

    const isConnected = (connection) => {
      this.emit(Events.CONNECTION, connection);
    };

    logger(options.log, "connecting...");

    if (isAuthentication) {
      let retries = 0;
      await page.exposeFunction("qrChanged", async (qr) => {
        this.emit(Events.QR_RECEIVED, qr);

        options.qr_terminal &&
          qr_code_terminal.generate(qr, {
            small: true,
          });

        if (0 > 0) {
          retries++;
          if (retries > 0) {
            this.emit(Events.DISCONNECTED, "Max qrcode retries reached");
            await this.destroy();
          }
        }
      });
      await page.evaluate(
        ({ QR_CONTAINER, QR_RETRY_BUTTON }) => {
          const qrCode = document.querySelector(QR_CONTAINER);
          window.qrChanged(qrCode.dataset.ref);

          const observer = new MutationObserver((muts) => {
            muts.forEach((mut) => {
              if (
                mut.type === "attributes" &&
                mut.attributeName === "data-ref"
              ) {
                window.qrChanged(mut.target.dataset.ref);
              } else if (mut.type === "childList") {
                const retry_button = document.querySelector(QR_RETRY_BUTTON);
                if (retry_button) retry_button.click();
              }
            });
          });
          observer.observe(qrCode.parentElement, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ["data-ref"],
          });
        },
        { QR_CONTAINER, QR_RETRY_BUTTON }
      );

      let isLoggedIn = false;
      isConnected({
        isConnected: false,
      });

      await page.waitForSelector(MAIN_SELECTOR, { timeout: 0 });
      isLoggedIn = (await page.$(MAIN_SELECTOR)) != null && true;
      await page.waitForTimeout(2000);

      if (isLoggedIn && options.authState.isAuth) {
        await getSession(page, options.authState.authId);
      }
    }

    await page.evaluate(ExposeStore, moduleRaid.toString());

    await page.evaluate(LoadModule);

    const userinfo = new ClientInfo(
      this,
      await page.evaluate(() => {
        return {
          ...window.Store.Conn.serialize(),
        };
      })
    );

    console.log(`Logged in as ${userinfo.pushname}`);

    await page.exposeFunction("onAddMessageEvent", (msg) => {
      if (msg.type === "gp2") {
        const notification = new GroupNotification(this, msg);
        if (msg.subtype === "add" || msg.subtype === "invite") {
          /**
           * Emitted when a user joins the chat via invite link or is added by an admin.
           * @event Client#group_join
           * @param {GroupNotification} notification GroupNotification with more information about the action
           */
          this.emit(Events.GROUP_JOIN, notification);
        } else if (msg.subtype === "remove" || msg.subtype === "leave") {
          /**
           * Emitted when a user leaves the chat or is removed by an admin.
           * @event Client#group_leave
           * @param {GroupNotification} notification GroupNotification with more information about the action
           */
          this.emit(Events.GROUP_LEAVE, notification);
        } else {
          /**
           * Emitted when group settings are updated, such as subject, description or picture.
           * @event Client#group_update
           * @param {GroupNotification} notification GroupNotification with more information about the action
           */
          this.emit(Events.GROUP_UPDATE, notification);
        }
        return;
      }

      const message = new Message(this, msg);

      /**
       * Emitted when a new message is created
       * @event Client#message_create
       * @param {Message} message The message that was created
       */
      this.emit(Events.MESSAGE_CREATE, message);

      if (msg.id.fromMe) return;

      /**
       * Emitted when a new message is received.
       * @event Client#message
       * @param {Message} message The message that was received
       */
      this.emit(Events.MESSAGE_RECEIVED, message);
    });

    await page.evaluate(() => {
      window.Store.Msg.on("add", (msg) => {
        if (msg.isNewMsg) {
          if (msg.type === "ciphertext") {
            // defer message event until ciphertext is resolved (type changed)
            msg.once("change:type", (_msg) =>
              window.onAddMessageEvent(window.JWeb.getMessageModel(_msg))
            );
          } else {
            window.onAddMessageEvent(window.JWeb.getMessageModel(msg));
          }
        }
      });
    });

    isConnected({
      isConnected: true,
    });

    page.on("framenavigated", async () => {
      const appState = await this.getState();
      if (!appState || appState === ConnWAState.PAIRING) {
        this.emit(Events.DISCONNECTED, "NAVIGATION");
        await this.destroy();
        if (existsSync(sessionDir)) {
          rmSync(sessionDir, {
            recursive: true,
            force: true,
          });
        }
      }
    });
  }

  /**
   * Send a message to a specific chatId
   * @param {string} chatId
   * @param {string|MessageMedia|Location|Contact|Array<Contact>|Buttons|List} content
   * @param {MessageSendOptions} [options] - Options used when sending the message
   *
   * @returns {Promise<Message>} Message that was just sent
   */
  async sendMessage(chatId, content, options = {}) {
    let internalOptions = {
      linkPreview: options.linkPreview === false ? undefined : true,
      sendAudioAsVoice: options.sendAudioAsVoice,
      sendVideoAsGif: options.sendVideoAsGif,
      sendMediaAsSticker: options.sendMediaAsSticker,
      sendMediaAsDocument: options.sendMediaAsDocument,
      caption: options.caption,
      quotedMessageId: options.quotedMessageId,
      parseVCards: options.parseVCards === false ? false : true,
      mentionedJidList: Array.isArray(options.mentions)
        ? options.mentions.map((contact) => contact.id._serialized)
        : [],
      extraOptions: options.extra,
    };

    const sendSeen =
      typeof options.sendSeen === "undefined" ? true : options.sendSeen;

    if (content instanceof MessageMedia) {
      internalOptions.attachment = content;
      content = "";
    } else if (options.media instanceof MessageMedia) {
      internalOptions.attachment = options.media;
      internalOptions.caption = content;
      content = "";
    } else if (content instanceof Location) {
      internalOptions.location = content;
      content = "";
    } else if (content instanceof Contact) {
      internalOptions.contactCard = content.id._serialized;
      content = "";
    } else if (
      Array.isArray(content) &&
      content.length > 0 &&
      content[0] instanceof Contact
    ) {
      internalOptions.contactCardList = content.map(
        (contact) => contact.id._serialized
      );
      content = "";
    } else if (content instanceof Buttons) {
      if (content.type !== "chat") {
        internalOptions.attachment = content.body;
      }
      internalOptions.buttons = content;
      content = "";
    } else if (content instanceof List) {
      internalOptions.list = content;
      content = "";
    }

    if (internalOptions.sendMediaAsSticker && internalOptions.attachment) {
      internalOptions.attachment = await Util.formatToWebpSticker(
        internalOptions.attachment,
        {
          name: options.stickerName,
          author: options.stickerAuthor,
          categories: options.stickerCategories,
        },
        this.clientPage
      );
    }

    const newMessage = await this.clientPage.evaluate(
      async (chatId, message, options, sendSeen) => {
        const chatWid = window.Store.WidFactory.createWid(chatId);
        const chat = await window.Store.Chat.find(chatWid);

        if (sendSeen) {
          window.JWeb.sendSeen(chatId);
        }

        const msg = await window.JWeb.sendMessage(
          chat,
          message,
          options,
          sendSeen
        );
        return msg.serialize();
      },
      chatId,
      content,
      internalOptions,
      sendSeen
    );

    return new Message(this, newMessage);
  }

  async getContacts() {
    let contacts = await this.clientPage.evaluate(() => {
      return window.JWeb.getContacts();
    });

    return contacts.map((contact) => ContactMap.create(this, contact));
  }

  /**
   * Gets the current connection state for the client
   * @returns {WAState}
   */
  async getState() {
    return await this.clientPage.evaluate(() => {
      if (!window.Store) return null;
      return window.Store.AppState.state;
    });
  }

  async logout() {
    await this.clientPage.evaluate(() => {
      return window.Store.AppState.logout();
    });
  }

  /**
   * Closes the jeast
   */
  async destroy() {
    await this.clientBrowser.close();
  }
}

module.exports = Jeast;
