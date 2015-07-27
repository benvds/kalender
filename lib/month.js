'use strict';

import * as year from './year';
import * as day from './day';

const monthsPerYear = 12;

/**
 * Returns amount of days for given month, includes leap days.
 *
 * @argument {Object} month
 * @argument {Number} month.year
 * @argument {Number} month.month
 *
 * @returns {Number} amount of days
 */
function amountOfDays(month) {
    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const normalAmount = daysPerMonth[month.month - 1];

    return hasLeapDay(month) ? normalAmount + 1 : normalAmount;
}

/**
 * Returns true when given month has a leap day.
 *
 * @argument {Object} month
 * @argument {Number} month.year
 * @argument {Number} month.month
 *
 * @returns {Boolean}
 */
function hasLeapDay(month) {
    const monthWithAdditionalDayOnLeapYear = 2;

    return (month.month === monthWithAdditionalDayOnLeapYear &&
        year.isLeapYear(month.year));
}

/**
 * Returns month previous to given month.
 *
 * @argument {Object} month
 * @argument {Number} month.year
 * @argument {Number} month.month
 *
 * @returns {Object} new month object
 */
function previousMonth(month) {
    if (month.month === 1) {
        return {
            year: (month.year - 1),
            month: monthsPerYear
        };
    } else {
        return {
            year: month.year,
            month: (month.month - 1)
        };
    }
}

/**
 * Returns month next to given month.
 *
 * @argument {Object} month
 * @argument {Number} month.year
 * @argument {Number} month.month
 *
 * @returns {Object} new month object
 */
function nextMonth(month) {
    if (month.month === monthsPerYear) {
        return {
            year: (month.year + 1),
            month: 1
        };
    } else {
        return {
            year: month.year,
            month: (month.month + 1)
        };
    }
}

/**
 * Returns collection of day objects for given month.
 *
 * @argument {Object} month
 * @argument {Number} month.year
 * @argument {Number} month.month
 *
 * @returns {Array} collection of day objects
 */
function days(month) {
    let result = [];

    for (let currentDay = 1, amount = amountOfDays(month);
         currentDay <= amount;
         currentDay++)
    {
        result.push({
            year: month.year,
            month: month.month,
            day: currentDay,
            dayOfWeek: day.dayOfWeek({
                year: month.year,
                month: month.month,
                day: currentDay
            })
        });
    }

    return flagToday(result);
}

function flagToday(days) {
    const curDate = new Date();
    const dayOfMonth = curDate.getDate();

    if (days[0].year === curDate.getFullYear() &&
        days[0].month === (curDate.getMonth() + 1))
    {
        return days.map(day => {
            if (day.day === dayOfMonth) {
                day.isToday = true;
            }

            return day;
        });
    } else {
        return days;
    }

}

export {
    amountOfDays,
    previousMonth,
    nextMonth,
    days
};
