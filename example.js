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
  if (message.body == "sticker") {
    const sticker = MsgMedia.fromFilePath(__dirname + "/public/jeast-logo.png");
    await client.sendMessage(message.id.remote, sticker, {
      sendAsSticker: true,
    });
  } else if (message.body == "doc") {
    const doc = MsgMedia.fromFilePath(__dirname + "/public/jeast-logo.png");
    await client.sendMessage(message.id.remote, doc, {
      sendAsDocument: true,
    });
  } else if (message.body == "mp3") {
    const mp = MsgMedia.fromFilePath(__dirname + "/public/v.mp3");
    await client.sendMessage(message.id.remote, mp, {
      sendAudioAsVoice: true,
    });
  }
});
