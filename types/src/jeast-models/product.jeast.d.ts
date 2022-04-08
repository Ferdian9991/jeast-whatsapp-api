export = Product;
/**
 * Represents a Product on WhatsAppBusiness
 * @extends {Main}
 */
declare class Product extends Main {
    constructor(client: any, data: any);
    /**
     * Product ID
     * @type {string}
     */
    id: string;
    /**
     * Price
     * @type {string}
     */
    price: string;
    /**
     * Product Thumbnail
     * @type {string}
     */
    thumbnailUrl: string;
    /**
     * Currency
     * @type {string}
     */
    currency: string;
    /**
     * Product Name
     * @type {string}
     */
    name: string;
    /**
     * Product Quantity
     * @type {number}
     */
    quantity: number;
    /** Product metadata */
    data: ProductMetadata;
    getData(): Promise<ProductMetadata>;
}
import Main = require("./main.jeast");
import ProductMetadata = require("./product-metadata.jeast");
