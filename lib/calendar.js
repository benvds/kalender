'use strict';

import * as day from './day';
import * as month from './month';

const daysPerWeek = 7;

/**
 * Returns collection of day objects for the given month. Includes days from
 * sibling months to make for full weeks. Defaults to the current month.
 *
 * @argument {Object} month
 * @argument {Number} month.year
 * @argument {Number} month.month
 * @argument {Object} options
 * @argument {Number} options.weekStart sets the first day of week
 *
 * @returns {Object[]} days
 */
export function calendar(_currentMonth, options) {
    const currentMonth = _currentMonth || getCurrentMonth();
    const days = []
        .concat(daysMissingBefore(currentMonth, weekStart(options)))
        .concat(month.days(currentMonth))
        .concat(daysMissingAfter(currentMonth, weekStart(options)));

    return groupPerWeek(days);
}

/**
 * Group the days per week.
 *
 * @argument {Object[]} days
 *
 * @returns {Object[][]} returns a matrix of weeks and days
 */
function groupPerWeek(days) {
    const amountOfWeeks = days.length / daysPerWeek;
    let weeks = [];

    for (let week = 0; week < amountOfWeeks; week++) {
        weeks.push(days.slice(week * daysPerWeek,
                              (week + 1) * daysPerWeek));
    }

    return weeks;
}

/**
 * Returns week start using the one defined in options otherwise falls back to
 * default week start.
 *
 * @argument {Object} options
 * @argument {Number} options.weekStart sets the first day of week
 *
 * @returns {Number} week start
 */
function weekStart(options) {
    const weekStartDefault = 0;

    if (options && options.weekStart) {
        return options.weekStart;
    } else {
        return weekStartDefault;
    }
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
function daysMissingBefore(currentMonth, weekStart) {
    if (amountMissingBefore(currentMonth, weekStart)) {
        const days = month.days(month.previousMonth(currentMonth))
            .slice(-1 * amountMissingBefore(currentMonth, weekStart));

        return markAsSiblingMonth(days);
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
function amountMissingBefore(currentMonth, weekStart) {
    return (daysPerWeek - weekStart +
            month.days(currentMonth)[0].dayOfWeek) % daysPerWeek;
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
function daysMissingAfter(currentMonth, weekStart) {
    if (amountMissingAfter(currentMonth, weekStart)) {
        const days = month.days(month.nextMonth(currentMonth))
            .slice(0, amountMissingAfter(currentMonth, weekStart));

        return markAsSiblingMonth(days);
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
function amountMissingAfter(currentMonth, weekStart) {
    const days = month.days(currentMonth);
    const lastDayOfWeek = day.dayOfWeek(days[(days.length - 1)]);

    return ((daysPerWeek + weekStart) - lastDayOfWeek - 1) % daysPerWeek;
}

/**
 * Returns collection of days marked as sibling month.
 *
 * @argument {Object[]} days
 * @argument {Number} days[].year
 * @argument {Number} days[].month
 * @argument {Number} days[].day
 *
 * @returns {Object[]} days with attribute isSiblingMonth: true
 */
function markAsSiblingMonth(days) {
    return days.map(day => {
        day.isSiblingMonth = true;

        return day;
    });
}

/**
 * Returns the current month
 *
 * @returns {Object} month
 */
function getCurrentMonth() {
    const currentDate = new Date();

    return {
        year: currentDate.getFullYear(),
        month: (currentDate.getMonth() + 1)
    };
}
