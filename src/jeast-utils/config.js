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

exports.MessageTypes = {
  TEXT: "chat",
  AUDIO: "audio",
  VOICE: "ptt",
  IMAGE: "image",
  VIDEO: "video",
  DOCUMENT: "document",
  STICKER: "sticker",
  LOCATION: "location",
  CONTACT_CARD: "vcard",
  CONTACT_CARD_MULTI: "multi_vcard",
  ORDER: "order",
  REVOKED: "revoked",
  PRODUCT: "product",
  UNKNOWN: "unknown",
  GROUP_INVITE: "groups_v4_invite",
  LIST: "list",
  LIST_RESPONSE: "list_response",
  BUTTONS_RESPONSE: "buttons_response",
  PAYMENT: "payment",
  BROADCAST_NOTIFICATION: "broadcast_notification",
  CALL_LOG: "call_log",
  CIPHERTEXT: "ciphertext",
  DEBUG: "debug",
  E2E_NOTIFICATION: "e2e_notification",
  GP2: "gp2",
  GROUP_NOTIFICATION: "group_notification",
  HSM: "hsm",
  INTERACTIVE: "interactive",
  NATIVE_FLOW: "native_flow",
  NOTIFICATION: "notification",
  NOTIFICATION_TEMPLATE: "notification_template",
  OVERSIZED: "oversized",
  PROTOCOL: "protocol",
  REACTION: "reaction",
  TEMPLATE_BUTTON_REPLY: "template_button_reply",
};
