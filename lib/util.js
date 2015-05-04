'use strict';

var DAY_WEIGHTS = {
    year: 256,
    month: 16,
    day: 1
};

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
    return dayWeight(subject) < dayWeight(comparison);
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
    return dayWeight(subject) > dayWeight(comparison);
}

/**
 * Returns weight for a day which can be used in comparisons. Weights are not
 * relative to each other. Later dates only have higher weights. Using weights
 * is more than a 100 times faster than creating a date and getting the
 * primitive value.
 *
 * @argument {Object} day
 * @argument {Number} day.year
 * @argument {Number} day.month
 * @argument {Number} day.day
 *
 * @returns {Number} dayWeight timestamp for start of day
 */
function dayWeight(day) {
    return (day.day * DAY_WEIGHTS.day) +
        (day.month * DAY_WEIGHTS.month) +
        (day.year * DAY_WEIGHTS.year);
}

module.exports = {
    mapDays: mapDays,
    isBefore: isBefore,
    isAfter: isAfter
};
