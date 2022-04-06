"use strict";

const Main = require("./main.jeast");
// eslint-disable-next-line no-unused-vars
const Chat = require("./chat.jeast");

/**
 * WhatsApp Business Label information
 */
class Label extends Main {
  /**
   * @param {Main} client
   * @param {object} data
   */
  constructor(client, data) {
    super(client);

    if (data) this._patch(data);
  }

  _patch(data) {
    /**
     * Label ID
     * @type {string}
     */
    this.id = data.id;

    /**
     * Label name
     * @type {string}
     */
    this.name = data.name;

    /**
     * Label hex color
     * @type {string}
     */
    this.hexColor = data.hexColor;
  }
  /**
   * Get all chats that have been assigned this Label
   * @returns {Promise<Array<Chat>>}
   */
  async getChats() {
    return this.client.getChatsByLabelId(this.id);
  }
}

module.exports = Label;
