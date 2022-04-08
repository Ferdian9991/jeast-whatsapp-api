export = Message;
/**
 * Represents a Message on WhatsApp
 * @extends {Main}
 */
declare class Message extends Main {
    constructor(client: any, data: any);
    _data: any;
    /**
     * MediaKey that represents the sticker 'ID'
     * @type {string}
     */
    mediaKey: string;
    /**
     * ID that represents the message
     * @type {object}
     */
    id: object;
    /**
     * ACK status for the message
     * @type {string}
     */
    ack: string;
    /**
     * Indicates if the message has media available for download
     * @type {boolean}
     */
    hasMedia: boolean;
    /**
     * Message content
     * @type {string}
     */
    body: string;
    /**
     * Message type
     * @type {MessageTypes}
     */
    type: {
        TEXT: string;
        AUDIO: string;
        VOICE: string;
        IMAGE: string;
        VIDEO: string;
        DOCUMENT: string;
        STICKER: string;
        LOCATION: string; /**
         * Indicates if the message has media available for download
         * @type {boolean}
         */
        CONTACT_CARD: string;
        CONTACT_CARD_MULTI: string;
        ORDER: string;
        REVOKED: string;
        PRODUCT: string;
        UNKNOWN: string;
        GROUP_INVITE: string;
        LIST: string;
        LIST_RESPONSE: string;
        BUTTONS_RESPONSE: string;
        PAYMENT: string;
        BROADCAST_NOTIFICATION: string;
        CALL_LOG: string;
        CIPHERTEXT: string;
        DEBUG: string;
        E2E_NOTIFICATION: string;
        GP2: string;
        GROUP_NOTIFICATION: string; /**
         * ID for the Chat that this message was sent to, except if the message was sent by the current user.
         * @type {string}
         */
        HSM: string;
        INTERACTIVE: string;
        NATIVE_FLOW: string;
        NOTIFICATION: string;
        NOTIFICATION_TEMPLATE: string;
        OVERSIZED: string;
        PROTOCOL: string;
        REACTION: string;
        TEMPLATE_BUTTON_REPLY: string;
    };
    /**
     * Unix timestamp for when the message was created
     * @type {number}
     */
    timestamp: number;
    /**
     * ID for the Chat that this message was sent to, except if the message was sent by the current user.
     * @type {string}
     */
    from: string;
    /**
     * ID for who this message is for.
     *
     * If the message is sent by the current user, it will be the Chat to which the message is being sent.
     * If the message is sent by another user, it will be the ID for the current user.
     * @type {string}
     */
    to: string;
    /**
     * If the message was sent to a group, this field will contain the user that sent the message.
     * @type {string}
     */
    author: string;
    /**
     * String that represents from which device type the message was sent
     * @type {string}
     */
    deviceType: string;
    /**
     * Indicates if the message was forwarded
     * @type {boolean}
     */
    isForwarded: boolean;
    /**
     * Indicates how many times the message was forwarded.
     *
     * The maximum value is 127.
     * @type {number}
     */
    forwardingScore: number;
    /**
     * Indicates if the message is a status update
     * @type {boolean}
     */
    isStatus: boolean;
    /**
     * Indicates if the message was starred
     * @type {boolean}
     */
    isStarred: boolean;
    /**
     * Indicates if the message was a broadcast
     * @type {boolean}
     */
    broadcast: boolean;
    /**
     * Indicates if the message was sent by the current user
     * @type {boolean}
     */
    fromMe: boolean;
    /**
     * Indicates if the message was sent as a reply to another message.
     * @type {boolean}
     */
    hasQuotedMsg: boolean;
    /**
     * Indicates the duration of the message in seconds
     * @type {string}
     */
    duration: string;
    /**
     * Location information contained in the message, if the message is type "location"
     * @type {Location}
     */
    location: Location;
    /**
     * List of vCards contained in the message.
     * @type {Array<string>}
     */
    vCards: Array<string>;
    /**
     * Group Invite Data
     * @type {object}
     */
    inviteV4: object;
    /**
     * Indicates the mentions in the message body.
     * @type {Array<string>}
     */
    mentionedIds: Array<string>;
    /**
     * Order ID for message type ORDER
     * @type {string}
     */
    orderId: string;
    /**
     * Order Token for message type ORDER
     * @type {string}
     */
    token: string;
    /**
     * Indicates whether the message is a Gif
     * @type {boolean}
     */
    isGif: boolean;
    /**
     * Indicates if the message will disappear after it expires
     * @type {boolean}
     */
    isEphemeral: boolean;
    title: any;
    description: any;
    businessOwnerJid: any;
    productId: any;
    /**
     * Links included in the message.
     * @type {Array<{link: string, isSuspicious: boolean}>}
     *
     */
    links: {
        link: string;
        isSuspicious: boolean;
    }[];
    dynamicReplyButtons: any;
    selectedButtonId: any;
    selectedRowId: any;
    _getChatId(): string;
    /**
     * Reloads this Message object's data in-place with the latest values from WhatsApp Web.
     * Note that the Message must still be in the web app cache for this to work, otherwise will return null.
     * @returns {Promise<Message>}
     */
    reload(): Promise<Message>;
    /**
     * Returns message in a raw format
     * @type {Object}
     */
    get rawData(): any;
    /**
     * Returns the Chat this message was sent in
     * @returns {Promise<Chat>}
     */
    getChat(): Promise<Chat>;
    /**
     * Returns the Contact this message was sent from
     * @returns {Promise<Contact>}
     */
    getContact(): Promise<Contact>;
    /**
     * Returns the Contacts mentioned in this message
     * @returns {Promise<Array<Contact>>}
     */
    getMentions(): Promise<Array<Contact>>;
    /**
     * Returns the quoted message, if any
     * @returns {Promise<Message>}
     */
    getQuotedMessage(): Promise<Message>;
    /**
     * Sends a message as a reply to this message. If chatId is specified, it will be sent
     * through the specified Chat. If not, it will send the message
     * in the same Chat as the original message was sent.
     *
     * @param {string|MessageMedia|Location} content
     * @param {string} [chatId]
     * @param {MessageSendOptions} [options]
     * @returns {Promise<Message>}
     */
    reply(content: string | MessageMedia | Location, chatId?: string, options?: MessageSendOptions): Promise<Message>;
    /**
     * Accept Group V4 Invite
     * @returns {Promise<Object>}
     */
    acceptGroupV4Invite(): Promise<any>;
    /**
     * Forwards this message to another chat
     *
     * @param {string|Chat} chat Chat model or chat ID to which the message will be forwarded
     * @returns {Promise}
     */
    forward(chat: string | Chat): Promise<any>;
    /**
     * Downloads and returns the attatched message media
     * @returns {Promise<MessageMedia>}
     */
    downloadMedia(): Promise<MessageMedia>;
    /**
     * Deletes a message from the chat
     * @param {?boolean} everyone If true and the message is sent by the current user, will delete it for everyone in the chat.
     */
    delete(everyone: boolean | null): Promise<void>;
    /**
     * Stars this message
     */
    star(): Promise<void>;
    /**
     * Unstars this message
     */
    unstar(): Promise<void>;
    /**
     * Message Info
     * @typedef {Object} MessageInfo
     * @property {Array<{id: ContactId, t: number}>} delivery Contacts to which the message has been delivered to
     * @property {number} deliveryRemaining Amount of people to whom the message has not been delivered to
     * @property {Array<{id: ContactId, t: number}>} played Contacts who have listened to the voice message
     * @property {number} playedRemaining Amount of people who have not listened to the message
     * @property {Array<{id: ContactId, t: number}>} read Contacts who have read the message
     * @property {number} readRemaining Amount of people who have not read the message
     */
    /**
     * Get information about message delivery status. May return null if the message does not exist or is not sent by you.
     * @returns {Promise<?MessageInfo>}
     */
    getInfo(): Promise<{
        /**
         * Contacts to which the message has been delivered to
         */
        delivery: Array<{
            id: ContactId;
            t: number;
        }>;
        /**
         * Amount of people to whom the message has not been delivered to
         */
        deliveryRemaining: number;
        /**
         * Contacts who have listened to the voice message
         */
        played: Array<{
            id: ContactId;
            t: number;
        }>;
        /**
         * Amount of people who have not listened to the message
         */
        playedRemaining: number;
        /**
         * Contacts who have read the message
         */
        read: Array<{
            id: ContactId;
            t: number;
        }>;
        /**
         * Amount of people who have not read the message
         */
        readRemaining: number;
    }>;
    /**
     * Gets the order associated with a given message
     * @return {Promise<Order>}
     */
    getOrder(): Promise<Order>;
    /**
     * Gets the payment details associated with a given message
     * @return {Promise<Payment>}
     */
    getPayment(): Promise<Payment>;
}
import Main = require("./main.jeast");
import Location = require("./location.jeast");
import Chat = require("./chat.jeast");
import Contact = require("./contact.jeast");
import MessageMedia = require("./message-media.jeast");
import Order = require("./order.jeast");
import Payment = require("./payment.jeast");
