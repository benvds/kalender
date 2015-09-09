'use strict';

import Day from './day';

const monthsPerYear = 12;

export default class Month {
    constructor(month) {
        this.year = month.year;
        this.month = month.month;
    }

    days() {
        return days({
            year: this.year,
            month: this.month
        });
    }

    previous() {
        return new Month(previousMonth({
            year: this.year,
            month: this.month
        }));
    }

    next() {
        return new Month(nextMonth({
            year: this.year,
            month: this.month
        }));
    }

    amountOfDays() {
        return amountOfDays({
            year: this.year,
            month: this.month
        });
    }
}

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
    return (new Date(month.year, month.month, 0)).getDate();
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

    let firstDayOfWeek = new Day({
        year: month.year,
        month: month.month,
        day: 1
    }).dayOfWeek();

    for (let currentDay = 0, amount = amountOfDays(month);
         currentDay < amount;
         currentDay++)
    {
        result.push({
            year: month.year,
            month: month.month,
            day: currentDay + 1,
            dayOfWeek: (firstDayOfWeek + currentDay) % 7
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

// export {
//     amountOfDays,
//     previousMonth,
//     nextMonth,
//     days
// };
