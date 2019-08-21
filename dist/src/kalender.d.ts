declare type Kalender = Date[][];
declare type WeekStart = number;
declare type DateArgs = Date | IMonth | string;
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
declare type IKalenderOptions = WeekStart | IKalenderOptionsObj;
export default function kal(dateArgs?: DateArgs, options?: IKalenderOptions): Kalender;
export {};
