export = BusinessContact;
/**
 * Represents a Business Contact on WhatsApp
 * @extends {Contact}
 */
declare class BusinessContact extends Contact {
    /**
     * The contact's business profile
     */
    businessProfile: any;
}
import Contact = require("./contact.jeast");
