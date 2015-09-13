'use strict';

import Day from './day';

const monthsPerYear = 12;
const daysPerWeek = 7;

export default class Month {
    /**
     * Sets the year, month and day.
     *
     * @argument {Object} args
     * @argument {Number} args.year
     * @argument {Number} args.month
     */
    constructor(args) {
        this.year = args.year;
        this.month = args.month;
    }

    /**
     * Returns collection of days for this month.
     *
     * @returns {Array} collection of days
     */
    days() {
        let result = [];

        let firstDayOfWeek = new Day({
            year: this.year,
            month: this.month,
            day: 1
        }).getDayOfWeek();

        for (let currentDay = 0, amount = this.amountOfDays();
             currentDay < amount;
             currentDay++)
        {
            result.push(new Day({
                year: this.year,
                month: this.month,
                day: currentDay + 1,
                dayOfWeek: (firstDayOfWeek + currentDay) % daysPerWeek
            }));
        }

        return result;
    }

    /**
     * Returns previous month.
     * TODO just use a date object
     *
     * @returns {Object} new month object
     */
    previous() {
        if (this.month === 1) {
            return new Month({
                year: (this.year - 1),
                month: monthsPerYear
            });
        } else {
            return new Month({
                year: this.year,
                month: (this.month - 1)
            });
        }
    }

    /**
     * Returns next month.
     * TODO just use a date object
     *
     * @returns {Object} new Month object
     */
    next() {
        if (this.month === monthsPerYear) {
            return new Month({
                year: (this.year + 1),
                month: 1
            });
        } else {
            return new Month({
                year: this.year,
                month: (this.month + 1)
            });
        }
    }

    /**
     * Returns amount of days for month.
     *
     * @returns {Number} amount of days
     */
    amountOfDays() {
        return (new Date(this.year, this.month, 0)).getDate();
    }
}
