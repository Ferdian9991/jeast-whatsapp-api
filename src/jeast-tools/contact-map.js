const PrivateContact = require("../jeast-models/private-contact.jeast");
const BusinessContact = require("../jeast-models/business-contact.jeast");

class ContactMap {
  static create(client, data) {
    if (data.isBusiness) {
      return new BusinessContact(client, data);
    }

    return new PrivateContact(client, data);
  }
}

module.exports = ContactMap;
