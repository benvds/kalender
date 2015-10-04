'use strict';

import { DAYS_PER_WEEK, MONTHS_PER_YEAR } from './consts';
import Day from './day';

function toArray(subject) {
    return Array.prototype.slice.call(subject);
}

export default class Month {
    /**
     * Sets the year, month
     */
    constructor() {
        var args = toArray(arguments);

        if (typeof args[0] === 'number') {
            this.constructWithNumbers(args);
        } else if (typeof args[0] === 'object') {
            this.constructWithObject(args[0]);
        } else if (typeof args[0] === 'undefined') {
            this.constructDefault();
        }
    }

    constructWithNumbers(numbers) {
        this.year = numbers[0];
        this.month = numbers[1];
    }

    constructWithObject(object) {
        this.year = object.year;
        this.month = object.month;
    }

    constructDefault() {
        let today = new Date();
        this.year = today.getFullYear();
        this.month = today.getMonth() + 1;
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
                dayOfWeek: (firstDayOfWeek + currentDay) % DAYS_PER_WEEK
            }));
        }

        return result;
    }

    /**
     * Returns previous month.
     *
     * @returns {Object} new month object
     */
    previous() {
        if (this.month === 1) {
            return new Month({
                year: (this.year - 1),
                month: MONTHS_PER_YEAR
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
     *
     * @returns {Object} new Month object
     */
    next() {
        if (this.month === MONTHS_PER_YEAR) {
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
