export = ContactMap;
declare class ContactMap {
    static create(client: any, data: any): PrivateContact | BusinessContact;
}
import PrivateContact = require("../jeast-models/private-contact.jeast");
import BusinessContact = require("../jeast-models/business-contact.jeast");
