const UserAgent = require("user-agents");
const puppeteer = require("puppeteer");

/**
 * WS for opened chromium browser
 * @param {string} url WS that can be run with passing url or whatsapp endpoint
 * @param {function} events This option will callback events
 * @returns {Promise}  WS will be return a promise
 */

exports.ws = async (options = { sessionId, headless, executablePath }) => {
  let { sessionId, headless, executablePath } = options;
  const userAgent = new UserAgent([
    /Safari/,
    {
      connection: {
        type: "wifi",
      },
      platform: "MacIntel",
      deviceCategory: "desktop",
    },
  ]);

  let userDataDir =
    sessionId && `./session/${sessionId}_wa/${sessionId}`;

  const onload = {
    args: [
      "--no-sandbox",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
      "--netifs-to-ignore=INTERFACE_TO_IGNORE",
      "--disable-infobars",
      "--remote-debugging-port=9222",
      "--remote-debugging-address=0.0.0.0",
      `--user-agent=${userAgent.userAgent}`,
    ],
    executablePath,
    devtools: false,
    headless,
    userDataDir,
  };
  const browser = await puppeteer.launch(onload);
  const page = (await browser.pages())[0];
  await page.setBypassCSP(true);
  page.setDefaultNavigationTimeout(0);
  if (typeof events == "function") events(page, browser);
  return {
    browser,
    page,
  };
};
