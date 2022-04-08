export = Call;
/**
 * Represents a Call on WhatsApp
 * @extends {Main}
 */
declare class Call extends Main {
    constructor(client: any, data: any);
    /**
     * Call ID
     * @type {string}
     */
    id: string;
    /**
     * From
     * @type {string}
     */
    from: string;
    /**
     * Unix timestamp for when the call was created
     * @type {number}
     */
    timestamp: number;
    /**
     * Is video
     * @type {boolean}
     */
    isVideo: boolean;
    /**
     * Is Group
     * @type {boolean}
     */
    isGroup: boolean;
    /**
     * Indicates if the call was sent by the current user
     * @type {boolean}
     */
    fromMe: boolean;
    /**
     * Indicates if the call can be handled in waweb
     * @type {boolean}
     */
    canHandleLocally: boolean;
    /**
     * Indicates if the call Should be handled in waweb
     * @type {boolean}
     */
    webClientShouldHandle: boolean;
    /**
     * Object with participants
     * @type {object}
     */
    participants: object;
}
import Main = require("./main.jeast");
