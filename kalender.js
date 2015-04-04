'use strict';

var _ = require('lodash');

var DAYS_PER_MONTH = {
    '28': [2],
    '30': [4, 6, 9, 11],
    '31': [1, 3, 5, 7, 8, 10, 12]
};

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
    return Number(_.reduce(DAYS_PER_MONTH,
                           function(result, months, daysForMonth) {
        return _.contains(months, month) ? daysForMonth : result;
    }, 0));
}

var kalender = {
    getMonth: getMonth
};

module.exports = kalender;
