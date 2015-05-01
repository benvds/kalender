'use strict';

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

    return date.getDay() + 1;
}

module.exports = {
    dayOfWeek: dayOfWeek
};
