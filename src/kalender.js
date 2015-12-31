const daysPerWeek = 7;

/**
 *  Return a table of dates. Includes dates for missing days surrounding the
 *  month.
 *
 *  Examples:
 *      kalender() == kalender(new Date())
 *      kalender(new Date(2014, 0, 31))
 *      kalender({ year: 2014, month: 0 })
 *      kalender('2014-1-31')
 *      kalender('2014-1-31', 1)
 *      kalender({ weekStart: 1 }) == kalender(new Date(), 1)
 *
 *  @argument {Date|Object|String} dateValue a value which represents a date.
 *              An object should contain a year and month value like, e.g.
 *              { year: 1999, month: 0 }. A string is passed to the Date
 *              constructor. When undefined calendar defaults to the current
 *              month
 *  @argument {Number} weekStart day in which the week starts. 0-based index,
 *              0 is sunday, 6 is saturday
 *
 *  @returns {Date[][]} nested arrays of dates grouped per week
 *
 */
export default function kalender(dateValue, weekStart) {
    const days = calendarDays(dateValue, weekStart);

    return days.reduce(function fillCalendar(calendar, day, index) {
        const weekIndex = Math.floor(index / daysPerWeek);
        const dayIndex = index % daysPerWeek;

        calendar[weekIndex][dayIndex] = day;

        return calendar;
    }, emptyCalendar(days.length));
}

/**
 *  Returns an array with the calendar dates. Includes surrounding days to fill
 *  all the weeks.
 *
 *  @argument {Date|Object|String|undefined} dateValue a value which represents
 *              a date. An object should contain a year and month value like,
 *              e.g. { year: 1999, month: 0 }. A string is passed to the Date
 *              constructor. When undefined calendar defaults to the current
 *              month
 *  @argument {Number} weekStart day in which the week starts. 0-based index,
 *              0 is sunday, 6 is saturday
 *
 *  @returns {Date[]} an array of dates for the calendar
 *
 */
function calendarDays(dateValue, _weekStart) {
    const { year, month } = yearAndMonth(dateValue);
    const weekStart = parseWeekStart(dateValue, _weekStart);
    const startDayOfMonth = -1 * daysMissingBefore(year, month, weekStart);
    const amountDays = totalDays(year, month, weekStart);
    let result = new Array(amountDays);

    for (let i = 1; i <= amountDays; i++) {
        result[i - 1] = new Date(year, month, startDayOfMonth + i);
    }

    return result;
}

/**
 *  Returns a year/month object from dateValue. Defaults to the current month.
 *
 *  @argument {Date|Object|String|undefined} dateValue
 *
 *  @returns {Object} a year/month object
 *
 */
function yearAndMonth(dateValue) {
    if (dateValue instanceof Date) {
        return yearAndMonthFromDate(dateValue);
    } else if (typeof dateValue === 'object') {
        return dateValue;
    } else if (typeof dateValue === 'undefined') {
        return yearAndMonthFromDate(new Date());
    } else {
        return yearAndMonthFromDate(new Date(dateValue));
    }
}

/**
 *  Returns an object containing a year and month. Months use Date's 0-based
 *  index.
 *
 *  @argument {Date} date
 *
 *  @returns {Object} containing the date's year and month
 *
 */
function yearAndMonthFromDate(date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth()
    };
}

/**
 *  Returns the week start. The weekStart argument takes precedence otherwise
 *  it looks into a dateValue object. Returns undefined if no weekStart is
 *  found.
 *
 *  @argument {Date|Object|String|undefined} dateValue
 *  @argument {Number} weekStart day in which the week starts
 *
 *  @returns {Number|undefined} the week start index
 *
 */
function parseWeekStart(dateValue, weekStart) {
    if (typeof weekStart === 'number') {
        return weekStart;
    } else if (typeof dateValue === 'object') {
        return dateValue.weekStart;
    }
}

/**
 *  Returns amount of days missing before the first of the month given a week
 *  starts on week start.
 *
 *  @argument {Number} year
 *  @argument {Number} month
 *  @argument {Number} weekStart 0 = sunday, 6 = saturday
 *
 *  @returns {Number} amount of days missing before the first day of the month
 *
 */
function daysMissingBefore(year, month, weekStart = 0) {
    return (
        daysPerWeek - weekStart + new Date(year, month, 1).getDay()
    ) % daysPerWeek;
}

/**
 *  Returns actual days in a month excluding surrounding days
 *
 *  @argument {Number} year
 *  @argument {Number} month
 *
 *  @returns {Number} amount of days for a month excluding surrounding days
 *
 */
function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

/**
 *  Returns amount of weeks for a month including surrounding days.
 *
 *  @argument {Number} year
 *  @argument {Number} month
 *  @argument {Number} weekStart
 *
 *  @returns {Number} amount of weeks for a month including surrounding days
 *
 */
function weeksForMonth(year, month, weekStart) {
    return Math.ceil(
        (daysInMonth(year, month) +
            daysMissingBefore(year, month, weekStart)) / daysPerWeek
    );
}

/**
 *  Returns the totals days for a month including surrounding days.
 *
 *  @argument {Number} year
 *  @argument {Number} month
 *  @argument {Number} weekStart
 *
 *  @returns {Number} amount of days for a month including surrounding days
 *
 */
function totalDays(year, month, weekStart) {
    return weeksForMonth(year, month, weekStart) * daysPerWeek;
}

/**
 *  Returns an empty table for the calendar dates.
 *
 *  @argument {Number} totalDays total number of days for the calendar
 *
 *  @returns {[][]} nested arrays for each week of the calendar
 *
 */
function emptyCalendar(totalDays) {
    const totalWeeks = totalDays / daysPerWeek;
    let result = [];

    for (let i = 0; i < totalWeeks; i++) {
        result[i] = new Array(daysPerWeek);
    }

    return result;
}
