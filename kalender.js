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
    // TODO refactor into a expanded "find" function to increase readability
    var amount = Number(_.reduce(DAYS_PER_MONTH,
                           function(result, months, daysForMonth) {
        return _.contains(months, month) ? daysForMonth : result;
    }, 0));

    if (month === MONTH_WITH_ADDITIONAL_DAY_ON_LEAP_YEAR && isLeapYear(year)) {
        amount++;
    }

    return amount;
}

function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 != 0)) || (year % 400 === 0);
}


var kalender = {
    getMonth: getMonth
};

module.exports = kalender;
