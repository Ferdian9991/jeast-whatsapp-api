
# Jeast Whatsapp API
A Simple whatsapp api that connects through the whatsapp web

## Installation

```bash
npm i jeast-whatsapp-api
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
