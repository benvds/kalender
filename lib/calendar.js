'use strict';

var month = require('./month');
var day = require('./day');

var DAYS_PER_WEEK = 7;

/**
 * Returns collection of day objects for the given month. Includes days from
 * sibling months to make for full weeks.
 *
 * @argument {Object} month
 * @argument {Number} month.year
 * @argument {Number} month.month
 *
 * @returns {Array}
 */
function calendar(currentMonth) {
    return []
        .concat(daysMissingBefore(currentMonth))
        .concat(month.days(currentMonth))
        .concat(daysMissingAfter(currentMonth));
}

/**
 * Returns collection of day objects for the month before given month. Only
 * includes days to make a full week.
 *
 * @argument {Object} month
 * @argument {Number} month.year
 * @argument {Number} month.month
 *
 * @returns {Array} collection of days
 */
function daysMissingBefore(currentMonth) {
    if (amountMissingBefore(currentMonth)) {
        return month.days(month.previousMonth(currentMonth))
            .slice(-1 * amountMissingBefore(currentMonth));
    } else {
        return [];
    }
}

/**
 * Returns amount of days missing before given month to make a full week.
 *
 * @argument {Object} month
 * @argument {Number} month.year
 * @argument {Number} month.month
 *
 * @returns {Number} amount of days
 */
function amountMissingBefore(currentMonth) {
    return day.dayOfWeek(month.days(currentMonth)[0]) - 1;
}

/**
 * Returns collection of day objects for the month after given month. Only
 * includes days to make a full week.
 *
 * @argument {Object} month
 * @argument {Number} month.year
 * @argument {Number} month.month
 *
 * @returns {Array} collection of days
 */
function daysMissingAfter(currentMonth) {
    if (amountMissingAfter(currentMonth)) {
        return month.days(month.nextMonth(currentMonth))
            .slice(0, amountMissingAfter(currentMonth));
    } else {
        return [];
    }
}

/**
 * Returns amount of days missing after given month to make a full week.
 *
 * @argument {Object} month
 * @argument {Number} month.year
 * @argument {Number} month.month
 *
 * @returns {Number} amount of days
 */
function amountMissingAfter(currentMonth) {
    var days = month.days(currentMonth);

    return DAYS_PER_WEEK - day.dayOfWeek(days[days.length - 1]);
}

module.exports = calendar;
