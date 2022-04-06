const { Jeast, MsgMedia } = require("./main");

const client = new Jeast();

client.connect({
  logger: true,
  qr_terminal: true,
  headless: true,
  authState: {
    isAuth: true,
    authType: "multidevice",
    authId: "example_account",
  },
});

client.ev.qr(async (qr) => {
  if (qr) {
    console.log(qr);
  }
});

client.ev.connection(async (connection) => {
  if (connection.isConnected) {
    await client.sendOfflineStatus();
  }
});

client.ev.message(async (message) => {
  switch (message.body) {
    case "sticker":
      const sticker = MsgMedia.fromFilePath(
        __dirname + "/public/jeast-logo.png"
      );
      await client.sendMessage(message.id.remote, sticker, {
        sendAsSticker: true,
      });
      break;
    case "doc":
      const doc = MsgMedia.fromFilePath(__dirname + "/public/jeast-logo.png");
      await client.sendMessage(message.id.remote, doc, {
        sendAsDocument: true,
      });
      break;
    case "mp3":
      const mp = MsgMedia.fromFilePath(__dirname + "/public/v.mp3");
      await client.sendMessage(message.id.remote, mp, {
        sendAudioAsVoice: true,
      });
      break;
    case "pin":
      await client.pinChatById(message.id.remote);
      break;
    case "unpin":
      await client.unpinChatById(message.id.remote);
      break;
    case "label":
      const label = await client.getLabels();
      console.log(label);
      break;
    case "blocked":
      const blockContacts = await client.getBlocked();
      console.log(blockContacts);
      break;
    default:
      await client.sendMessage(message.id.remote, "Hi!, can i help you?");
  }
});
