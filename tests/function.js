const sinon = require("sinon");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { Jeast } = require("../main");

const expect = chai.expect;
chai.use(chaiAsPromised);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Jeast Function", function () {
  it("Todo get all contacts", async function () {
    this.timeout(30000);
    const connCallback = sinon.spy();
    const client = new Jeast();
    client.connect({
      logger: false,
      headless: true,
      authState: {
        isAuth: true,
        authId: "example_account",
      },
    });

    client.ev.connection(connCallback);

    await sleep(26000);

    if (!connCallback.args[0][0].isConnected) {
      expect.fail("Process fail with no session provided!!");
    } else {
      const blocked = await client.getBlocked();
      expect(blocked).to.be.an("array");
    }

    await client.destroy();
  });

  it("Todo get all chats", async function () {
    this.timeout(30000);
    const connCallback = sinon.spy();
    const client = new Jeast();
    client.connect({
      logger: false,
      headless: true,
      authState: {
        isAuth: true,
        authId: "example_account",
      },
    });

    client.ev.connection(connCallback);

    await sleep(26000);

    if (!connCallback.args[0][0].isConnected) {
      expect.fail("Process fail with no session provided!!");
    } else {
      const allChats = await client.getChats();
      expect(allChats).to.be.an("array");
    }

    await client.destroy();
  });

  it("Todo get all labels", async function () {
    this.timeout(30000);
    const connCallback = sinon.spy();
    const client = new Jeast();
    client.connect({
      logger: false,
      headless: true,
      authState: {
        isAuth: true,
        authId: "example_account",
      },
    });

    client.ev.connection(connCallback);

    await sleep(26000);

    if (!connCallback.args[0][0].isConnected) {
      expect.fail("Process fail with no session provided!!");
    } else {
      const allLabels = await client.getLabels();
      expect(allLabels).to.be.an("array");
    }

    await client.destroy();
  });
});
