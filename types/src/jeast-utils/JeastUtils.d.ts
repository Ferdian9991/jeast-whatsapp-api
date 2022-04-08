export = JeastUtils;
/**
 * JeastUtils methods
 */
declare class JeastUtils {
    static hashed(length: any): string;
    /**
     * Sets default properties on an object that aren't already specified.
     * @param {Object} def Default properties
     * @param {Object} given Object to assign defaults to
     * @returns {Object}
     * @private
     */
    private static mergeDefault;
    /**
     * Formats a image to webp
     * @param {MessageMedia} media
     *
     * @returns {Promise<MessageMedia>} media in webp format
     */
    static formatImageToWebpSticker(media: MessageMedia, clientPage: any): Promise<MessageMedia>;
    /**
     * Formats a video to webp
     * @param {MessageMedia} media
     *
     * @returns {Promise<MessageMedia>} media in webp format
     */
    static formatVideoToWebpSticker(media: MessageMedia): Promise<MessageMedia>;
    /**
     * Sticker metadata.
     * @typedef {Object} StickerMetadata
     * @property {string} [name]
     * @property {string} [author]
     * @property {string[]} [categories]
     */
    /**
     * Formats a media to webp
     * @param {MessageMedia} media
     * @param {StickerMetadata} metadata
     *
     * @returns {Promise<MessageMedia>} media in webp format
     */
    static formatToWebpSticker(media: MessageMedia, metadata: {
        name?: string;
        author?: string;
        categories?: string[];
    }, clientPage: any): Promise<MessageMedia>;
    /**
     * Configure ffmpeg path
     * @param {string} path
     */
    static setFfmpegPath(path: string): void;
}
