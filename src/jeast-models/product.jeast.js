const Main = require("./main.jeast");
const ProductMetadata = require("./product-metadata.jeast");

/**
 * Represents a Product on WhatsAppBusiness
 * @extends {Main}
 */
class Product extends Main {
  constructor(client, data) {
    super(client);

    if (data) this._patch(data);
  }

  _patch(data) {
    /**
     * Product ID
     * @type {string}
     */
    this.id = data.id;
    /**
     * Price
     * @type {string}
     */
    this.price = data.price ? data.price : "";
    /**
     * Product Thumbnail
     * @type {string}
     */
    this.thumbnailUrl = data.thumbnailUrl;
    /**
     * Currency
     * @type {string}
     */
    this.currency = data.currency;
    /**
     * Product Name
     * @type {string}
     */
    this.name = data.name;
    /**
     * Product Quantity
     * @type {number}
     */
    this.quantity = data.quantity;
    /** Product metadata */
    this.data = null;
    return super._patch(data);
  }

  async getData() {
    if (this.data === null) {
      let result = await this.client.clientPage.evaluate((productId) => {
        return window.JWeb.getProductMetadata(productId);
      }, this.id);
      if (!result) {
        this.data = undefined;
      } else {
        this.data = new ProductMetadata(this.client, result);
      }
    }
    return this.data;
  }
}

module.exports = Product;
