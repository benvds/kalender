'use strict';

var _ = require('lodash');
var year = require('./year');

var MONTHS_PER_YEAR = 12;

function amountOfDays(month) {
    var DAYS_PER_MONTH = {
        28: [2],
        30: [4, 6, 9, 11],
        31: [1, 3, 5, 7, 8, 10, 12]
    };

    var daysPerMonth = Number(_.findKey(DAYS_PER_MONTH, function(months) {
        return _.contains(months, month.month);
    }));

    return hasLeapDay(month) ? daysPerMonth + 1 : daysPerMonth;
}

function hasLeapDay(month) {
    var MONTH_WITH_ADDITIONAL_DAY_ON_LEAP_YEAR = 2;

    return (month.month === MONTH_WITH_ADDITIONAL_DAY_ON_LEAP_YEAR &&
        year.isLeapYear(month.year));
}

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

function days(month) {
    var result = [];

    for (var day = 1, amount = amountOfDays(month); day <= amount; day++) {
        result.push({
            year: month.year,
            month: month.month,
            day: day
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
