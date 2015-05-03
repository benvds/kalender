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

module.exports = {
    mapDays: mapDays
};
