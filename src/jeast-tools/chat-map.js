const PrivateChat = require("../jeast-models/private-chat.jeast");
const GroupChat = require("../jeast-models/group-chat.jeast");

class ChatMap {
  static create(client, data) {
    if (data.isGroup) {
      return new GroupChat(client, data);
    }

    return new PrivateChat(client, data);
  }
}

module.exports = ChatMap;
