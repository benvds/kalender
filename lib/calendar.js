'use strict';

// import Day from './day';
import Month from './month';

const daysPerWeek = 7;

// let today = new Date();

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
    constructor(_currentMonth, options) {
        let currentMonth = _currentMonth || this.getCurrentMonth();
        let currentDays = new Month(currentMonth).days();

        // TODO move this to days methods, build proper constructor
        this._days = []
            .concat(this.daysMissingBefore(currentMonth,
                this.weekStart(options)))
            .concat(currentDays)
            .concat(this.daysMissingAfter(currentMonth,
                this.weekStart(options), currentDays));
    }

    days() {
        let days = this.markToday(this._days);
        return this.groupPerWeek(days);
    }

    /**
     * Returns the current month
     *
     * @returns {Object} month
     * @returns {Object} month.year
     * @returns {Object} month.month
     */
    getCurrentMonth() {
        const currentDate = new Date();

        return {
            year: currentDate.getFullYear(),
            month: (currentDate.getMonth() + 1)
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
    weekStart(options) {
        const weekStartDefault = 0;

        if (options && options.weekStart) {
            return options.weekStart;
        } else {
            return weekStartDefault;
        }
    }

    /**
     * Returns collection of day objects for the month before given month. Only
     * includes days to make a full week.
     *
     * @returns {Array} collection of days
     */
    daysMissingBefore(currentMonth, weekStart) {
        let amount = this.amountMissingBefore(currentMonth, weekStart);

        if (amount) {
            const days = new Month(currentMonth).previous().days()
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
    amountMissingBefore(currentMonth, weekStart) {
        return (daysPerWeek - weekStart +
            (new Date(currentMonth.year, currentMonth.month - 1, 0))
                .getDate()) % daysPerWeek;
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
    daysMissingAfter(currentMonth, weekStart, currentDays) {
        if (this.amountMissingAfter(weekStart, currentDays)) {
            const days = (new Month(currentMonth)).next().days()
                .slice(0, this.amountMissingAfter(weekStart, currentDays));

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
    amountMissingAfter(weekStart, currentDays) {
        const lastDayOfWeek = currentDays[(currentDays.length - 1)].dayOfWeek;

        return ((daysPerWeek + weekStart) - lastDayOfWeek - 1) % daysPerWeek;
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
        const amountOfWeeks = days.length / daysPerWeek;
        let weeks = [];

        for (let week = 0; week < amountOfWeeks; week++) {
            weeks.push(days.slice(week * daysPerWeek,
                                  (week + 1) * daysPerWeek));
        }

        return weeks;
    }
}

