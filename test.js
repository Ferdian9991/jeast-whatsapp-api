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
    await client.sendMessage({ phone: "6283854246025", message: "halo" });
  }
});
client.connect({ authState: "foo" });
