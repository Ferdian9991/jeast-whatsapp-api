const Jeast = require("./src/jeast");

const client = new Jeast();

client.on("qr_code", async (qr) => {
  if (qr) {
    console.log(qr);
  }
});

client.on("connection", async (connection) => {
  if (connection.isConnected) {
    const chatLists = await client.searchMessages('Hai');
    console.log(chatLists);
  }
});

client.on("message", (msg) => {
  if (msg.body == "Hello") {
    msg.reply("Hai");
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
