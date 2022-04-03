export class Buttons {
  constructor(...args: any[]);
}

export class Chat {
  constructor(...args: any[]);

  archive(...args: any[]): void;

  clearMessages(...args: any[]): void;

  clearState(...args: any[]): void;

  delete(...args: any[]): void;

  fetchMessages(...args: any[]): void;

  getContact(...args: any[]): void;

  getLabels(...args: any[]): void;

  markUnread(...args: any[]): void;

  mute(...args: any[]): void;

  pin(...args: any[]): void;

  sendMessage(...args: any[]): void;

  sendSeen(...args: any[]): void;

  sendStateRecording(...args: any[]): void;

  sendStateTyping(...args: any[]): void;

  unarchive(...args: any[]): void;

  unmute(...args: any[]): void;

  unpin(...args: any[]): void;
}

export class ClientInfo {
  constructor(...args: any[]);

  getBatteryStatus(...args: any[]): void;
}

export class Contact {
  constructor(...args: any[]);

  block(...args: any[]): void;

  getAbout(...args: any[]): void;

  getChat(...args: any[]): void;

  getCommonGroups(...args: any[]): void;

  getCountryCode(...args: any[]): void;

  getFormattedNumber(...args: any[]): void;

  getProfilePicUrl(...args: any[]): void;

  unblock(...args: any[]): void;
}

export class GroupChat {
  constructor(...args: any[]);

  addParticipants(...args: any[]): void;

  demoteParticipants(...args: any[]): void;

  getInviteCode(...args: any[]): void;

  leave(...args: any[]): void;

  promoteParticipants(...args: any[]): void;

  removeParticipants(...args: any[]): void;

  revokeInvite(...args: any[]): void;

  setDescription(...args: any[]): void;

  setInfoAdminsOnly(...args: any[]): void;

  setMessagesAdminsOnly(...args: any[]): void;

  setSubject(...args: any[]): void;
}

export class Jeast {
  constructor(...args: any[]);

  connect(...args: any[]): void;

  destroy(...args: any[]): void;

  getChatById(...args: any[]): void;

  getChats(...args: any[]): void;

  getContacts(...args: any[]): void;

  getState(...args: any[]): void;

  getWAVersion(...args: any[]): void;

  logout(...args: any[]): void;

  searchMessages(...args: any[]): void;

  sendMessage(...args: any[]): void;

  sendMessageSeen(...args: any[]): void;

  static captureRejectionSymbol: any;

  static captureRejections: boolean;

  static defaultMaxListeners: number;

  static errorMonitor: any;

  static getEventListeners(emitterOrTarget: any, type: any): any;

  static init(opts: any): void;

  static kMaxEventTargetListeners: any;

  static kMaxEventTargetListenersWarned: any;

  static listenerCount(emitter: any, type: any): any;

  static on(emitter: any, event: any, options: any): any;

  static once(emitter: any, name: any, options: any): any;

  static setMaxListeners(n: any, eventTargets: any): void;

  static usingDomains: boolean;
}

export class List {
  constructor(...args: any[]);
}

export class Message {
  constructor(...args: any[]);

  acceptGroupV4Invite(...args: any[]): void;

  delete(...args: any[]): void;

  downloadMedia(...args: any[]): void;

  forward(...args: any[]): void;

  getChat(...args: any[]): void;

  getContact(...args: any[]): void;

  getInfo(...args: any[]): void;

  getMentions(...args: any[]): void;

  getOrder(...args: any[]): void;

  getPayment(...args: any[]): void;

  getQuotedMessage(...args: any[]): void;

  reload(...args: any[]): void;

  reply(...args: any[]): void;

  star(...args: any[]): void;

  unstar(...args: any[]): void;
}

export class Order {
  constructor(...args: any[]);
}

export class Payment {
  constructor(...args: any[]);
}

export class Product {
  constructor(...args: any[]);

  getData(...args: any[]): void;
}

export const ConnWAState: {
  CONFLICT: string;
  CONNECTED: string;
  DEPRECATED_VERSION: string;
  OPENING: string;
  PAIRING: string;
  PROXYBLOCK: string;
  SMB_TOS_BLOCK: string;
  TIMEOUT: string;
  TOS_BLOCK: string;
  UNLAUNCHED: string;
  UNPAIRED: string;
  UNPAIRED_IDLE: string;
};

export const Events: {
  BATTERY_CHANGED: string;
  CONNECTION: string;
  DISCONNECTED: string;
  INCOMING_CALL: string;
  MESSAGE_CREATE: string;
  MESSAGE_RECEIVED: string;
  QR_RECEIVED: string;
  STATE_CHANGED: string;
};

export const MessageTypes: {
  AUDIO: string;
  BROADCAST_NOTIFICATION: string;
  BUTTONS_RESPONSE: string;
  CALL_LOG: string;
  CIPHERTEXT: string;
  CONTACT_CARD: string;
  CONTACT_CARD_MULTI: string;
  DEBUG: string;
  DOCUMENT: string;
  E2E_NOTIFICATION: string;
  GP2: string;
  GROUP_INVITE: string;
  GROUP_NOTIFICATION: string;
  HSM: string;
  IMAGE: string;
  INTERACTIVE: string;
  LIST: string;
  LIST_RESPONSE: string;
  LOCATION: string;
  NATIVE_FLOW: string;
  NOTIFICATION: string;
  NOTIFICATION_TEMPLATE: string;
  ORDER: string;
  OVERSIZED: string;
  PAYMENT: string;
  PRODUCT: string;
  PROTOCOL: string;
  REACTION: string;
  REVOKED: string;
  STICKER: string;
  TEMPLATE_BUTTON_REPLY: string;
  TEXT: string;
  UNKNOWN: string;
  VIDEO: string;
  VOICE: string;
};

export const version: string;

export const whatsappURL: string;

export function Location(...args: any[]): void;

export function MsgMedia(...args: any[]): any;

export function PrivateChat(...args: any[]): void;

export function sendMessageURL(message: any, phone: any): void;

export namespace Jeast {
  class EventEmitter {
    constructor(opts: any);

    addListener(type: any, listener: any): any;

    emit(type: any, args: any): any;

    eventNames(): any;

    getMaxListeners(): any;

    listenerCount(type: any): any;

    listeners(type: any): any;

    off(type: any, listener: any): any;

    on(type: any, listener: any): any;

    once(type: any, listener: any): any;

    prependListener(type: any, listener: any): any;

    prependOnceListener(type: any, listener: any): any;

    rawListeners(type: any): any;

    removeAllListeners(type: any, ...args: any[]): any;

    removeListener(type: any, listener: any): any;

    setMaxListeners(n: any): any;

    static EventEmitter: any;

    static captureRejectionSymbol: any;

    static captureRejections: boolean;

    static defaultMaxListeners: number;

    static errorMonitor: any;

    static getEventListeners(emitterOrTarget: any, type: any): any;

    static init(opts: any): void;

    static kMaxEventTargetListeners: any;

    static kMaxEventTargetListenersWarned: any;

    static listenerCount(emitter: any, type: any): any;

    static on(emitter: any, event: any, options: any): any;

    static once(emitter: any, name: any, options: any): any;

    static setMaxListeners(n: any, eventTargets: any): void;

    static usingDomains: boolean;
  }
}

export namespace MsgMedia {
  function fromFilePath(...args: any[]): void;

  function fromUrl(...args: any[]): void;
}
