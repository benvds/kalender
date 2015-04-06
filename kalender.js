'use strict';

var _ = require('lodash');

var DAYS_PER_MONTH = {
        '28': [2],
        '30': [4, 6, 9, 11],
        '31': [1, 3, 5, 7, 8, 10, 12]
    },
    MONTH_WITH_ADDITIONAL_DAY_ON_LEAP_YEAR = 2;


function getMonth(year, month) {
    var dates = []

    for (var date = 1, amount = amountOfDays(year, month);
         date <= amount;
         date++)
    {
        dates.push(date);
    }

    return dates;
}

function amountOfDays(year, month) {
    var daysForMonth = Number(_.findKey(DAYS_PER_MONTH, function(months) {
        return _.contains(months, month);
    }));

    return addLeapDay(daysForMonth, year, month);
}

function addLeapDay(daysForMonth, year, month) {
    if (month === MONTH_WITH_ADDITIONAL_DAY_ON_LEAP_YEAR && isLeapYear(year)) {
        return daysForMonth + 1;
    } else {
        return daysForMonth;
    }
}

function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 != 0)) || (year % 400 === 0);
}

var kalender = {
    getMonth: getMonth
};

module.exports = kalender;
