const { Jeast } = require("./main");

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
    console.log("connected!");
  }
});

client.ev.message(async (message) => {
  if (message.body == "Hello") {
    await client.sendOnlineStatus();
  }
});
