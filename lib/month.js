'use strict';

var _ = require('lodash');
var year = require('./year');

var MONTHS_PER_YEAR = 12;

function amountOfDays(month) {
    var DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var normalAmount = DAYS_PER_MONTH[month.month - 1];

    return hasLeapDay(month) ? normalAmount + 1 : normalAmount;
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
