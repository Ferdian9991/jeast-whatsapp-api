const EventEmitter = require("events");
const fsp = require("fs").promises;
const { existsSync } = require("fs");
const qr_code_terminal = require("qrcode-terminal");
const moduleRaid = require("@pedroslopez/moduleraid/moduleraid");
const { Events, whatsappURL, sendMessageURL } = require("./jeast-utils/config");
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
} = require("./models");
const {
  QR_CANVAS,
  QR_RETRY_BUTTON,
  QR_CONTAINER,
  MAIN_SELECTOR,
  SEND_MESSAGE_BUTTON,
} = selectors;
const { ws } = require("./jeast-utils/ws");
const { getSession, setSession } = require("./jeast-utils/session");
const { join } = require("path");

const logger = (condition, message) => {
  condition && console.log(message);
};

class Jeast extends EventEmitter {
  constructor(pupPage) {
    super();
    this.pupPage = ws(whatsappURL);
  }

  /**
   *
   * @param {Object} options Passing with options!
   * @param {Boolean} options.qr_terminal Passing with boolean type to display qr code terminal
   * @param {Boolean} options.log Passing with boolean type to display logs
   * @returns {EventEmitter}
   */
  async connect(options = { qr_terminal: false, log: true, authState }) {
    const sessionDir = join(
      __dirname,
      `../session/`,
      options.authState + ".json"
    );
    if (!existsSync(sessionDir)) {
      await fsp.mkdir(join(__dirname, `../session/`), {
        recursive: true,
      });
    }

    const { page, browser } = await this.pupPage;

    if (existsSync(sessionDir)) {
      await setSession(page, options.authState);
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

      if (isLoggedIn) {
        const storage = await getSession(page, options.authState);
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
       * Emitted when a new message is created, which may include the current user's own messages.
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
    const { page } = await this.pupPage;

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
        this.pupPage
      );
    }

    const newMessage = await page.evaluate(
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

  // async sendMessage(option = { phone, message }) {
  //   const endpoint = sendMessageURL(option.message, option.phone);
  //   logger(true, "sending message...");
  //   const { page } = await this.pupPage;

  //   await page.goto(endpoint, { timeout: 0 });

  //   await page.waitForSelector(SEND_MESSAGE_BUTTON);
  //   await page.waitForTimeout(2000);
  //   const send = await page.$(SEND_MESSAGE_BUTTON);

  //   await send.click();
  // }
}

module.exports = Jeast;
