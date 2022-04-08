export = ProductMetadata;
declare class ProductMetadata extends Main {
    constructor(client: any, data: any);
    /** Product ID */
    id: any;
    /** Retailer ID */
    retailer_id: any;
    /** Product Name  */
    name: any;
    /** Product Description */
    description: any;
}
import Main = require("./main.jeast");
