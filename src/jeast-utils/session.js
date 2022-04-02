const fs = require("fs");
const { join } = require("path");

if (!fs.existsSync(join(__dirname, "../../session")))
  fs.mkdirSync(join(__dirname, "../../session"), {
    recursive: true,
  });

const getSession = async (page, sessionId) => {
  const localStorageData = await page.evaluate(() => {
    let json = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      json[key] = localStorage.getItem(key);
    }
    return json;
  });
  fs.writeFile(
    join(__dirname, `../../session/${sessionId}_wa`, `${sessionId}.json`),
    JSON.stringify(localStorageData, null, 4),
    (err) => {
      if (err) console.log(err);
      return;
    }
  );
};

const setSession = async (page, sessionId) => {
  let localStorage = fs.readFileSync(
    join(__dirname, `../../session/${sessionId}_wa`, `${sessionId}.json`),
    "utf8"
  );
  let session = JSON.parse(localStorage);
  await page.evaluateOnNewDocument((session) => {
    if (document.referrer === "https://whatsapp.com/") {
      localStorage.clear();
      for (let i = 0; i < Object.keys(session).length; i++) {
        const key = Object.keys(session)[i];
        localStorage.setItem(key, Object.values(session)[i]);
      }
    }
    localStorage.setItem("remember-me", "true");
    // location.reload(true);
  }, session);
};

module.exports = {
  getSession,
  setSession,
};
