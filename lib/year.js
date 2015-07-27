'use strict';

/**
 * Returns true when given year is a leap year.
 *
 * @argument {Number} year
 *
 * @returns {Boolean}
 */
function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

export { isLeapYear };
