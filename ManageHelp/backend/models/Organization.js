/**
 * Organization class for keeping information handy
 * 
 * Created by Jon Tokad
 * 
 * Last updated: February 18 by Jon Tokad
 */


class Organization {

    #org_id;
    #join_code;
    #members;
    #schedules;

    constructor(org_id, join_code, members, schedules) {
        this.#org_id = org_id;
        this.#join_code = join_code;
        this.#members = members;
        this.#schedules = schedules;
    }

    /* getters and setters */

    get org_id() {
        return this.#org_id;
    }

    get join_code() {
        return this.#join_code;
    }

    get members() {
        return this.#members;
    }

    get schedules() {
        return this.#schedules;
    }

    set org_id(org_id) {
        this.#org_id = org_id;
    }

    set organization(organization) {
        this.#organization = organization;
    }

    set members(members) {
        this.#members = members;
    }

    set schedules(schedules) {
        this.#schedules = schedules;
    }
}