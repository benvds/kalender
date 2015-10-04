'use strict';

export default class Day {
    /**
     * Sets the year, month and day.
     *
     * @argument {Object} args
     * @argument {Number} args.year
     * @argument {Number} args.month
     * @argument {Number} args.date
     */
    constructor(_args) {
        let args = _args || this.defaultArgs();

        this.year = args.year;
        this.month = args.month;
        this.date = args.date;
        this.day = args.day;
    }

    defaultArgs() {
        let today = new Date();

        return {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            date: today.getDate(),
            day: today.getDay()
        };
    }

    /**
     * Returns new native Date object for day.
     *
     * @returns {Date} date for day
     */
    jsDate() {
        return new Date(this.year, this.month - 1, this.date);
    }

    /**
     * Returns day of week for given day. 1 for sunday, 7 for monday.
     *
     * @returns {Number} day of week
     */
    getDay() {
        return this.jsDate().getDay();
    }

    /**
     * Returns true when days are the same
     *
     * @arguments {Day} day to compare
     *
     * @returns {Boolean} comparison is the same day
     */
    isEqual(comparison) {
        return +this.jsDate() === +comparison.jsDate();
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
        return +this.jsDate() < +comparison.jsDate();
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
        return +this.jsDate() > +comparison.jsDate();
    }
}
