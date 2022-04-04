const EventEmitter = require("events");
const fsp = require("fs").promises;
const { existsSync } = require("fs");
const qr_code_terminal = require("qrcode-terminal");
const moduleRaid = require("@pedroslopez/moduleraid/moduleraid");
const { Events, whatsappURL, ConnWAState } = require("./jeast-utils/config");
const { selectors } = require("./jeast-utils/selectors");
const { ExposeStore, LoadModule } = require("./jeast-utils/WAModule");
const {
  ClientInfo,
  Message,
  MessageMedia,
  Location,
  Buttons,
  List,
  GroupNotification,
  Contact,
  Chat,
  Call,
} = require("./jeast-models");
const { QR_CANVAS, QR_RETRY_BUTTON, QR_CONTAINER, MAIN_SELECTOR } = selectors;
const ContactMap = require("./jeast-tools/contact-map");
const ChatMap = require("./jeast-tools/chat-map");
const { ws } = require("./jeast-utils/ws");
const { getSession, setSession } = require("./jeast-utils/session");
const { join } = require("path");
const Util = require("./jeast-utils/JeastUtils");

const logger = (condition, message) => {
  if (condition) {
    console.log(message);
  }
};

class Jeast extends EventEmitter {
  constructor(clientPage, clientBrowser) {
    super();
    this.clientPage = null;
    this.clientBrowser = null;

    this.ev = {
      /**
       * Events Emitter
       * @param {Function} callback QR will passed with callbacck events
       * @returns {EventEmitter} QR will return the events that has been assigned with parameter
       */
      qr: (callback) => {
        this.on(Events.QR_RECEIVED, async (qr) => {
          callback(qr);
        });
      },

      /**
       * Events Emitter
       * @param {Function} callback Connection will passed with callbacck events
       * @returns {EventEmitter} Connection will return the events that has been assigned with parameter
       */
      connection: (callback) => {
        this.on(Events.CONNECTION, async (connection) => {
          callback(connection);
        });
      },

      /**
       * Events Emitter
       * @param {Function} callback Message will passed with callbacck events
       * @returns {EventEmitter} Message will return the events that has been assigned with parameter
       */
      message: (callback) => {
        this.on(Events.MESSAGE_RECEIVED, async (message) => {
          callback(message);
        });
      },

      /**
       * Events Emitter
       * @param {Function} callback Revoke me message will passed with callbacck events
       * @returns {EventEmitter} Message will return the events that has been assigned with parameter
       */
      revokeMe: (callback) => {
        this.on(Events.REVOKE_MESSAGE_ME, async (revoked_me) => {
          callback(revoked_me);
        });
      },

      /**
       * Events Emitter
       * @param {Function} callback Revoke all message will passed with callbacck events
       * @returns {EventEmitter} Message will return the events that has been assigned with parameter
       */
      revokeAll: (callback) => {
        this.on(Events.REVOKE_MESSAGE_EVERYONE, async (revoked_all) => {
          callback(revoked_all);
        });
      },

      /**
       * Events Emitter
       * @param {Function} callback Upload media message will passed with callbacck events
       * @returns {EventEmitter} Message will return the events that has been assigned with parameter
       */
      uploadMedia: (callback) => {
        this.on(Events.UPLOADED_MEDIA, async (uploadMedia) => {
          callback(uploadMedia);
        });
      },

      /**
       * Events Emitter
       * @param {Function} callback Incoming call event will passed with callbacck events
       * @returns {EventEmitter} Incoming call return the events that has been assigned with parameter
       */
      incomingCall: (callback) => {
        this.on(Events.INCOMING_CALL, async (call) => {
          callback(call);
        });
      },

      /**
       * Events Emitter
       * @param {Function} callback Message Ack message will passed with callbacck events
       * @returns {EventEmitter} Message will return the events that has been assigned with parameter
       */
      ackMessage: (callback) => {
        this.on(Events.MESSAGE_ACK, async (ack) => {
          callback(ack);
        });
      },

      group: {
        /**
         * Events Emitter
         * @param {Function} callback Group join action will passed with callbacck events
         * @returns {EventEmitter} Group join action return the events that has been assigned with parameter
         */
        join: (callback) => {
          this.on(Events.GROUP_JOIN, async (join) => {
            callback(join);
          });
        },

        /**
         * Events Emitter
         * @param {Function} callback Group leave action will passed with callbacck events
         * @returns {EventEmitter} Group leave action return the events that has been assigned with parameter
         */
        leave: (callback) => {
          this.on(Events.GROUP_LEAVE, async (leave) => {
            callback(leave);
          });
        },

        /**
         * Events Emitter
         * @param {Function} callback Group update action will passed with callbacck events
         * @returns {EventEmitter} Group update action return the events that has been assigned with parameter
         */
        update: (callback) => {
          this.on(Events.GROUP_UPDATE, async (update) => {
            callback(update);
          });
        },
      },
    };
  }

  /**
   *
   * @param {Object} options Passing with options!
   * @param {Boolean} options.qr_terminal Passing with boolean type to display qr code terminal
   * @param {Boolean} options.logger Passing with boolean type to display logs
   * @param {Boolean} options.headless Passing with boolean type to choose headless mode
   * @param {string} options.executablePath Passing with optional chrome path
   * @param {Object} options.authState Choose auth options
   * @param {Boolean} options.authState.isAuth Required for authentication if true
   * @param {string} options.authState.authType Select your auth type legacy or multidevice
   * @param {string} options.authState.authId Required if using legacy auth
   * @returns {EventEmitter}
   */
  async connect(
    options = {
      qr_terminal: false,
      executablePath,
      logger: true,
      headless: true,
      authState: { isAuth: true, authType: "legacy", authId: "" },
    }
  ) {
    options.headless == undefined
      ? (options.headless = true)
      : (options.headless = options.headless);

    options.logger == undefined
      ? (options.logger = true)
      : (options.logger = options.logger);

    if (typeof options.authState != "object") {
      throw new Error(`Auth state can't be null!!`);
    } else {
      if (options.authState.authId == "")
        throw new Error(`Auth id can't be null!!`);
    }

    const sessionDir = join(
      process.cwd(),
      `session/`,
      options.authState.authId + "_wa"
    );

    if (!existsSync(sessionDir)) {
      if (options.authState.isAuth)
        await fsp.mkdir(sessionDir, {
          recursive: true,
        });
    }

    const puppeteer = ws({
      sessionId: options.authState.isAuth && options.authState.authId,
      headless: options.headless,
      executablePath: options.executablePath,
    });

    const { page, browser } = await puppeteer;

    this.clientPage = page;
    this.clientBrowser = browser;

    if (
      existsSync(join(sessionDir, options.authState.authId + ".json")) &&
      options.authState.isAuth
    ) {
      logger(options.logger, "Session found, try to retrieve session!!");
      await setSession(page, options.authState.authId);
    } else {
      logger(options.logger, "Waiting for qr_code...");
    }

    await page.goto(whatsappURL, {
      waitUntil: "load",
      timeout: 0,
      referer: "https://whatsapp.com/",
    });

    logger(options.logger, "connecting...");

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

    if (isAuthentication) {
      if (existsSync(join(sessionDir, options.authState.authId + ".json"))) {
        logger(options.logger, "Your account has been disconnected!!");
        await this.destroy();
        await fsp.rm(sessionDir, {
          recursive: true,
          force: true,
        });
        return this.connect(options);
      }
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

    logger(options.logger, `Logged in as ${userinfo.pushname}`);

    await page.exposeFunction("onAddMessageEvent", (msg) => {
      if (msg.type === "gp2") {
        const notification = new GroupNotification(this, msg);
        if (msg.subtype === "add" || msg.subtype === "invite") {
          /**
           * Emitted when a user joins the chat via invite link or is added by an admin.
           * @event Client#group_join
           * @param {GroupNotification} notification GroupNotification with more information about the action
           */
          this.emit(Events.GROUP_INVITATION_JOIN, notification);
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

    let last_message;

    await page.exposeFunction("onChangeMessageTypeEvent", (msg) => {
      if (msg.type === "revoked") {
        const message = new Message(this, msg);
        let revoked_msg;
        if (last_message && msg.id.id === last_message.id.id) {
          revoked_msg = new Message(this, last_message);
        }

        /**
         * Emitted when a message is deleted for everyone in the chat.
         * @event Client#message_revoke_everyone
         * @param {Message} message The message that was revoked, in its current state. It will not contain the original message's data.
         * @param {?Message} revoked_msg The message that was revoked, before it was revoked. It will contain the message's original data.
         * Note that due to the way this data is captured, it may be possible that this param will be undefined.
         */
        this.emit(Events.REVOKE_MESSAGE_EVERYONE, message, revoked_msg);
      }
    });

    await page.exposeFunction("onChangeMessageEvent", (msg) => {
      if (msg.type !== "revoked") {
        last_message = msg;
      }
    });

    await page.exposeFunction("onRemoveMessageEvent", (msg) => {
      if (!msg.isNewMsg) return;

      const message = new Message(this, msg);

      /**
       * Emitted when a message is deleted by the current user.
       * @event Client#message_revoke_me
       * @param {Message} message The message that was revoked
       */
      this.emit(Events.REVOKE_MESSAGE_ME, message);
    });

    await page.exposeFunction("onMessageAckEvent", (msg, ack) => {
      const message = new Message(this, msg);

      /**
       * Emitted when an ack event occurrs on message type.
       * @event Client#message_ack
       * @param {Message} message The message that was affected
       * @param {MessageAck} ack The new ACK value
       */
      this.emit(Events.MESSAGE_ACK, message, ack);
    });

    await page.exposeFunction("onMessageMediaUploadedEvent", (msg) => {
      const message = new Message(this, msg);

      /**
       * Emitted when media has been uploaded for a message sent by the client.
       * @event Client#uploaded_media
       * @param {Message} message The message with media that was uploaded
       */
      this.emit(Events.UPLOADED_MEDIA, message);
    });

    await page.exposeFunction("onIncomingCall", (call) => {
      /**
       * Emitted when a call is received
       * @event Client#incoming_call
       * @param {object} call
       * @param {number} call.id - Call id
       * @param {string} call.peerJid - Who called
       * @param {boolean} call.isVideo - if is video
       * @param {boolean} call.isGroup - if is group
       * @param {boolean} call.canHandleLocally - if we can handle in waweb
       * @param {boolean} call.outgoing - if is outgoing
       * @param {boolean} call.webClientShouldHandle - If Waweb should handle
       * @param {object} call.participants - Participants
       */
      const callPayload = new Call(this, call);
      this.emit(Events.INCOMING_CALL, callPayload);
    });

    await page.evaluate(() => {
      window.Store.Msg.on("change", (msg) => {
        window.onChangeMessageEvent(window.JWeb.getMessageModel(msg));
      });
      window.Store.Msg.on("change:type", (msg) => {
        window.onChangeMessageTypeEvent(window.JWeb.getMessageModel(msg));
      });
      window.Store.Msg.on("change:ack", (msg, ack) => {
        window.onMessageAckEvent(window.JWeb.getMessageModel(msg), ack);
      });
      window.Store.Msg.on("change:isUnsentMedia", (msg, unsent) => {
        if (msg.id.fromMe && !unsent)
          window.onMessageMediaUploadedEvent(window.JWeb.getMessageModel(msg));
      });
      window.Store.Msg.on("remove", (msg) => {
        if (msg.isNewMsg)
          window.onRemoveMessageEvent(window.JWeb.getMessageModel(msg));
      });
      window.Store.Call.on("add", (call) => {
        window.onIncomingCall(call);
      });
      window.Store.Msg.on("add", (msg) => {
        if (msg.isNewMsg) {
          if (msg.type === "ciphertext") {
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
          await fsp.rm(sessionDir, {
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
      sendMediaAsSticker: options.sendAsSticker,
      sendMediaAsDocument: options.sendAsDocument,
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

  /**
   * Get all contacts
   * @returns {Promise<Array<Contact>>}
   */
  async getContacts() {
    let contacts = await this.clientPage.evaluate(() => {
      return window.JWeb.getContacts();
    });

    return contacts.map((contact) => ContactMap.create(this, contact));
  }

  /**
   * Get contact by ID
   * @param {string} contactId
   * @returns {Promise<Contact>}
   */

  async getContactById(contactId) {
    let contact = await this.clientPage.evaluate((contactId) => {
      return window.JWeb.getContact(contactId);
    }, contactId);

    return ContactMap.create(this, contact);
  }

  /**
   * Gets the current connection state for the client
   * @returns {ConnWAState}
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

  /**
   * Searches for messages
   * @param {string} query
   * @param {Object} [options]
   * @param {number} [options.page]
   * @param {number} [options.limit]
   * @param {string} [options.chatId]
   * @returns {Promise<Message[]>}
   */
  async searchMessages(query, options = {}) {
    const messages = await this.clientPage.evaluate(
      async (query, page, count, remote) => {
        const { messages } = await window.Store.Msg.search(
          query,
          page,
          count,
          remote
        );
        return messages.map((msg) => window.JWeb.getMessageModel(msg));
      },
      query,
      options.page,
      options.limit,
      options.chatId
    );

    return messages.map((msg) => new Message(this, msg));
  }

  /**
   * Get all current chat instances
   * @returns {Promise<Array<Chat>>}
   */
  async getChats() {
    let chats = await this.clientPage.evaluate(async () => {
      return await window.JWeb.getChats();
    });

    return chats.map((chat) => ChatMap.create(this, chat));
  }

  /**
   * Returns the version of WhatsApp Web
   * @returns {Promise<string>}
   */
  async getWAVersion() {
    return await this.clientPage.evaluate(() => {
      return window.Debug.VERSION;
    });
  }

  /**
   * Mark as seen for the Chat
   *  @param {string} chatId
   *  @returns {Promise<boolean>} result
   *
   */
  async sendMessageSeen(chatId) {
    const result = await this.clientPage.evaluate(async (chatId) => {
      return await window.JWeb.sendSeen(chatId);
    }, chatId);
    return await result;
  }

  /**
   * Get chat instance by ID
   * @param {string} chatId
   * @returns {Promise<Chat>}
   */
  async getChatById(chatId) {
    let chat = await this.clientPage.evaluate(async (chatId) => {
      return await window.JWeb.getChat(chatId);
    }, chatId);

    return ChatMap.create(this, chat);
  }

  async getPhoneId(number) {
    if (!number.endsWith("@c.us")) {
      number += "@c.us";
    }

    return await this.clientPage.evaluate(async (number) => {
      const result = await window.Store.QueryExist(number);
      if (!result || result.wid === undefined) return null;
      return result.wid;
    }, number);
  }

  /**
   * Get the country code.
   * @param {string} number Number or ID
   * @returns {Promise<string>}
   */
  async getPhoneCountry(number) {
    number = number.replace(" ", "").replace("+", "").replace("@c.us", "");

    return await this.clientPage.evaluate(async (numberId) => {
      return window.Store.NumberInfo.findCC(numberId);
    }, number);
  }

  /**
   * Create a new group
   * @param {string} name group title
   * @param {Array<Contact|string>} participants an array of Contacts or contact IDs to add to the group
   * @returns {Object} createNewGroup
   * @returns {string} createNewGroup.gid - ID for the group that was just created
   * @returns {Object.<string,string>} createNewGroup.missingParticipants - participants that were not added to the group.
   */
  async createNewGroup(name, participants) {
    if (!Array.isArray(participants) || participants.length == 0) {
      throw "You need to add at least one other participant to the group";
    }

    if (participants.every((contact) => contact instanceof Contact)) {
      participants = participants.map((contact) => contact.id._serialized);
    }

    const createRes = await this.clientPage.evaluate(
      async (name, participantIds) => {
        const participantWIDs = participantIds.map((participant) =>
          window.Store.WidFactory.createWid(participant)
        );
        const id = window.Store.MsgKey.newId();
        const res = await window.Store.GroupUtils.sendCreateGroup(
          name,
          participantWIDs,
          undefined,
          id
        );
        return res;
      },
      name,
      participants
    );

    const missingParticipants = createRes.participants.reduce(
      (missing, contact) => {
        const id = Object.keys(contact)[0];
        const statusCode = contact[id].code;
        if (statusCode != 200)
          return Object.assign(missing, { [id]: statusCode });
        return missing;
      },
      {}
    );

    return { gid: createRes.gid, missingParticipants };
  }

  /**
   * Get the formatted number.
   * @param {string} number Number or ID
   * @returns {Promise<string>}
   */
  async getFormattedPhone(number) {
    if (!number.endsWith("@s.whatsapp.net"))
      number = number.replace("c.us", "s.whatsapp.net");
    if (!number.includes("@s.whatsapp.net"))
      number = `${number}@s.whatsapp.net`;

    return await this.clientPage.evaluate(async (numberId) => {
      return window.Store.NumberInfo.formattedPhoneNumber(numberId);
    }, number);
  }

  /**
   * Returns an object with information about the invite code's group
   * @param {string} invitationCode
   * @returns {Promise<object>} Invite information
   */
  async invitationInfo(invitationCode) {
    return await this.clientPage.evaluate((invitationCode) => {
      return window.Store.InviteInfo.sendQueryGroupInvite(invitationCode);
    }, invitationCode);
  }

  /**
   * Accepts an invitation to join a group
   * @param {string} invitationCode Invitation code
   * @returns {Promise<string>} Id of the joined Chat
   */
  async acceptInvite(invitationCode) {
    const chatId = await this.clientPage.evaluate(async (invitationCode) => {
      return await window.Store.Invite.sendJoinGroupViaInvite(invitationCode);
    }, invitationCode);

    return chatId._serialized;
  }

  /**
   * Accepts a private invitation to join a group
   * @param {object} inviteInfo Invite V4 Info
   * @returns {Promise<Object>}
   */
  async acceptGroupInvitationV4(inviteInfo) {
    if (!inviteInfo.invitationCode) throw "Invalid invite code!!";
    if (inviteInfo.invitationCodeExp == 0) throw "Invitation code expired!!";
    return this.clientPage.evaluate(async (inviteInfo) => {
      let { groupId, fromId, invitationCode, invitationCodeExp } = inviteInfo;
      return await window.Store.JoinInviteV4.sendJoinGroupViaInviteV4(
        invitationCode,
        String(invitationCodeExp),
        groupId,
        fromId
      );
    }, inviteInfo);
  }

  /**
   * Sets the current user's status info
   * @param {string} status New status info
   */
  async setStatusInfo(status) {
    await this.clientPage.evaluate(async (status) => {
      return await window.Store.StatusUtils.setMyStatus(status);
    }, status);
  }

  /**
   * Marks the client as online
   */
  async sendOnlineStatus() {
    return await this.clientPage.evaluate(() => {
      return window.Store.PresenceStatus.sendPresenceAvailable();
    });
  }

  /**
   * Marks the client as unavailable
   */
  async sendOfflineStatus() {
    return await this.clientPage.evaluate(() => {
      return window.Store.PresenceStatus.sendPresenceUnavailable();
    });
  }

  /**
   * Returns the contact ID's
   * @param {string} contactId user's ID
   * @returns {Promise<string>}
   */
  async getPictUrl(contactId) {
    const profilePic = await this.clientPage.evaluate(async (contactId) => {
      try {
        const chatWid = window.Store.WidFactory.createWid(contactId);
        return await window.Store.ProfilePic.profilePicFind(chatWid);
      } catch (err) {
        if (err.name === "ServerStatusCodeError") return undefined;
        throw err;
      }
    }, contactId);

    return profilePic ? profilePic.eurl : undefined;
  }
}

module.exports = Jeast;
