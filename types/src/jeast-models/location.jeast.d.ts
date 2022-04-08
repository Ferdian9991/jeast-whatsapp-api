export = Location;
/**
 * Location information
 */
declare class Location {
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @param {?string} description
     */
    constructor(latitude: number, longitude: number, description: string | null);
    /**
     * Location latitude
     * @type {number}
     */
    latitude: number;
    /**
     * Location longitude
     * @type {number}
     */
    longitude: number;
    /**
     * Name for the location
     * @type {?string}
     */
    description: string | null;
}
