export = GroupNotification;
/**
 * Represents a GroupNotification on WhatsApp
 * @extends {Main}
 */
declare class GroupNotification extends Main {
    constructor(client: any, data: any);
    /**
     * ID that represents the groupNotification
     * @type {object}
     */
    id: object;
    /**
     * Extra content
     * @type {string}
     */
    body: string;
    /**
     * GroupNotification type
     * @type {Object}
     */
    type: any;
    /**
     * Unix timestamp for when the groupNotification was created
     * @type {number}
     */
    timestamp: number;
    /**
     * ID for the Chat that this groupNotification was sent for.
     *
     * @type {string}
     */
    chatId: string;
    /**
     * ContactId for the user that produced the GroupNotification.
     * @type {string}
     */
    author: string;
    /**
     * Contact IDs for the users that were affected by this GroupNotification.
     * @type {Array<string>}
     */
    recipientIds: Array<string>;
    /**
     * Returns the Chat this groupNotification was sent in
     * @returns {Promise<Chat>}
     */
    getChat(): Promise<Chat>;
    /**
     * Returns the Contact this GroupNotification was produced by
     * @returns {Promise<Contact>}
     */
    getContact(): Promise<Contact>;
    /**
     * Returns the Contacts affected by this GroupNotification.
     * @returns {Promise<Array<Contact>>}
     */
    getRecipients(): Promise<Array<Contact>>;
    /**
     * Sends a message to the same chat this GroupNotification was produced in.
     *
     * @param {string|MessageMedia|Location} content
     * @param {object} options
     * @returns {Promise<Message>}
     */
    reply(content: string | MessageMedia | Location, options?: object): Promise<Message>;
}
import Main = require("./main.jeast");
import Chat = require("./chat.jeast");
import Contact = require("./contact.jeast");
import MessageMedia = require("./message-media.jeast");
import Message = require("./message.jeast");
