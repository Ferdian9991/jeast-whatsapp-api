const PrivateContact = require("../models/PrivateContact");
const BusinessContact = require("../models/BusinessContact");

class ContactMap {
  static create(client, data) {
    if (data.isBusiness) {
      return new BusinessContact(client, data);
    }

    return new PrivateContact(client, data);
  }
}

module.exports = ContactMap;
