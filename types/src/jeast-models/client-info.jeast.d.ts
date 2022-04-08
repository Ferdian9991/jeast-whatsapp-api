export = ClientInfo;
declare class ClientInfo extends Main {
    constructor(client: any, data: any);
    /**
     * Name configured to be shown in push notifications
     * @type {string}
     */
    pushname: string;
    /**
     * Current user ID
     * @type {object}
     */
    wid: object;
    /**
     * @type {object}
     * @deprecated Use .wid instead
     */
    me: object;
    /**
     * Information about the phone this client is connected to. Not available in multi-device.
     * @type {object}
     * @property {string} wa_version WhatsApp Version running on the phone
     * @property {string} os_version OS Version running on the phone (iOS or Android version)
     * @property {string} device_manufacturer Device manufacturer
     * @property {string} device_model Device model
     * @property {string} os_build_number OS build number
     * @deprecated
     */
    phone: object;
    /**
     * Platform WhatsApp is running on
     * @type {string}
     */
    platform: string;
    /**
     * Get current battery percentage and charging status for the attached device
     * @returns {object} batteryStatus
     * @returns {number} batteryStatus.battery - The current battery percentage
     * @returns {boolean} batteryStatus.plugged - Indicates if the phone is plugged in (true) or not (false)
     * @deprecated
     */
    getBatteryStatus(): object;
}
import Main = require("./main.jeast");
