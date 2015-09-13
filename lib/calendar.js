'use strict';

import { DAYS_PER_WEEK } from './consts';
import Month from './month';

/**
 * Returns collection of day objects for the given month. Includes days from
 * sibling months to make for full weeks. Defaults to the current month.
 *
 * @argument {Object} month
 * @argument {Number} month.year
 * @argument {Number} month.month
 * @argument {Object} options
 * @argument {Number} options.weekStart sets the first day of week
 *
 * @returns {Object[]} days
 */
export default class Calendar {
    constructor(month, options) {
        this.weekStart = this.getWeekStart(options);
        this.month = new Month(month || this.defaultMonth());
    }

    days() {
        let currentDays = this.month.days();
        let days = []
            .concat(this.daysMissingBefore())
            .concat(currentDays)
            .concat(this.daysMissingAfter(currentDays));

        return this.groupPerWeek(this.markToday(days));
    }

    /**
     * Returns the current month
     *
     * @returns {Object} month
     * @returns {Object} month.year
     * @returns {Object} month.month
     */
    defaultMonth() {
        let today = new Date();

        return {
            year: today.getFullYear(),
            month: (today.getMonth() + 1)
        };
    }

    /**
     * Returns week start using the one defined in options otherwise falls back to
     * default week start.
     *
     * @argument {Object} options
     * @argument {Number} options.weekStart sets the first day of week
     *
     * @returns {Number} week start
     */
    getWeekStart(options) {
        const WEEK_START_DEFAULT = 0;

        if (options && options.weekStart) {
            return options.weekStart;
        } else {
            return WEEK_START_DEFAULT;
        }
    }

    /**
     * Returns collection of day objects for the month before given month. Only
     * includes days to make a full week.
     *
     * @returns {Array} collection of days
     */
    daysMissingBefore() {
        let amount = this.amountMissingBefore();

        if (amount) {
            let days = this.month.previous().days()
                .slice(-1 * amount);

            return this.markSiblingMonths(days);
        } else {
            return [];
        }
    }

    /**
     * Returns amount of days missing before given month to make a full week.
     *
     * @argument {Object} month
     * @argument {Number} month.year
     * @argument {Number} month.month
     *
     * @returns {Number} amount of days
     */
    amountMissingBefore() {
        return (DAYS_PER_WEEK - this.weekStart +
            (new Date(this.month.year, this.month.month - 1, 1)).getDay()) %
            DAYS_PER_WEEK;
    }

    /**
     * Returns collection of days marked as sibling month.
     *
     * @argument {Object[]} days
     * @argument {Number} days[].year
     * @argument {Number} days[].month
     * @argument {Number} days[].day
     *
     * @returns {Object[]} days with attribute isSiblingMonth: true
     */
    markSiblingMonths(days) {
        return days.map(day => {
            day.isSiblingMonth = true;

            return day;
        });
    }

    /**
     * Returns collection of day objects for the month after given month. Only
     * includes days to make a full week.
     *
     * @argument {Object} month
     * @argument {Number} month.year
     * @argument {Number} month.month
     *
     * @returns {Array} collection of days
     */
    daysMissingAfter(currentDays) {
        if (this.amountMissingAfter(currentDays)) {
            let days = this.month.next().days()
                .slice(0, this.amountMissingAfter(currentDays));

            return this.markSiblingMonths(days);
        } else {
            return [];
        }
    }

    /**
     * Returns amount of days missing after given month to make a full week.
     *
     * @argument {Object} month
     * @argument {Number} month.year
     * @argument {Number} month.month
     *
     * @returns {Number} amount of days
     */
    amountMissingAfter(currentDays) {
        let lastDayOfWeek = currentDays[(currentDays.length - 1)].dayOfWeek;

        return ((DAYS_PER_WEEK + this.weekStart) - lastDayOfWeek - 1) % DAYS_PER_WEEK;
    }

    markToday(days) {
        let today = new Date();
        let dayOfMonth = today.getDate();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;

        return days.map(day => {
            if (day.day === dayOfMonth &&
                day.month === month &&
                day.year === year)
            {
                day.isToday = true;
            }

            return day;
        });

    }

    /**
     * Group the days per week.
     *
     * @argument {Object[]} days
     *
     * @returns {Object[][]} returns a matrix of weeks and days
     */
    groupPerWeek(days) {
        let amountOfWeeks = days.length / DAYS_PER_WEEK;
        let weeks = [];

        for (let week = 0; week < amountOfWeeks; week++) {
            weeks.push(days.slice(week * DAYS_PER_WEEK,
                                  (week + 1) * DAYS_PER_WEEK));
        }

        return weeks;
    }
}

