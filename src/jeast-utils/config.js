exports.whatsappURL = "https://web.whatsapp.com/";
exports.sendMessageURL = (message, phone) =>
  `https://web.whatsapp.com/send?text=${message}&phone=${phone}`;

/**
 * Events that can be emitted by the client
 * @readonly
 * @enum {string}
 */
exports.Events = {
  CONNECTION: "connection",
  MESSAGE_RECEIVED: "message",
  MESSAGE_CREATE: "message_create",
  QR_RECEIVED: "qr_code",
  DISCONNECTED: "disconnected",
  STATE_CHANGED: "change_state",
  BATTERY_CHANGED: "change_battery",
  INCOMING_CALL: "incoming_call",
};
