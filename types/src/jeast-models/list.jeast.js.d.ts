export = List;
/**
 * Message type List
 */
declare class List {
    /**
     * @param {string} body
     * @param {string} buttonText
     * @param {Array<any>} sections
     * @param {string?} title
     * @param {string?} footer
     */
    constructor(body: string, buttonText: string, sections: Array<any>, title: string | null, footer: string | null);
    /**
     * Message body
     * @type {string}
     */
    description: string;
    /**
     * List button text
     * @type {string}
     */
    buttonText: string;
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
    /**
     * sections of message
     * @type {Array<any>}
     */
    sections: Array<any>;
    /**
     * Creates section array from simple array
     * @param {Array<any>} sections
     * @returns {Array<any>}
     * @example
     * Input: [{title:'sectionTitle',rows:[{id:'customId', title:'ListItem2', description: 'desc'},{title:'ListItem2'}]}}]
     * Returns: [{'title':'sectionTitle','rows':[{'rowId':'customId','title':'ListItem1','description':'desc'},{'rowId':'oGSRoD','title':'ListItem2','description':''}]}]
     */
    _format(sections: Array<any>): Array<any>;
}
