export = Jeast;
declare class Jeast extends EventEmitter {
    constructor(clientPage: any, clientBrowser: any);
    clientPage: any;
    clientBrowser: any;
    ev: {
        /**
         * Events Emitter
         * @param {Function} callback QR will passed with callback events
         * @returns {EventEmitter} QR will return the events that has been assigned with parameter
         */
        qr: (callback: Function) => EventEmitter;
        /**
         * Events Emitter
         * @param {Function} callback Connection will passed with callback events
         * @returns {EventEmitter} Connection will return the events that has been assigned with parameter
         */
        connection: (callback: Function) => EventEmitter;
        /**
         * Events Emitter
         * @param {Function} callback Message will passed with callback events
         * @returns {EventEmitter} Message will return the events that has been assigned with parameter
         */
        message: (callback: Function) => EventEmitter;
        /**
         * Events Emitter
         * @param {Function} callback Revoke me message will passed with callback events
         * @returns {EventEmitter} Message will return the events that has been assigned with parameter
         */
        revokeMe: (callback: Function) => EventEmitter;
        /**
         * Events Emitter
         * @param {Function} callback Revoke all message will passed with callback events
         * @returns {EventEmitter} Message will return the events that has been assigned with parameter
         */
        revokeAll: (callback: Function) => EventEmitter;
        /**
         * Events Emitter
         * @param {Function} callback Upload media message will passed with callback events
         * @returns {EventEmitter} Message will return the events that has been assigned with parameter
         */
        uploadMedia: (callback: Function) => EventEmitter;
        /**
         * Events Emitter
         * @param {Function} callback Incoming call event will passed with callback events
         * @returns {EventEmitter} Incoming call return the events that has been assigned with parameter
         */
        incomingCall: (callback: Function) => EventEmitter;
        /**
         * Events Emitter
         * @param {Function} callback Message Ack message will passed with callback events
         * @returns {EventEmitter} Message will return the events that has been assigned with parameter
         */
        ackMessage: (callback: Function) => EventEmitter;
        /**
         * Events Emitter
         * @param {Function} callback New message action will passed with callback events
         * @returns {EventEmitter} This action return the events that has been assigned with parameter
         */
        newMessage: (callback: Function) => EventEmitter;
        group: {
            /**
             * Events Emitter
             * @param {Function} callback Group join action will passed with callback events
             * @returns {EventEmitter} Group join action return the events that has been assigned with parameter
             */
            join: (callback: Function) => EventEmitter;
            /**
             * Events Emitter
             * @param {Function} callback Group leave action will passed with callback events
             * @returns {EventEmitter} Group leave action return the events that has been assigned with parameter
             */
            leave: (callback: Function) => EventEmitter;
            /**
             * Events Emitter
             * @param {Function} callback Group update action will passed with callback events
             * @returns {EventEmitter} Group update action return the events that has been assigned with parameter
             */
            update: (callback: Function) => EventEmitter;
        };
        /**
         * Events Emitter
         * @param {Function} callback State update action will passed with callback events
         * @returns {EventEmitter} State update action return the events that has been assigned with parameter
         */
        changeState: (callback: Function) => EventEmitter;
    };
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
    connect(options?: {
        qr_terminal: boolean;
        logger: boolean;
        headless: boolean;
        executablePath: string;
        authState: {
            isAuth: boolean;
            authType: string;
            authId: string;
        };
    }): EventEmitter;
    /**
     * Send a message to a specific chatId
     * @param {string} chatId
     * @param {string|MessageMedia|Location|Contact|Array<Contact>|Buttons|List} content
     * @param {MessageSendOptions} [options] - Options used when sending the message
     *
     * @returns {Promise<Message>} Message that was just sent
     */
    sendMessage(chatId: string, content: string | typeof import("./jeast-models/message-media.jeast") | Location | typeof import("./jeast-models/contact.jeast") | Array<typeof import("./jeast-models/contact.jeast")> | typeof import("./jeast-models/buttons.jeast") | typeof import("./jeast-models/list.jeast.js"), options?: MessageSendOptions): Promise<typeof import("./jeast-models/message.jeast")>;
    /**
     * Get current Labels
     * @returns {Promise<Array<Label>>}
     */
    getLabels(): Promise<Array<typeof import("./jeast-models/label.jeast")>>;
    /**
     * Get Label instance by ID
     * @param {string} labelId
     * @returns {Promise<Label>}
     */
    getLabelById(labelId: string): Promise<typeof import("./jeast-models/label.jeast")>;
    /**
     * Get all Chats for a specific Label
     * @param {string} labelId
     * @returns {Promise<Array<Chat>>}
     */
    getChatsByLabel(labelId: string): Promise<Array<typeof import("./jeast-models/chat.jeast")>>;
    /**
     * Gets all blocked contacts by host account
     * @returns {Promise<Array<Contact>>}
     */
    getBlocked(): Promise<Array<typeof import("./jeast-models/contact.jeast")>>;
    /**
     * Get all contacts
     * @returns {Promise<Array<Contact>>}
     */
    getContacts(): Promise<Array<typeof import("./jeast-models/contact.jeast")>>;
    /**
     * Get contact by ID
     * @param {string} contactId
     * @returns {Promise<Contact>}
     */
    getContactById(contactId: string): Promise<typeof import("./jeast-models/contact.jeast")>;
    /**
     * This actions will return boolean
     * @returns {Promise<boolean>}
     */
    addToArchive(chatId: any): Promise<boolean>;
    /**
     * This actions will return boolean
     * @returns {Promise<boolean>}
     */
    removeFromArchive(chatId: any): Promise<boolean>;
    /**
     * Gets the current connection state for the client
     * @returns {Promise<ConnWAState>}
     */
    getState(): Promise<{
        CONFLICT: string;
        CONNECTED: string;
        DEPRECATED_VERSION: string;
        OPENING: string;
        PAIRING: string;
        PROXYBLOCK: string;
        SMB_TOS_BLOCK: string;
        TIMEOUT: string;
        TOS_BLOCK: string;
        UNLAUNCHED: string;
        UNPAIRED: string;
        UNPAIRED_IDLE: string;
    }>;
    logout(): Promise<void>;
    /**
     * Closes the jeast
     */
    destroy(): Promise<void>;
    /**
     * Searches for messages
     * @param {string} query
     * @param {Object} [options]
     * @param {number} [options.page]
     * @param {number} [options.limit]
     * @param {string} [options.chatId]
     * @returns {Promise<Message[]>}
     */
    searchMessages(query: string, options?: {
        page?: number;
        limit?: number;
        chatId?: string;
    }): Promise<typeof import("./jeast-models/message.jeast")[]>;
    /**
     * Get all current chat instances
     * @returns {Promise<Array<Chat>>}
     */
    getChats(): Promise<Array<typeof import("./jeast-models/chat.jeast")>>;
    /**
     * Returns the version of WhatsApp Web
     * @returns {Promise<string>}
     */
    getWAVersion(): Promise<string>;
    /**
     * Mark as seen for the Chat
     *  @param {string} chatId
     *  @returns {Promise<boolean>} result
     *
     */
    sendMessageSeen(chatId: string): Promise<boolean>;
    /**
     * Get chat instance by ID
     * @param {string} chatId
     * @returns {Promise<Chat>}
     */
    getChatById(chatId: string): Promise<typeof import("./jeast-models/chat.jeast")>;
    getPhoneId(number: any): Promise<any>;
    /**
     * Get the country code.
     * @param {string} number Number or ID
     * @returns {Promise<string>}
     */
    getPhoneCountry(number: string): Promise<string>;
    /**
     * Create a new group
     * @param {string} name group title
     * @param {Array<Contact|string>} participants an array of Contacts or contact IDs to add to the group
     * @returns {Object} createNewGroup
     * @returns {string} createNewGroup.gid - ID for the group that was just created
     * @returns {Object.<string,string>} createNewGroup.missingParticipants - participants that were not added to the group.
     */
    createNewGroup(name: string, participants: Array<typeof import("./jeast-models/contact.jeast") | string>): any;
    /**
     * Get the formatted number.
     * @param {string} number Number or ID
     * @returns {Promise<string>}
     */
    getFormattedPhone(number: string): Promise<string>;
    /**
     * Returns an object with information about the invite code's group
     * @param {string} invitationCode
     * @returns {Promise<object>} Invite information
     */
    invitationInfo(invitationCode: string): Promise<object>;
    /**
     * Accepts an invitation to join a group
     * @param {string} invitationCode Invitation code
     * @returns {Promise<string>} Id of the joined Chat
     */
    acceptInvite(invitationCode: string): Promise<string>;
    /**
     * Accepts a private invitation to join a group
     * @param {object} inviteInfo Invite V4 Info
     * @returns {Promise<Object>}
     */
    acceptGroupInvitationV4(inviteInfo: object): Promise<any>;
    /**
     * Sets the current user's status info
     * @param {string} status New status info
     */
    setStatusInfo(status: string): Promise<void>;
    /**
     * Marks the client as online
     */
    sendOnlineStatus(): Promise<any>;
    /**
     * Marks the client as unavailable
     */
    sendOfflineStatus(): Promise<any>;
    /**
     * Returns the contact ID's
     * @param {string} contactId user's ID
     * @returns {Promise<string>}
     */
    getPictUrl(contactId: string): Promise<string>;
    /**
     * Pins the Chat By Id
     * @returns {Promise<boolean>} New pin state
     */
    pinChatById(chatId: any): Promise<boolean>;
    /**
     * Unpins the Chat
     * @returns {Promise<boolean>} New Unpin state
     */
    unpinChatById(chatId: any): Promise<boolean>;
    /**
     * Mutes this chat forever, unless a date is specified
     * @param {string} chatId ID of the chat that will be muted
     * @param {?Date} unmuteDate Date when the chat will be unmuted, leave as is to mute forever
     */
    muteChat(chatId: string, unmuteDate: Date | null): Promise<void>;
    /**
     * Unmutes the Chat
     * @param {string} chatId ID of the chat that will be unmuted
     */
    unmuteChat(chatId: string): Promise<void>;
    /**
     * Mark the Chat as unread
     * @param {string} chatId ID of the chat that will be marked as unread
     */
    markChatAsUnread(chatId: string): Promise<void>;
    /**
     * Check if id already registered on whatsapp
     * @param {string} id the whatsapp user ID
     * @returns {Promise<Boolean>}
     */
    registeredId(id: string): Promise<boolean>;
    /**
     * Will give a delay effect on every action
     * @param {string} time
     * @returns {Promise}
     */
    delay(time: string): Promise<any>;
}
import EventEmitter = require("events");
import { Location } from "./jeast-models";
