(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.kalender = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _libYear = require('./lib/year');

var year = _interopRequireWildcard(_libYear);

var _libMonth = require('./lib/month');

var month = _interopRequireWildcard(_libMonth);

var _libDay = require('./lib/day');

var day = _interopRequireWildcard(_libDay);

var _libUtil = require('./lib/util');

var util = _interopRequireWildcard(_libUtil);

var _libCalendar = require('./lib/calendar');

exports.year = year;
exports.month = month;
exports.day = day;
exports.calendar = _libCalendar.calendar;
exports.util = util;

},{"./lib/calendar":2,"./lib/day":3,"./lib/month":4,"./lib/util":5,"./lib/year":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.calendar = calendar;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _day = require('./day');

var day = _interopRequireWildcard(_day);

var _month = require('./month');

var month = _interopRequireWildcard(_month);

var daysPerWeek = 7;

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

function calendar(_currentMonth, options) {
    var currentMonth = _currentMonth || getCurrentMonth();
    var days = [].concat(daysMissingBefore(currentMonth, weekStart(options))).concat(month.days(currentMonth)).concat(daysMissingAfter(currentMonth, weekStart(options)));

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
    var amountOfWeeks = days.length / daysPerWeek;
    var weeks = [];

    for (var week = 0; week < amountOfWeeks; week++) {
        weeks.push(days.slice(week * daysPerWeek, (week + 1) * daysPerWeek));
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
    var weekStartDefault = 0;

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
        var days = month.days(month.previousMonth(currentMonth)).slice(-1 * amountMissingBefore(currentMonth, weekStart));

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
    return (daysPerWeek - weekStart + month.days(currentMonth)[0].dayOfWeek) % daysPerWeek;
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
        var days = month.days(month.nextMonth(currentMonth)).slice(0, amountMissingAfter(currentMonth, weekStart));

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
    var lastDayOfWeek = day.dayOfWeek(days[days.length - 1]);

    return (daysPerWeek + weekStart - lastDayOfWeek - 1) % daysPerWeek;
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
    return days.map(function (day) {
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
    var currentDate = new Date();

    return {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1
    };
}

},{"./day":3,"./month":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var dayWeights = {
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
    return day.day * dayWeights.day + day.month * dayWeights.month + day.year * dayWeights.year;
}

/**
 * Returns if subject day is the same as the comparison day.
 *
 * @argument {Object} subject day
 * @argument {Object} comparsion day
 *
 * @returns {Boolean} true when subject day is the same as the comparison day
 */
function isEqual(subject, comparison) {
    return subject.day === comparison.day && subject.month === comparison.month && subject.year === comparison.year;
}

exports.dayOfWeek = dayOfWeek;
exports.isBefore = isBefore;
exports.isAfter = isAfter;
exports.isEqual = isEqual;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _year = require('./year');

var year = _interopRequireWildcard(_year);

var _day = require('./day');

var day = _interopRequireWildcard(_day);

var monthsPerYear = 12;

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
    var daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var normalAmount = daysPerMonth[month.month - 1];

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
    var monthWithAdditionalDayOnLeapYear = 2;

    return month.month === monthWithAdditionalDayOnLeapYear && year.isLeapYear(month.year);
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
            year: month.year - 1,
            month: monthsPerYear
        };
    } else {
        return {
            year: month.year,
            month: month.month - 1
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
            year: month.year + 1,
            month: 1
        };
    } else {
        return {
            year: month.year,
            month: month.month + 1
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

    for (var currentDay = 1, amount = amountOfDays(month); currentDay <= amount; currentDay++) {
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
    var curDate = new Date();
    var dayOfMonth = curDate.getDate();

    if (days[0].year === curDate.getFullYear() && days[0].month === curDate.getMonth() + 1) {
        return days.map(function (day) {
            if (day.day === dayOfMonth) {
                day.isToday = true;
            }

            return day;
        });
    } else {
        return days;
    }
}

exports.amountOfDays = amountOfDays;
exports.previousMonth = previousMonth;
exports.nextMonth = nextMonth;
exports.days = days;

},{"./day":3,"./year":6}],5:[function(require,module,exports){
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
Object.defineProperty(exports, '__esModule', {
  value: true
});
function mapDays(calendar, callback) {
  return calendar.map(function (week) {
    return week.map(callback);
  });
}

exports.mapDays = mapDays;

},{}],6:[function(require,module,exports){
'use strict';

/**
 * Returns true when given year is a leap year.
 *
 * @argument {Number} year
 *
 * @returns {Boolean}
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

exports.isLeapYear = isLeapYear;

},{}]},{},[1])(1)
});
//# sourceMappingURL=kalender.js.map
