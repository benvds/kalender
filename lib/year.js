'use strict';

export default class Year {
    /**
     * Returns true when given year is a leap year.
     *
     * @argument {Number} year
     *
     * @returns {Boolean}
     */
    static isLeapYear(year) {
        return (new Date(year, 2, 0)).getDate() === 29;
        // return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }
}
