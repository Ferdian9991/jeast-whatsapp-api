export = Label;
/**
 * WhatsApp Business Label information
 */
declare class Label extends Main {
    /**
     * @param {Main} client
     * @param {object} data
     */
    constructor(client: Main, data: object);
    _patch(data: any): void;
    /**
     * Label ID
     * @type {string}
     */
    id: string;
    /**
     * Label name
     * @type {string}
     */
    name: string;
    /**
     * Label hex color
     * @type {string}
     */
    hexColor: string;
    /**
     * Get all chats that have been assigned this Label
     * @returns {Promise<Array<Chat>>}
     */
    getChats(): Promise<Array<Chat>>;
}
import Main = require("./main.jeast");
import Chat = require("./chat.jeast");
