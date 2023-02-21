/**
 * User class for storing general information about a user, both account and corporate along with the shifts they are currently assigned
 * 
 * Created by Jon Tokad
 * 
 * Last updated: February 18 by Jon Tokad
 */

class User {

    /* private instance fields */

    #accountInfo;
    #workInfo;
    #shifts;
    
    constructor(accountInfo, workInfo, shifts) {
        this.#accountInfo = accountInfo;
        this.#workInfo = workInfo;
        this.#shifts = shifts;
    }

    /* getters and setters */

    get AccountInfo() {
        return this.#accountInfo;
    }

    get workInfo() {
        return this.#workInfo;
    }

    get shifts() {
        return this.#shifts;
    }

    set accountInfo(accountInfo) {
        this.#accountInfo = accountInfo;
    }

    set workInfo(workInfo) {
        this.#workInfo = workInfo;
    }

    set shifts(shifts) {
        this.#shifts = shifts;
    }

}