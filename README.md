<h1 align="center">
	<img
		width="300"
		alt="Jeast Whatsapp"
		src="https://github.com/Ferdian9991/jeast-whatsapp-api/blob/main/public/jeast-logo.png">
</h1>

[![npm](https://img.shields.io/npm/v/jeast-whatsapp-api.svg)](https://www.npmjs.com/package/jeast-whatsapp-api) [![license](https://img.shields.io/github/license/Ferdian9991/jeast-whatsapp-api)](https://github.com/Ferdian9991/jeast-whatsapp-api/blob/main/LICENSE) [![Jeast_Whatsapp_Api-1.1.1](https://img.shields.io/badge/Jeast_Whatsapp_Api-1.1.3-blue.svg)](https://www.npmjs.com/package/jeast-whatsapp-api) [![stars](https://img.shields.io/github/stars/Ferdian9991/jeast-whatsapp-api)](https://github.com/Ferdian9991/jeast-whatsapp-api) [![stars](https://img.shields.io/github/forks/Ferdian9991/jeast-whatsapp-api)](https://github.com/Ferdian9991/jeast-whatsapp-api)

# Jeast Whatsapp API

A Simple whatsapp api that connects through the whatsapp web, that is used for all needs such as sending messages, and authenticating on whatsapp via qr code.

## 🚀 Installation

Type the npm command below to install the package

```bash
npm i jeast-whatsapp-api
```

or

```bash
yarn add jeast-whatsapp-api
```

Please note that Node v12+ is required.

## ⭕ Basic usage

```js
const { Jeast } = require("jeast-whatsapp-api");

const client = new Jeast();

//Make connection state for get qr code and save session!
client.connect({
  logger: true,
  qr_terminal: true,
  headless: true,
  authState: {
    isAuth: true,
    authId: "example_account",
  },
});

//Event listener for get QR code!
client.ev.qr(async (qr) => {
  if (qr) {
    console.log(qr);
  }
});

//Event listener that which be called if authenticated!
client.ev.connection(async (connection) => {
  if (connection.isConnected) {
    console.log("connected!");
  }
});

//Event listeners that which be called if someone sending message for you!
client.ev.message(async (message) => {
  if (message.body == "Hello") {
    await client.sendMessage(message.id.remote, "Hai");
  }
});
```

Jeast Whatsapp API has various functions, there are several functions that are not tied to existing events, so we will provide documentation of these functions below

**📹 Events Listeners**

This is a some event listener that return a callback

```js
const { Jeast } = require("jeast-whatsapp-api");

const client = new Jeast();

client.ev.qr(callback);
//Event listener to get or print qr code
client.ev.changeState(callback);
//Event listener that which will be called if state has been changed
client.ev.connection(callback);
//Event listener that which will be called when connected or authenticated
client.ev.message(callback);
//Event listener that which will be called when some peoples send message
client.ev.newMessage(callback);
//Event listener will be called if new message has been created
client.ev.revokeMe(callback);
//Event listener that which will be called when some peoples revoke to you
client.ev.revokeAll(callback);
//Event listener that which will be called when revoke all related to you
client.ev.uploadMedia(callback);
//Event listener that will be called if you are sending a message
client.ev.incomingCall(callback);
//Event listener will be called when someone calls you with whatsapp
client.ev.group.join(callback);
//Event listener will be called when someone invite you on group
client.ev.group.leave(callback);
//Event listener will be called when someone remove you from group
client.ev.group.update(callback);
//Event listener will be called when someone update same group as you
```

**💬 Sending Message**

This is a function to send a message

```js
const options = {
  sendAudioAsVoice: Boolean, // make it true if you use this options
  sendVideoAsGif: Boolean, // make it true if you use this options
  sendAsSticker: Boolean, // make it true if you use this options
  sendAsDocument: Boolean, // make it true if you use this options
};

sendMessage("receiver-number@.c.us", "message", options); // asynchronous function
```

**📨 Get Chat List**

This is a function to get all chat list

```js
getChats(); // asynchronous function
```

**📌 Pin Chat By Id**

This is a function to pin chat using specified id

```js
pinChatById("receiver-number@c.us"); // asynchronous function
```

**📌 Unpin Chat By Id**

This is a function to unpin chat using specified id

```js
unpinChatById("receiver-number@c.us"); // asynchronous function
```

**🔇 Mute Chat**

This is a function to mute chat

```js
muteChat("receiver-number@c.us"); // asynchronous function
```

**📤 Mark Chat as Unread**

This is a function to mark as unread chat

```js
markChatAsUnread("receiver-number@c.us"); // asynchronous function
```

**🚪 Logout**

This is a function to logout from the whatsapp web

```js
logout(); // asynchronous function
```

**🔎 Search Messages**

This is a function to search messages with query type string

```js
  const options = {
    page: number; // fill in how many messages the message page will retrieve
    limit: number; // fill in how many messages are limited
    chatId: string; // fill in the recipient's chat id
  }

  searchMessages(query = 'string', options); // asynchronous function
```

**👀 Send Seen**

This is a function to send message seen

```js
sendMessageSeen("receiver-number@c.us"); // asynchronous function
```

**📩 Get Chat By Id**

This is a function to get chat using chat id

```js
getChatById("receiver-number@c.us"); // asynchronous function
```

**🔢 Get Phone Country Code**

This is a function to get chat using chat id

```js
getPhoneCountry("phone-number"); // asynchronous function
```

**🏫 Create New Group**

This is a function to create new group and add some participants

```js
createNewGroup("Test", ["List of participant number id"]); // asynchronous function
```

**📟 Get Whatsapp Version**

This is a function to get whatsapp version

```js
getWAVersion(); // asynchronous function
```

**🗄️ Archive Message**

This is a function for archive message by chat id

```js
addToArchive("receiver-number@c.us"); // asynchronous function
```

**❌🗄️ Remove Message From Archive**

This is a function for remove message from archive by chat id

```js
removeFromArchive("receiver-number@c.us"); // asynchronous function
```

**📠 Get Contacts**

This is a function to get all contacts

```js
getContacts(); // asynchronous function
```

**🏷️ Get Labels**

This is a function to get all labels

```js
getLabels(); // asynchronous function
```

**🏷️ Get Chat By Label**

This is a function to get chat by label id

```js
getChatsByLabel("labelId"); // asynchronous function
```

**📠 Get All Blocked Contacts**

This is a function to get all of blocked contacts

```js
getBlocked()(); // asynchronous function
```

## 🖼 Send as Sticker

```js
const { Jeast, MsgMedia } = require("jeast-whatsapp-api");

const client = new Jeast();

client.connect({
  logger: true,
  qr_terminal: true,
  headless: true,
  authState: {
    isAuth: true,
    authId: "example_account",
  },
});

client.ev.qr(async (qr) => {
  if (qr) {
    console.log(qr);
  }
});

client.ev.connection(async (connection) => {
  if (connection.isConnected) {
    const sticker = MsgMedia.fromFilePath(__dirname + "/path/to/file");
    await client.sendMessage("receiver-number@c.us", sticker, {
      sendAsSticker: true,
    });
  }
});
```

## 🖻 Send as Document

```js
const { Jeast, MsgMedia } = require("jeast-whatsapp-api");

const client = new Jeast();

client.connect({
  logger: true,
  qr_terminal: true,
  headless: true,
  authState: {
    isAuth: true,
    authId: "example_account",
  },
});

client.ev.qr(async (qr) => {
  if (qr) {
    console.log(qr);
  }
});

client.ev.connection(async (connection) => {
  if (connection.isConnected) {
    const document = MsgMedia.fromFilePath(__dirname + "/path/to/file");
    await client.sendMessage("receiver-number@c.us", document, {
      sendAsDocument: true,
    });
  }
});
```

## 👾 Send Video as Gif

```js
const { Jeast, MsgMedia } = require("jeast-whatsapp-api");

const client = new Jeast();

client.connect({
  logger: true,
  executablePath: "/path/to/chrome", //use executablePath to send video or gif
  qr_terminal: true,
  headless: true,
  authState: {
    isAuth: true,
    authId: "example_account",
  },
});

client.ev.qr(async (qr) => {
  if (qr) {
    console.log(qr);
  }
});

client.ev.connection(async (connection) => {
  if (connection.isConnected) {
    const video = MsgMedia.fromFilePath(__dirname + "/path/to/file");
    await client.sendMessage("receiver-number@c.us", video, {
      sendVideoAsGif: true,
    });
  }
});
```

## 📑 License

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
