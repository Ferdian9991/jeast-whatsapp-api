export = Chat;
/**
 * Represents a Chat on WhatsApp
 * @extends {Main}
 */
declare class Chat extends Main {
    constructor(client: any, data: any);
    /**
     * ID that represents the chat
     * @type {object}
     */
    id: object;
    /**
     * Title of the chat
     * @type {string}
     */
    name: string;
    /**
     * Indicates if the Chat is a Group Chat
     * @type {boolean}
     */
    isGroup: boolean;
    /**
     * Indicates if the Chat is readonly
     * @type {boolean}
     */
    isReadOnly: boolean;
    /**
     * Amount of messages unread
     * @type {number}
     */
    unreadCount: number;
    /**
     * Unix timestamp for when the last activity occurred
     * @type {number}
     */
    timestamp: number;
    /**
     * Indicates if the Chat is archived
     * @type {boolean}
     */
    archived: boolean;
    /**
     * Indicates if the Chat is pinned
     * @type {boolean}
     */
    pinned: boolean;
    /**
     * Indicates if the chat is muted or not
     * @type {boolean}
     */
    isMuted: boolean;
    /**
     * Unix timestamp for when the mute expires
     * @type {number}
     */
    muteExpiration: number;
    /**
     * Send a message to this chat
     * @param {string|MessageMedia|Location} content
     * @param {Object} [options]
     * @returns {Promise<Message>} Message that was just sent
     */
    sendMessage(content: string | MessageMedia | Location, options?: any): Promise<Message>;
    /**
     * Set the message as seen
     * @returns {Promise<Boolean>} result
     */
    sendSeen(): Promise<boolean>;
    /**
     * Clears all messages from the chat
     * @returns {Promise<Boolean>} result
     */
    clearMessages(): Promise<boolean>;
    /**
     * Deletes the chat
     * @returns {Promise<Boolean>} result
     */
    delete(): Promise<boolean>;
    /**
     * Archives this chat
     */
    archive(): Promise<any>;
    /**
     * un-archives this chat
     */
    unarchive(): Promise<any>;
    /**
     * Pins this chat
     * @returns {Promise<boolean>} New pin state. Could be false if the max number of pinned chats was reached.
     */
    pin(): Promise<boolean>;
    /**
     * Unpins this chat
     * @returns {Promise<boolean>} New pin state
     */
    unpin(): Promise<boolean>;
    /**
     * Mutes this chat forever, unless a date is specified
     * @param {?Date} unmuteDate Date at which the Chat will be unmuted, leave as is to mute forever
     */
    mute(unmuteDate: Date | null): Promise<any>;
    /**
     * Unmutes this chat
     */
    unmute(): Promise<any>;
    /**
     * Mark this chat as unread
     */
    markUnread(): Promise<any>;
    /**
     * Loads chat messages, sorted from earliest to latest.
     * @param {Object} searchOptions Options for searching messages. Right now only limit is supported.
     * @param {Number} [searchOptions.limit] The amount of messages to return. If no limit is specified, the available messages will be returned. Note that the actual number of returned messages may be smaller if there aren't enough messages in the conversation. Set this to Infinity to load all messages.
     * @returns {Promise<Array<Message>>}
     */
    fetchMessages(searchOptions: {
        limit?: number;
    }): Promise<Array<Message>>;
    /**
     * Simulate typing in chat. This will last for 25 seconds.
     */
    sendStateTyping(): Promise<any>;
    /**
     * Simulate recording audio in chat. This will last for 25 seconds.
     */
    sendStateRecording(): Promise<any>;
    /**
     * Stops typing or recording in chat immediately.
     */
    clearState(): Promise<any>;
    /**
     * Returns the Contact that corresponds to this Chat.
     * @returns {Promise<Contact>}
     */
    getContact(): Promise<Contact>;
    /**
     * Returns array of all Labels assigned to this Chat
     * @returns {Promise<Array<Label>>}
     */
    getLabels(): Promise<Array<Label>>;
}
import Main = require("./main.jeast");
import MessageMedia = require("./message-media.jeast");
import Message = require("./message.jeast");
import Contact = require("./contact.jeast");
import Label = require("./label.jeast");
