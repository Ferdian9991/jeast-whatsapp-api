export = Order;
/**
 * Represents a Order on WhatsApp
 * @extends {Main}
 */
declare class Order extends Main {
    constructor(client: any, data: any);
    products: any;
    /**
     * Order Subtotal
     * @type {string}
     */
    subtotal: string;
    /**
     * Order Total
     * @type {string}
     */
    total: string;
    /**
     * Order Currency
     * @type {string}
     */
    currency: string;
    /**
     * Order Created At
     * @type {number}
     */
    createdAt: number;
}
import Main = require("./main.jeast");
