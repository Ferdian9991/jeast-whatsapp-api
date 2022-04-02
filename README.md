
# Jeast Whatsapp API
A Simple whatsapp api that connects through the whatsapp web

## Installation

```bash
npm i jeast-whatsapp
```

Please note that Node v12+ is required.

## Example usage

```js
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
```
## License

MIT License

Copyright (c) 2022 Ferdian Satria Akbar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
