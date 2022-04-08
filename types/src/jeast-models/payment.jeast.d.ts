export = Payment;
declare class Payment extends Main {
    constructor(client: any, data: any);
    /**
     * The payment Id
     * @type {object}
     */
    id: object;
    /**
     * The payment currency
     * @type {string}
     */
    paymentCurrency: string;
    /**
     * The payment ammount ( R$ 1.00 = 1000 )
     * @type {number}
     */
    paymentAmount1000: number;
    /**
     * The payment receiver
     * @type {object}
     */
    paymentMessageReceiverJid: object;
    /**
     * The payment transaction timestamp
     * @type {number}
     */
    paymentTransactionTimestamp: number;
    /**
     * The paymentStatus
     *
     * Possible Status
     * 0:UNKNOWN_STATUS
     * 1:PROCESSING
     * 2:SENT
     * 3:NEED_TO_ACCEPT
     * 4:COMPLETE
     * 5:COULD_NOT_COMPLETE
     * 6:REFUNDED
     * 7:EXPIRED
     * 8:REJECTED
     * 9:CANCELLED
     * 10:WAITING_FOR_PAYER
     * 11:WAITING
     *
     * @type {number}
     */
    paymentStatus: number;
    /**
     * Integer that represents the payment Text
     * @type {number}
     */
    paymentTxnStatus: number;
    /**
     * The note sent with the payment
     * @type {string}
     */
    paymentNote: string;
}
import Main = require("./main.jeast");
