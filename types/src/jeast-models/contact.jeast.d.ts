export = Contact;
/**
 * ID that represents a contact
 * @typedef {Object} ContactId
 * @property {string} server
 * @property {string} user
 * @property {string} _serialized
 */
/**
 * Represents a Contact on WhatsApp
 * @extends {Main}
 */
declare class Contact extends Main {
    constructor(client: any, data: any);
    /**
     * ID that represents the contact
     * @type {ContactId}
     */
    id: ContactId;
    /**
     * Contact's phone number
     * @type {string}
     */
    number: string;
    /**
     * Indicates if the contact is a business contact
     * @type {boolean}
     */
    isBusiness: boolean;
    /**
     * Indicates if the contact is an enterprise contact
     * @type {boolean}
     */
    isEnterprise: boolean;
    labels: any;
    /**
     * The contact's name, as saved by the current user
     * @type {?string}
     */
    name: string | null;
    /**
     * The name that the contact has configured to be shown publically
     * @type {string}
     */
    pushname: string;
    sectionHeader: any;
    /**
     * A shortened version of name
     * @type {?string}
     */
    shortName: string | null;
    statusMute: any;
    type: any;
    verifiedLevel: any;
    verifiedName: any;
    /**
     * Indicates if the contact is the current user's contact
     * @type {boolean}
     */
    isMe: boolean;
    /**
     * Indicates if the contact is a user contact
     * @type {boolean}
     */
    isUser: boolean;
    /**
     * Indicates if the contact is a group contact
     * @type {boolean}
     */
    isGroup: boolean;
    /**
     * Indicates if the number is registered on WhatsApp
     * @type {boolean}
     */
    isWAContact: boolean;
    /**
     * Indicates if the number is saved in the current phone's contacts
     * @type {boolean}
     */
    isMyContact: boolean;
    /**
     * Indicates if you have blocked this contact
     * @type {boolean}
     */
    isBlocked: boolean;
    /**
     * Returns the contact's profile picture URL, if privacy settings allow it
     * @returns {Promise<string>}
     */
    getProfilePicUrl(): Promise<string>;
    /**
     * Returns the contact's formatted phone number, (12345678901@c.us) => (+1 (234) 5678-901)
     * @returns {Promise<string>}
     */
    getFormattedNumber(): Promise<string>;
    /**
     * Returns the contact's countrycode, (1541859685@c.us) => (1)
     * @returns {Promise<string>}
     */
    getCountryCode(): Promise<string>;
    /**
     * Returns the Chat that corresponds to this Contact.
     * Will return null when getting chat for currently logged in user.
     * @returns {Promise<Chat>}
     */
    getChat(): Promise<Chat>;
    /**
     * Blocks this contact from WhatsApp
     * @returns {Promise<boolean>}
     */
    block(): Promise<boolean>;
    /**
     * Unblocks this contact from WhatsApp
     * @returns {Promise<boolean>}
     */
    unblock(): Promise<boolean>;
    /**
     * Gets the Contact's current "about" info. Returns null if you don't have permission to read their status.
     * @returns {Promise<?string>}
     */
    getAbout(): Promise<string | null>;
    /**
     * Gets the Contact's common groups with you. Returns empty array if you don't have any common group.
     * @returns {Promise<Object[]>}
     */
    getCommonGroups(): Promise<any[]>;
}
declare namespace Contact {
    export { ContactId };
}
import Main = require("./main.jeast");
/**
 * ID that represents a contact
 */
type ContactId = {
    server: string;
    user: string;
    _serialized: string;
};
import Chat = require("./chat.jeast");
