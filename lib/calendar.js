'use strict';

var _ = require('lodash');
var month = require('./month');
var day = require('./day');

var DAYS_PER_WEEK = 7;

function calendar(currentMonth) {
    return []
        .concat(daysMissingBefore(currentMonth))
        .concat(month.days(currentMonth))
        .concat(daysMissingAfter(currentMonth));
}

function daysMissingBefore(currentMonth) {
    if (amountMissingBefore(currentMonth)) {
        return month.days(month.previousMonth(currentMonth))
            .slice(-1 * amountMissingBefore(currentMonth));
    } else {
        return [];
    }
}

function amountMissingBefore(currentMonth) {
    return day.dayOfWeek(month.days(currentMonth)[0]) - 1;
}

function daysMissingAfter(currentMonth) {
    if (amountMissingAfter(currentMonth)) {
        return month.days(month.nextMonth(currentMonth))
            .slice(0, amountMissingAfter(currentMonth));
    } else {
        return [];
    }
}

function amountMissingAfter(currentMonth) {
    return DAYS_PER_WEEK - day.dayOfWeek(_.last(month.days(currentMonth)));
}

module.exports = calendar;
