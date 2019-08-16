const daysPerWeek = 7;

type Kalender = Date[][];
type WeekStart = number;
type DateArgs = Date | IMonth | string;

interface IMonth {
  year: number;
  month: number;
}

/**
 *  Return a table of dates. Includes dates for missing days surrounding the
 *  month.
 *
 *  Examples:
 *      kal() == kal(new Date())
 *      kal(new Date(2014, 0, 31))
 *      kal({ year: 2014, month: 0 })
 *      kal('2014-1-31')
 *      kal('2014-1-31', 1)
 *      kal({ weekStart: 1 }) == kal(new Date(), 1)
 *
 *  @argument {Date|Object|String} dateArgs a value which represents a date.
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
interface IKalenderOptionsObj {
  weekStart: WeekStart;
}
type IKalenderOptions = WeekStart | IKalenderOptionsObj;

export default function kal(
  dateArgs: DateArgs = new Date(),
  options?: IKalenderOptions
): Kalender {
  const month = monthFromDateArgs(dateArgs);
  const weekStart = parseOptions(options);
  const days = calendarDays(month, weekStart);

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
 *  @argument {Date|Object|String|undefined} dateArgs a value which represents
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
function calendarDays(month: IMonth, weekStart: WeekStart): Date[] {
  const startDayOfMonth = -1 * daysMissingBefore(month, weekStart);
  const amountDays = totalDaysForMonth(month, weekStart);
  const result = new Array(amountDays);

  for (let i = 1; i <= amountDays; i++) {
    result[i - 1] = new Date(month.year, month.month, startDayOfMonth + i);
  }

  return result;
}

/**
 *  Returns a year/month object from dateArgs. Defaults to the current month.
 *
 *  @argument {Date|Object|String|undefined} dateArgs
 *
 *  @returns {Object} a year/month object
 *
 */
function monthFromDateArgs(dateArgs: DateArgs): IMonth {
  if (dateArgs instanceof Date) {
    return monthFromDate(dateArgs);
  } else if (typeof dateArgs === "object") {
    return dateArgs;
  } else {
    return monthFromDate(new Date(dateArgs));
  }
}

/**
 *  Returns an object containing a year and month. Months use Date's 0-based
 *  index.
 *
 *  @argument {Date} date
 *
 *  @returns {IMonth} containing the date's year and month
 *
 */
function monthFromDate(date: Date): IMonth {
  return {
    month: date.getMonth(),
    year: date.getFullYear()
  };
}

/**
 *  Returns the week start. The weekStart argument takes precedence otherwise
 *  it looks into a DateArgs object. Returns undefined if no weekStart is
 *  found.
 *
 *  @argument {Number} weekStart day in which the week starts
 *
 *  @returns {Number|undefined} the week start index
 *
 */
function parseOptions(options?: IKalenderOptions): WeekStart {
  const defaultWeekStart = 0;

  if (typeof options === "number") {
    return options;
  } else if (typeof options === "object") {
    return options.weekStart;
  } else {
    return defaultWeekStart;
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
function daysMissingBefore(month: IMonth, weekStart: WeekStart): number {
  return (
    (daysPerWeek - weekStart + new Date(month.year, month.month, 1).getDay()) %
    daysPerWeek
  );
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
function daysInMonth(month: IMonth): number {
  return new Date(month.year, month.month + 1, 0).getDate();
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
function weeksForMonth(month: IMonth, weekStart: WeekStart): number {
  return Math.ceil(
    (daysInMonth(month) + daysMissingBefore(month, weekStart)) / daysPerWeek
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
function totalDaysForMonth(month: IMonth, weekStart: WeekStart): number {
  return weeksForMonth(month, weekStart) * daysPerWeek;
}

/**
 *  Returns an empty table for the calendar dates.
 *
 *  @argument {Number} totalDays total number of days for the calendar
 *
 *  @returns {[][]} nested arrays for each week of the calendar
 *
 */
function emptyCalendar(totalDays: number): Kalender {
  const totalWeeks = totalDays / daysPerWeek;
  const result = [];

  for (let i = 0; i < totalWeeks; i++) {
    result[i] = new Array(daysPerWeek);
  }

  return result;
}
