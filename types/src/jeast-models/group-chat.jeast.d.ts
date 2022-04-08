export = GroupChat;
/**
 * Participant information
 * @typedef {Object} GroupParticipant
 * @property {string} id
 * @property {boolean} isAdmin
 * @property {boolean} isSuperAdmin
 */
/**
 * Presents a Group Chat on WhatsApp
 * @extends {Chat}
 */
declare class GroupChat extends Chat {
    groupMetadata: any;
    /**
     * Gets the group owner
     * @type {string}
     */
    get owner(): string;
    /**
     * Gets the date at which the group was created
     * @type {new Date()}
     */
    get createdAt(): new () => Date;
    /**
     * Gets the group description
     * @type {string}
     */
    get description(): string;
    /**
     * Gets the group participants
     * @type {Array<GroupParticipant>}
     */
    get participants(): GroupParticipant[];
    /**
     * Adds a list of participants by ID to the group
     * @param {Array<string>} participantIds
     * @returns {Promise<Object>}
     */
    addParticipants(participantIds: Array<string>): Promise<any>;
    /**
     * Removes a list of participants by ID to the group
     * @param {Array<string>} participantIds
     * @returns {Promise<Object>}
     */
    removeParticipants(participantIds: Array<string>): Promise<any>;
    /**
     * Promotes participants by IDs to admins
     * @param {Array<string>} participantIds
     * @returns {Promise<{ status: number }>} Object with status code indicating if the operation was successful
     */
    promoteParticipants(participantIds: Array<string>): Promise<{
        status: number;
    }>;
    /**
     * Demotes participants by IDs to regular users
     * @param {Array<string>} participantIds
     * @returns {Promise<{ status: number }>} Object with status code indicating if the operation was successful
     */
    demoteParticipants(participantIds: Array<string>): Promise<{
        status: number;
    }>;
    /**
     * Updates the group subject
     * @param {string} subject
     * @returns {Promise<boolean>} Returns true if the subject was properly updated. This can return false if the user does not have the necessary permissions.
     */
    setSubject(subject: string): Promise<boolean>;
    /**
     * Updates the group description
     * @param {string} description
     * @returns {Promise<boolean>} Returns true if the description was properly updated. This can return false if the user does not have the necessary permissions.
     */
    setDescription(description: string): Promise<boolean>;
    /**
     * Updates the group settings to only allow admins to send messages.
     * @param {boolean} [adminsOnly=true] Enable or disable this option
     * @returns {Promise<boolean>} Returns true if the setting was properly updated. This can return false if the user does not have the necessary permissions.
     */
    setMessagesAdminsOnly(adminsOnly?: boolean): Promise<boolean>;
    /**
     * Updates the group settings to only allow admins to edit group info (title, description, photo).
     * @param {boolean} [adminsOnly=true] Enable or disable this option
     * @returns {Promise<boolean>} Returns true if the setting was properly updated. This can return false if the user does not have the necessary permissions.
     */
    setInfoAdminsOnly(adminsOnly?: boolean): Promise<boolean>;
    /**
     * Gets the invite code for a specific group
     * @returns {Promise<string>} Group's invite code
     */
    getInviteCode(): Promise<string>;
    /**
     * Invalidates the current group invite code and generates a new one
     * @returns {Promise<string>} New invite code
     */
    revokeInvite(): Promise<string>;
    /**
     * Makes the bot leave the group
     * @returns {Promise}
     */
    leave(): Promise<any>;
}
declare namespace GroupChat {
    export { GroupParticipant };
}
import Chat = require("./chat.jeast");
/**
 * Participant information
 */
type GroupParticipant = {
    id: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
};
