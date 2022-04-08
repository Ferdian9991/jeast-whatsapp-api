export = ChatMap;
declare class ChatMap {
    static create(client: any, data: any): GroupChat | PrivateChat;
}
import GroupChat = require("../jeast-models/group-chat.jeast");
import PrivateChat = require("../jeast-models/private-chat.jeast");
