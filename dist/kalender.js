(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.kalender = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    year: require('./lib/year'),
    month: require('./lib/month'),
    day: require('./lib/day'),
    calendar: require('./lib/calendar')
};

},{"./lib/calendar":2,"./lib/day":3,"./lib/month":4,"./lib/year":5}],2:[function(require,module,exports){
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
 * @argument {Object} options
 * @argument {Number} options.weekStart sets the first day of week
 *
 * @returns {Object[]} days
 */
function calendar(currentMonth, options) {
    return []
        .concat(daysMissingBefore(currentMonth, weekStart(options)))
        .concat(month.days(currentMonth))
        .concat(daysMissingAfter(currentMonth, weekStart(options)));
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
    var WEEK_START_DEFAULT = 1;

    if (options && options.weekStart) {
        return options.weekStart;
    } else {
        return WEEK_START_DEFAULT;
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
        var days = month.days(month.previousMonth(currentMonth))
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
    return (DAYS_PER_WEEK - weekStart +
            month.days(currentMonth)[0].weekDay) % DAYS_PER_WEEK;
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
        var days = month.days(month.nextMonth(currentMonth))
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
    var days = month.days(currentMonth);

    return DAYS_PER_WEEK - day.dayOfWeek(days[days.length - weekStart]);
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
    return days.map(function(day) {
        day.isSiblingMonth = true;

        return day;
    });
}

module.exports = calendar;

},{"./day":3,"./month":4}],3:[function(require,module,exports){
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
    var date = new Date(Date.UTC(day.year, day.month - 1, day.day));

    return date.getDay() + 1;
}

module.exports = {
    dayOfWeek: dayOfWeek
};

},{}],4:[function(require,module,exports){
'use strict';

var year = require('./year');
var day = require('./day');

var MONTHS_PER_YEAR = 12;

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
    var DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var normalAmount = DAYS_PER_MONTH[month.month - 1];

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
    var MONTH_WITH_ADDITIONAL_DAY_ON_LEAP_YEAR = 2;

    return (month.month === MONTH_WITH_ADDITIONAL_DAY_ON_LEAP_YEAR &&
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
            month: MONTHS_PER_YEAR
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
    if (month.month === MONTHS_PER_YEAR) {
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
    var result = [];

    for (var currentDay = 1, amount = amountOfDays(month);
         currentDay <= amount;
         currentDay++)
    {
        result.push({
            year: month.year,
            month: month.month,
            day: currentDay,
            weekDay: day.dayOfWeek({
                year: month.year,
                month: month.month,
                day: currentDay
            })
        });
    }

    return result;
}

module.exports = {
    amountOfDays: amountOfDays,
    previousMonth: previousMonth,
    nextMonth: nextMonth,
    days: days
};

},{"./day":3,"./year":5}],5:[function(require,module,exports){
'use strict';

/**
 * Returns true when given year is a leap year.
 *
 * @argument {Number} year
 *
 * @returns {Boolean}
 */
function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

module.exports = {
    isLeapYear: isLeapYear
};

},{}]},{},[1])(1)
});
//# sourceMappingURL=kalender.js.map