export var whatsappURL: string;
export function sendMessageURL(message: any, phone: any): string;
export namespace Events {
    const CONNECTION: string;
    const MESSAGE_RECEIVED: string;
    const MESSAGE_CREATE: string;
    const REVOKE_MESSAGE_ME: string;
    const REVOKE_MESSAGE_EVERYONE: string;
    const MESSAGE_ACK: string;
    const UPLOADED_MEDIA: string;
    const QR_RECEIVED: string;
    const GROUP_LEAVE: string;
    const GROUP_INVITATION_JOIN: string;
    const GROUP_UPDATE: string;
    const DISCONNECTED: string;
    const STATE_CHANGED: string;
    const INCOMING_CALL: string;
}
/**
 * Events that can be emitted by the client
 */
export type Events = string;
export namespace MessageTypes {
    const TEXT: string;
    const AUDIO: string;
    const VOICE: string;
    const IMAGE: string;
    const VIDEO: string;
    const DOCUMENT: string;
    const STICKER: string;
    const LOCATION: string;
    const CONTACT_CARD: string;
    const CONTACT_CARD_MULTI: string;
    const ORDER: string;
    const REVOKED: string;
    const PRODUCT: string;
    const UNKNOWN: string;
    const GROUP_INVITE: string;
    const LIST: string;
    const LIST_RESPONSE: string;
    const BUTTONS_RESPONSE: string;
    const PAYMENT: string;
    const BROADCAST_NOTIFICATION: string;
    const CALL_LOG: string;
    const CIPHERTEXT: string;
    const DEBUG: string;
    const E2E_NOTIFICATION: string;
    const GP2: string;
    const GROUP_NOTIFICATION: string;
    const HSM: string;
    const INTERACTIVE: string;
    const NATIVE_FLOW: string;
    const NOTIFICATION: string;
    const NOTIFICATION_TEMPLATE: string;
    const OVERSIZED: string;
    const PROTOCOL: string;
    const REACTION: string;
    const TEMPLATE_BUTTON_REPLY: string;
}
export namespace ConnWAState {
    const CONFLICT: string;
    const CONNECTED: string;
    const DEPRECATED_VERSION: string;
    const OPENING: string;
    const PAIRING: string;
    const PROXYBLOCK: string;
    const SMB_TOS_BLOCK: string;
    const TIMEOUT: string;
    const TOS_BLOCK: string;
    const UNLAUNCHED: string;
    const UNPAIRED: string;
    const UNPAIRED_IDLE: string;
}
