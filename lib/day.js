'use strict';

export default class Day {
    /**
     * Sets the year, month and day.
     *
     * @argument {Object} args
     * @argument {Number} args.year
     * @argument {Number} args.month
     * @argument {Number} args.day
     */
    constructor(args) {
        this.year = args.year;
        this.month = args.month;
        this.day = args.day;
        this.dayOfWeek = args.dayOfWeek;
    }

    /**
     * Returns new native Date object for day.
     *
     * @returns {Date} date for day
     */
    date() {
        return new Date(this.year, this.month - 1, this.day);
    }

    /**
     * Returns day of week for given day. 1 for sunday, 7 for monday.
     *
     * @returns {Number} day of week
     */
    getDayOfWeek() {
        return this.date().getDay();
    }

    /**
     * Returns true when days are the same
     *
     * @arguments {Day} day to compare
     *
     * @returns {Boolean} comparison is the same day
     */
    isEqual(comparison) {
        return +this.date() === +comparison.date();
    }

    /**
     * Returns true when this day is before comparison day. Returns false when
     * days are the same.
     *
     * @arguments {Day} day to compare
     *
     * @returns {Boolean} this day is before comparison day
     */
    isBefore(comparison) {
        return +this.date() < +comparison.date();
    }

    /**
     * Returns true when this day is after comparison day. Returns false when
     * days are the same.
     *
     * @arguments {Day} day to compare
     *
     * @returns {Boolean} this day is after comparison day
     */
    isAfter(comparison) {
        return +this.date() > +comparison.date();
    }
}
