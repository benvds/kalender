'use strict';

/**
 * Returns day of week for given day.
 * IMPORTANT: This is a 1–based index, so januari is 1 and december is 12. This
 * is in contrast with javascripts Date interface.
 *
 * @argument {Object} day
 * @argument {Number} day.year
 * @argument {Number} day.month
 * @argument {Number} day.day
 *
 * @returns {Number} day of week
 */
function dayOfWeek(day) {
    var date = new Date(Date.UTC(day.year, day.month - 1, day.day));

    return date.getDay() + 1;
}

module.exports = {
    dayOfWeek: dayOfWeek
};
