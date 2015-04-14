'use strict';

var _ = require('lodash');


var year = (function() {
    function isLeapYear(year) {
        return ((year % 4 === 0) && (year % 100 != 0)) || (year % 400 === 0);
    }

    return {
        isLeapYear: isLeapYear
    };
})();


var month = (function() {
    var MONTHS_PER_YEAR = 12,
        DAYS_PER_MONTH = {
            '28': [1],
            '30': [3, 5, 8, 10],
            '31': [0, 2, 4, 6, 7, 9, 11]
        },
        MONTH_WITH_ADDITIONAL_DAY_ON_LEAP_YEAR = 1;

    function amountOfDays(month) {
        var daysPerMonth = Number(_.findKey(DAYS_PER_MONTH, function(months) {
            return _.contains(months, month.month);
        }));

        return hasLeapDay(month) ? daysPerMonth + 1 : daysPerMonth;
    }

    function hasLeapDay(month) {
        return (month.month === MONTH_WITH_ADDITIONAL_DAY_ON_LEAP_YEAR &&
            year.isLeapYear(month.year));
    }

    function previousMonth(month) {
        if (month.month === 0) {
            return {
                year: (month.year - 1),
                month: MONTHS_PER_YEAR - 1
            };
        } else {
            return {
                year: month.year,
                month: (month.month - 1)
            };
        }
    }

    function nextMonth(month) {
        if (month.month === MONTHS_PER_YEAR - 1) {
            return {
                year: (month.year + 1),
                month: 0
            };
        } else {
            return {
                year: month.year,
                month: (month.month + 1)
            };
        }
    }

    function days(month) {
        var days = []

        for (var day = 0, amount = amountOfDays(month);
             day < amount;
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

    return {
        amountOfDays: amountOfDays,
        previousMonth: previousMonth,
        nextMonth: nextMonth,
        days: days
    };
})();


var day = (function() {
    function dayOfWeek(day) {
        var date = new Date(Date.UTC(day.year, day.month, day.day + 1));

        return date.getDay();
    }

    return {
        dayOfWeek: dayOfWeek
    };
})();


var calendar = (function() {
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
        return day.dayOfWeek(month.days(currentMonth)[0]);
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
        return (DAYS_PER_WEEK - 1) -
            day.dayOfWeek(_.last(month.days(currentMonth)));
    }

    return calendar;
})();


module.exports = {
    year: year,
    month: month,
    day: day,
    calendar: calendar
};
