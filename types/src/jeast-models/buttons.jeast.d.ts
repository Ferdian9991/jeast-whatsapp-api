export = Buttons;
/**
 * Button spec used in Buttons constructor
 * @typedef {Object} ButtonSpec
 * @property {string=} id - Custom ID to set on the button. A random one will be generated if one is not passed.
 * @property {string} body - The text to show on the button.
 */
/**
 * @typedef {Object} FormattedButtonSpec
 * @property {string} buttonId
 * @property {number} type
 * @property {Object} buttonText
 */
/**
 * Message type buttons
 */
declare class Buttons {
    /**
     * @param {string|MessageMedia} body
     * @param {ButtonSpec[]} buttons - See {@link ButtonSpec}
     * @param {string?} title
     * @param {string?} footer
     */
    constructor(body: string | MessageMedia, buttons: ButtonSpec[], title: string | null, footer: string | null);
    /**
     * Message body
     * @type {string|MessageMedia}
     */
    body: string | MessageMedia;
    /**
     * title of message
     * @type {string}
     */
    title: string;
    /**
     * footer of message
     * @type {string}
     */
    footer: string;
    type: string;
    /**
     * buttons of message
     * @type {FormattedButtonSpec[]}
     */
    buttons: FormattedButtonSpec[];
    /**
     * Creates button array from simple array
     * @param {ButtonSpec[]} buttons
     * @returns {FormattedButtonSpec[]}
     * @example
     * Input: [{id:'customId',body:'button1'},{body:'button2'},{body:'button3'},{body:'button4'}]
     * Returns: [{ buttonId:'customId',buttonText:{'displayText':'button1'},type: 1 },{buttonId:'n3XKsL',buttonText:{'displayText':'button2'},type:1},{buttonId:'NDJk0a',buttonText:{'displayText':'button3'},type:1}]
     */
    _format(buttons: ButtonSpec[]): FormattedButtonSpec[];
}
declare namespace Buttons {
    export { ButtonSpec, FormattedButtonSpec };
}
import MessageMedia = require("./message-media.jeast");
type FormattedButtonSpec = {
    buttonId: string;
    type: number;
    buttonText: any;
};
/**
 * Button spec used in Buttons constructor
 */
type ButtonSpec = {
    /**
     * - Custom ID to set on the button. A random one will be generated if one is not passed.
     */
    id?: string | undefined;
    /**
     * - The text to show on the button.
     */
    body: string;
};
