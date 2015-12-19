const daysPerWeek = 7;

// amount of days missing before the month given a week starts on week start
function daysMissingBefore(year, month, weekStart = 0) {  
    return (daysPerWeek - weekStart + new Date(year, month, 1).getDay())
        % daysPerWeek;
}

// actual days in a month excluding surrounding days
function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// amount of weeks for a month including surrounding days
function weeksForMonth(year, month, weekStart) {
    return Math.ceil(
        (daysInMonth(year, month) +
            daysMissingBefore(year, month, weekStart)) / daysPerWeek
    );
}

// amount of days for a month including surrounding days
function totalDays(year, month, weekStart) {
    return weeksForMonth(year, month, weekStart) * daysPerWeek;
}

// take a date value and returns an object with a year and month value
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

function yearAndMonthFromDate(date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth()
    };
}

// array of all dates including surrounding days
function calendarDays(dateValue, weekStart) {
    const { year, month } = yearAndMonth(dateValue);
    const startDayOfMonth = -1 * daysMissingBefore(year, month, weekStart);
    const amountDays = totalDays(year, month);
    let result = new Array(amountDays);
    
    for (let i = 1; i <= amountDays; i++) {
        result[i - 1] = new Date(year, month, startDayOfMonth + i);
    }
    
    return result;
}

// builds empty calendar table
function emptyCalendar(totalDays) {
    const totalWeeks = totalDays / daysPerWeek;
    let result = [];
    
    for (let i = 0; i < totalWeeks; i++) {
        result[i] = new Array(daysPerWeek);
    }
    
    return result;
}

/**
 *  Return a table of dates. Includes dates for missing days surrounding the
 *  month.
 *
 *  Examples:
 *      calendar() == calendar(new Date())
 *      calendar(new Date(2014, 0, 31))
 *      calendar({ year: 2014, month: 0 })
 *      calendar('2014-1-31')
 *      calendar('2014-1-31', 1)
 *      calendar(undefined, 1) == calendar(new Date(), 1)
 *
 *  @argument {Date|Object|String} dateValue a value which represents a date.
 *              An object should contain a year and month value like, e.g.
 *              { year: 1999, month: 0 }. A string is passed to the Date
 *              constructor. When undefined calendar defaults to the current
 *              month.
 *  @argument {Number} weekStart day in which the week starts. 0-based index,
 *              0 is sunday, 6 is saturday.
 *
 *  @returns {Date[][]} nested arrays of dates grouped per week.
 *
 */
export default function kalender(dateValue, weekStart) {
    const days = calendarDays(dateValue, weekStart);
    
    return days.reduce(function combiner(calendar, day, index) {
        const weekIndex = Math.floor(index / daysPerWeek);
        const dayIndex = index % daysPerWeek;
        
        calendar[weekIndex][dayIndex] = day;
        
        return calendar;
    }, emptyCalendar(days.length));
}

// calendarDays({ year: 2015, month: 11 });
// console.log(calendar(undefined, 1)[4][0].toString());
