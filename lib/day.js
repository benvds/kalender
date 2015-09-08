'use strict';

// const dayWeights = {
//     year: 385,
//     month: 32,
//     day: 1
// };

export default class Day {
    constructor(day) {
        this.year = day.year;
        this.month = day.month;
        this.day = day.day;
        this.date = new Date(this.year, this.month - 1, this.day);
    }

    /**
     * Returns day of week for given day. 1 for sunday, 7 for monday.
     *
     * @returns {Number} day of week
     */
    dayOfWeek() {
        return this.date.getDay();
    }
}

// #<{(|*
//  * Returns if subject day is before comparison day.
//  *
//  * @argument {Object} subject day
//  * @argument {Object} comparsion day
//  *
//  * @returns {Boolean} true when subject day is before comparison day
//  |)}>#
// function isBefore(subject, comparison) {
//     return dayWeight(subject) < dayWeight(comparison);
// }
//
// #<{(|*
//  * Returns if subject day is after comparison day.
//  *
//  * @argument {Object} subject day
//  * @argument {Object} comparsion day
//  *
//  * @returns {Boolean} true when subject day is after comparison day
//  |)}>#
// function isAfter(subject, comparison) {
//     return dayWeight(subject) > dayWeight(comparison);
// }
//
// #<{(|*
//  * Returns weight for a day which can be used in comparisons. Weights are not
//  * relative to each other. Later dates only have higher weights. Using weights
//  * is more than a 100 times faster than creating a date and getting the
//  * primitive value.
//  *
//  * @argument {Object} day
//  * @argument {Number} day.year
//  * @argument {Number} day.month
//  * @argument {Number} day.day
//  *
//  * @returns {Number} dayWeight timestamp for start of day
//  |)}>#
// function dayWeight(day) {
//     return (day.day * dayWeights.day) +
//         (day.month * dayWeights.month) +
//         (day.year * dayWeights.year);
// }
//
// #<{(|*
//  * Returns if subject day is the same as the comparison day.
//  *
//  * @argument {Object} subject day
//  * @argument {Object} comparsion day
//  *
//  * @returns {Boolean} true when subject day is the same as the comparison day
//  |)}>#
// function isEqual(subject, comparison) {
//     return (subject.day === comparison.day) &&
//         (subject.month === comparison.month) &&
//         (subject.year === comparison.year);
// }
