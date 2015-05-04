'use strict';

/**
 * Returns a new calendar with the results of calling a provided callback
 * function on every day.
 *
 * @argument {Object[][]} calendar
 * @argument {Function} callback
 *
 * @returns {Object[][]} calendar with days mapped with callback
 */
function mapDays(calendar, callback) {
    return calendar.map(function(week) {
        return week.map(callback);
    });
}

/**
 * Returns if subject day is before comparison day.
 *
 * @argument {Object} subject day
 * @argument {Object} comparsion day
 *
 * @returns {Boolean} true when subject day is before comparison day
 */
function isBefore(subject, comparison) {
    return epoch(subject) < epoch(comparison);
}

/**
 * Returns if subject day is after comparison day.
 *
 * @argument {Object} subject day
 * @argument {Object} comparsion day
 *
 * @returns {Boolean} true when subject day is after comparison day
 */
function isAfter(subject, comparison) {
    return epoch(subject) > epoch(comparison);
}

/**
 * Returns epoch timestamp for start of day
 *
 * @argument {Object} day
 * @argument {Number} day.year
 * @argument {Number} day.month
 * @argument {Number} day.day
 *
 * @returns {Number} epoch timestamp for start of day
 */
function epoch(day) {
    return (new Date(day.year, day.month - 1, day.day)).valueOf();
}

module.exports = {
    mapDays: mapDays,
    isBefore: isBefore,
    isAfter: isAfter
};
