export = MessageMedia;
/**
 * Media attached to a message
 * @param {string} mimetype MIME type of the attachment
 * @param {string} data Base64-encoded data of the file
 * @param {?string} filename Document file name
 */
declare class MessageMedia {
    /**
     * Creates a MessageMedia instance from a local file path
     * @param {string} filePath
     * @returns {MessageMedia}
     */
    static fromFilePath(filePath: string): MessageMedia;
    /**
     * Creates a MessageMedia instance from a URL
     * @param {string} url
     * @param {Object} [options]
     * @param {boolean} [options.unsafeMime=false]
     * @param {string} [options.filename]
     * @param {object} [options.client]
     * @param {object} [options.reqOptions]
     * @param {number} [options.reqOptions.size=0]
     * @returns {Promise<MessageMedia>}
     */
    static fromUrl(url: string, options?: {
        unsafeMime?: boolean;
        filename?: string;
        client?: object;
        reqOptions?: {
            size?: number;
        };
    }): Promise<MessageMedia>;
    constructor(mimetype: any, data: any, filename: any);
    /**
     * MIME type of the attachment
     * @type {string}
     */
    mimetype: string;
    /**
     * Base64 encoded data that represents the file
     * @type {string}
     */
    data: string;
    /**
     * Name of the file (for documents)
     * @type {?string}
     */
    filename: string | null;
}
