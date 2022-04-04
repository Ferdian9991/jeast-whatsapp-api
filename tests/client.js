const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { Jeast } = require("../main");
const sinon = require("sinon");

const expect = chai.expect;
chai.use(chaiAsPromised);
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
describe("Jeast Client", function () {
  describe("Todo Authentication: ", function () {
    it("Get QR code if not authenticated", async function () {
      this.timeout(30000);

      const callback = sinon.spy();
      const client = new Jeast();

      client.connect({
        logger: false,
        headless: true,
        authState: {
          isAuth: false,
        },
      });

      client.ev.qr(callback);
      await sleep(25000);

      expect(callback.called).to.equal(true);
      expect(callback.args[0][0]).to.have.lengthOf(152);

      await client.destroy();
    });

    it("Authenticate with session", async function () {
      this.timeout(30000);

      const qrCall = sinon.spy();
      const connectionCall = sinon.spy();

      const client = new Jeast();

      client.connect({
        logger: false,
        headless: true,
        authState: {
          isAuth: true,
          authId: "example_account",
        },
      });

      client.ev.qr(qrCall);
      client.ev.connection(connectionCall);

      await sleep(26000);

      if (!connectionCall.args[0][0].isConnected) {
        expect.fail("Process fail with no session provided!!");
      } else {
        expect(connectionCall.args[0][0].isConnected).equal(true);
      }

      await client.destroy();
    });
  });

  describe("Todo Events Emitter: ", function () {
    it("Connection Events: ", async function () {
      this.timeout(30000)

      const qrCall = sinon.spy();
      const connectionCall = sinon.spy();
      const client = new Jeast();

      client.connect({
        logger: false,
        headless: true,
        authState: {
          isAuth: false,
        },
      });

      client.ev.qr(qrCall);
      client.ev.connection(connectionCall);

      await sleep(25000);

      expect(qrCall.called).equal(true);
      expect(connectionCall.called).equal(true);
    });
  });
});
