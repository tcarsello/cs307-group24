/**
 * ShiftSchedule class for keeping a list of shifts for the week
 * 
 * Created by Jon Tokad
 * 
 * Last updated: February 18 by Jon Tokad
 */


class ShiftSchedule {

    #schedule_id;
    #organization;
    #date;
    #shifts;

    constructor(schedule_id, organization, date, shifts) {
        this.#schedule_id = schedule_id;
        this.#organization = organization;
        this.#date = date;
        this.#shifts = shifts;
    }

    /* getters and setters */

    get schedule_id() {
        return this.#schedule_id;
    }

    get organization() {
        return this.#organization;
    }

    get date() {
        return this.#date;
    }

    get shifts() {
        return this.#shifts;
    }

    set schedule_id(schedule_id) {
        this.#schedule_id = schedule_id;
    }

    set organization(organization) {
        this.#organization = organization;
    }

    set date(date) {
        this.#date = date;
    }

    set shifts(shifts) {
        this.#shifts = shifts;
    }
}