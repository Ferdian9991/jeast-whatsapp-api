const Jeast = require("./src/jeast");

const client = new Jeast();

client.on("qr_code", async (qr) => {
  if (qr) {
    console.log(qr);
  }
});

client.on("connection", async (connection) => {
  if (connection.isConnected) {
    console.log("connected!");
  }
});

client.on("message", async (message) => {
  if (message.body == "Hello") {
    await client.sendMessage(message.id.remote, 'Hai')
  }
});

client.connect({
  logger: true,
  qr_terminal: true,
  authState: {
    isAuth: true,
    authType: "multidevice",
    authId: "example_account",
  },
});
