'use strict';

var _ = require('lodash');


var year = (function() {
    function isLeapYear(year) {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }

    return {
        isLeapYear: isLeapYear
    };
})();


var month = (function() {
    var MONTHS_PER_YEAR = 12,
        // TODO remove string keys, can be numbers
        DAYS_PER_MONTH = {
            '28': [2],
            '30': [4, 6, 9, 11],
            '31': [1, 3, 5, 7, 8, 10, 12]
        },
        MONTH_WITH_ADDITIONAL_DAY_ON_LEAP_YEAR = 2;

    function amountOfDays(month) {
        // TODO keys will be numbers already
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

        for (var day = 1, amount = amountOfDays(month);
             day <= amount;
             day++)
        {
            result.push({
                year: month.year,
                month: month.month,
                day: day
            });
        }

        return result;
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
        var date = new Date(Date.UTC(day.year, day.month - 1, day.day));

        return date.getDay() + 1;
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

    return calendar;
})();


module.exports = {
    year: year,
    month: month,
    day: day,
    calendar: calendar
};
