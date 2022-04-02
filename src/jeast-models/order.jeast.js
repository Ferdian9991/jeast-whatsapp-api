const Main = require("./main.jeast");
const Product = require("./product.jeast");

/**
 * Represents a Order on WhatsApp
 * @extends {Main}
 */
class Order extends Main {
  constructor(client, data) {
    super(client);

    if (data) this._patch(data);
  }

  _patch(data) {
    /**
     * List of products
     * @type {Array<Product>}
     */
    if (data.products) {
      this.products = data.products.map(
        (product) => new Product(this.client, product)
      );
    }
    /**
     * Order Subtotal
     * @type {string}
     */
    this.subtotal = data.subtotal;
    /**
     * Order Total
     * @type {string}
     */
    this.total = data.total;
    /**
     * Order Currency
     * @type {string}
     */
    this.currency = data.currency;
    /**
     * Order Created At
     * @type {number}
     */
    this.createdAt = data.createdAt;

    return super._patch(data);
  }
}

module.exports = Order;
