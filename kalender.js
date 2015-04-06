'use strict';

var _ = require('lodash');

var DAYS_PER_WEEK = 7,
    MONTHS_PER_YEAR = 12,
    DAYS_PER_MONTH = {
        '28': [2],
        '30': [4, 6, 9, 11],
        '31': [1, 3, 5, 7, 8, 10, 12]
    },
    MONTH_WITH_ADDITIONAL_DAY_ON_LEAP_YEAR = 2;

function getCalendar(month, options) {
    var beforeDays = getDays(previousMonth(month));
    var mainDays = getDays(month);
    var afterDays = getDays(nextMonth(month));

    var openWeekDaysBefore = dayOfWeek(mainDays[0]);
    var openWeekDaysAfter = (DAYS_PER_WEEK - 1) - dayOfWeek(_.last(mainDays));

    var daysBefore = [],
        daysAfter = [];

    if (openWeekDaysBefore) {
        daysBefore = beforeDays.slice(-1 * openWeekDaysBefore);
    }

    if (openWeekDaysAfter) {
        daysAfter = afterDays.slice(0, openWeekDaysAfter);
    }

    return []
        .concat(daysBefore)
        .concat(mainDays)
        .concat(daysAfter);
}

function dayOfWeek(day) {
    var date = new Date(Date.UTC(day.year, day.month - 1, day.day));

    return date.getDay();
}

// TODO: confusing, getDays returns an array of days, month is an object with month & year
function getDays(month) {
    var days = []

    for (var day = 1, amount = amountOfDays(month);
         day <= amount;
         day++)
    {
        days.push({
            year: month.year,
            month: month.month,
            day: day
        });
    }

    return days;
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

function amountOfDays(month) {
    var amount = Number(_.findKey(DAYS_PER_MONTH, function(months) {
        return _.contains(months, month.month);
    }));

    return addLeapDay(amount, month);
}

function addLeapDay(amountOfDays, month) {
    if (month.month === MONTH_WITH_ADDITIONAL_DAY_ON_LEAP_YEAR &&
        isLeapYear(month.year))
    {
        return amountOfDays + 1;
    } else {
        return amountOfDays;
    }
}

function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 != 0)) || (year % 400 === 0);
}

var kalender = {
    getDays: getDays,
    getCalendar: getCalendar
};

module.exports = kalender;
