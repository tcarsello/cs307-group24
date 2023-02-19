/**
 * Shift class for storing general information about a shift
 * 
 * Created by Jon Tokad
 * 
 * Last updated: February 18 by Jon Tokad
 */


class Shift {

    #shift_id;
    #schedule;
    #time;
    #position;

    constructor(shift_id, schedule, time, position) {
        this.#shift_id = shift_id;
        this.#schedule = schedule;
        this.#time = time;
        this.#position = position;
    }

    /* getters and setters */

    get shift_id() {
        return this.#shift_id;
    }

    get schedule() {
        return this.#schedule;
    }

    get time() {
        return this.#time;
    }

    get position() {
        return this.#position;
    }

    set shift_id(shift_id) {
        this.#shift_id = shift_id;
    }

    set schedule(schedule) {
        this.#schedule = schedule;
    }

    set time(time) {
        this.#time = time;
    }

    set position(position) {
        this.#position = position;
    }
}