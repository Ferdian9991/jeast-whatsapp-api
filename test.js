const qr_code_terminal = require("qrcode-terminal");
const Jeast = require("./src/jeast");

const client = new Jeast();

client.on("qr_code", async (qr) => {
  if (qr) {
    process.stdout.write("\x1Bc");
    qr_code_terminal.generate(qr, { small: true });
  }
});

client.on("connection", async (connection) => {
  if (connection.isConnected) {
    console.log("connected");
  }
});

client.on("message", (msg) => {
  if (msg.body == "Hello") {
    msg.reply("Hai");
  }
});

client.connect({
  authState: {
    isAuth: true,
    log: true,
    authType: "multidevice",
    authId: "example_account",
  },
});
