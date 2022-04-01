const EventEmitter = require("events");
const fsp = require("fs").promises;
const { existsSync } = require("fs");
const qr_code_terminal = require("qrcode-terminal");
const { Events, whatsappURL, sendMessageURL } = require("./jeast-utils/config");
const { selectors } = require("./jeast-utils/selectors");
const {
  QR_CANVAS,
  QR_RETRY_BUTTON,
  QR_CONTAINER,
  MAIN_SELECTOR,
  SEND_MESSAGE_BUTTON,
} = selectors;
const { ws } = require("./jeast-utils/ws");
const { getSession, setSession } = require("./jeast-utils/session");
const { join } = require("path");

const logger = (condition, message) => {
  condition && console.log(message);
};

class Jeast extends EventEmitter {
  constructor(pupPage) {
    super();
    this.pupPage = ws(whatsappURL);
  }

  /**
   *
   * @param {Object} options Passing with options!
   * @param {Boolean} options.qr_terminal Passing with boolean type to display qr code terminal
   * @param {Boolean} options.log Passing with boolean type to display logs
   * @returns {EventEmitter}
   */
  async connect(options = { qr_terminal: false, log: true, authState }) {
    const sessionDir = join(
      __dirname,
      `../session/`,
      options.authState + ".json"
    );
    if (!existsSync(sessionDir)) {
      await fsp.mkdir(join(__dirname, `../session/`), {
        recursive: true,
      });
    }

    const { page, browser } = await this.pupPage;

    if (existsSync(sessionDir)) {
      await setSession(page, options.authState);
    }

    await page.goto(whatsappURL, {
      waitUntil: "load",
      timeout: 0,
      referer: "https://whatsapp.com/",
    });

    const isAuthentication = await Promise.race([
      new Promise((resolve) => {
        page
          .waitForSelector(MAIN_SELECTOR, {
            timeout: 0,
          })
          .then(() => resolve(false))
          .catch((err) => resolve(err));
      }),
      new Promise((resolve) => {
        page
          .waitForSelector(QR_CANVAS, {
            timeout: 0,
          })
          .then(() => resolve(true))
          .catch((err) => resolve(err));
      }),
    ]);

    /**
     *
     * @param {Object} connection
     * @param {Boolean} connection.isConnected
     * @param {Object} connection.driver
     * @param {page} connection.driver.page
     * @param {browser} connection.driver.browser
     */

    const isConnected = (connection) => {
      this.emit(Events.CONNECTION, connection);
    };

    if (isAuthentication) {
      let retries = 0;
      await page.exposeFunction("qrChanged", async (qr) => {
        this.emit(Events.QR_RECEIVED, qr);

        options.qr_terminal &&
          qr_code_terminal.generate(qr, {
            small: true,
          });

        if (0 > 0) {
          retries++;
          if (retries > 0) {
            this.emit(Events.DISCONNECTED, "Max qrcode retries reached");
            await this.destroy();
          }
        }
      });
      await page.evaluate(
        ({ QR_CONTAINER, QR_RETRY_BUTTON }) => {
          const qrCode = document.querySelector(QR_CONTAINER);
          window.qrChanged(qrCode.dataset.ref);

          const observer = new MutationObserver((muts) => {
            muts.forEach((mut) => {
              if (
                mut.type === "attributes" &&
                mut.attributeName === "data-ref"
              ) {
                window.qrChanged(mut.target.dataset.ref);
              } else if (mut.type === "childList") {
                const retry_button = document.querySelector(QR_RETRY_BUTTON);
                if (retry_button) retry_button.click();
              }
            });
          });
          observer.observe(qrCode.parentElement, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ["data-ref"],
          });
        },
        { QR_CONTAINER, QR_RETRY_BUTTON }
      );

      let isLoggedIn = false;
      isConnected({
        isConnected: false,
      });

      await page.waitForSelector(MAIN_SELECTOR, { timeout: 0 });
      isLoggedIn = (await page.$(MAIN_SELECTOR)) != null && true;
      await page.waitForTimeout(2000);

      if (isLoggedIn) {
        const storage = await getSession(page, options.authState);
      }
    }

    isConnected({
      isConnected: true,
    });
  }

  async sendMessage(option = { phone, message }) {
    const endpoint = sendMessageURL(option.message, option.phone);
    const { page } = await this.pupPage;

    await page.goto(endpoint, { timeout: 0 });

    await page.waitForSelector(SEND_MESSAGE_BUTTON);
    await page.waitForTimeout(2000);
    const send = await page.$(SEND_MESSAGE_BUTTON);

    await send.click();
  }
}

module.exports = Jeast;
