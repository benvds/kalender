'use strict';

var DAY_WEIGHTS = {
    year: 385,
    month: 32,
    day: 1
};

/**
 * Returns day of week for given day. 1 for sunday, 7 for monday.
 *
 * @argument {Object} day
 * @argument {Number} day.year
 * @argument {Number} day.month
 * @argument {Number} day.day
 *
 * @returns {Number} day of week
 */
function dayOfWeek(day) {
    var date = new Date(day.year, day.month - 1, day.day);

    return date.getDay();
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
    dayOfWeek: dayOfWeek,
    isBefore: isBefore,
    isAfter: isAfter
};
