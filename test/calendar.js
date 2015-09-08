import assert from 'assert';
import _ from 'lodash';
import { Calendar } from '../index';

const monthWithLastDayOnTuesday = {
    year: 2015,
    month: 3
};

describe('Calendar', () => {
    describe('constructor', () => {
        it('defaults to the current month', () => {
            let curDate = new Date();
            let currentMonth = {
                year: curDate.getFullYear(),
                month: (curDate.getMonth() + 1),
                day: curDate.getDate()
            };
            let calendar = new Calendar();

            assert.equal(currentMonth.year, calendar.days()[1][0].year);
            assert.equal(currentMonth.month, calendar.days()[1][0].month);
        });
    });

    describe('sibling months', () => {
        it('discards previous month when current month starts on weekStart',
           function()
        {
            const monthWithFirstDayOnWeekStart = {
                    year: 2015,
                    month: 3
                };
            assert.deepEqual(
                {
                    year: 2015,
                    month: 3,
                    day: 1
                },
                _.pick(new Calendar(monthWithFirstDayOnWeekStart).days()[0][0],
                       ['year', 'month', 'day']));
        });

        it('discards next month when current month ends on weeks end',
           function()
        {
            // default weekStart = 0 = sunday
            const monthWithLastDayOnWeeksEnd = {
                    year: 2015,
                    month: 2
                };
            let result = new Calendar(monthWithLastDayOnWeeksEnd).days();
            assert.deepEqual(
                {
                    year: 2015,
                    month: 2,
                    day: 28
                },
                _.pick(_.last(_.last(result)),
                       ['year', 'month', 'day']));
        });

        it('includes last days of previous month ' +
            'when month starts after week start', function ()
        {
            const monthWithFirstDayOnWednesday = {
                    year: 2015,
                    month: 4
                };
            let result = new Calendar(monthWithFirstDayOnWednesday).days();

            assert.deepEqual({ month: 3, day: 29 },
                             _.pick(result[0][0], ['month', 'day']));
            assert.deepEqual({ month: 3, day: 30 },
                             _.pick(result[0][1], ['month', 'day']));
            assert.deepEqual({ month: 3, day: 31 },
                             _.pick(result[0][2], ['month', 'day']));
            assert.deepEqual({ month: 4, day: 1 },
                             _.pick(result[0][3], ['month', 'day']));
        });

        it('includes first days of next month ' +
            'when month ends before week end', function ()
        {
            let result = new Calendar(monthWithLastDayOnTuesday).days();

            assert.deepEqual({ month: 3, day: 31 },
                             _.pick(result[4][2], ['month', 'day']));
            assert.deepEqual({ month: 4, day: 1 },
                             _.pick(result[4][3], ['month', 'day']));
        });

        it('ends on day before next weekstart of the next month', function () {
            let result = new Calendar(monthWithLastDayOnTuesday).days();

            assert.deepEqual({ month: 4, day: 4 }, _.pick(result[4][6],
                                                          ['month', 'day']));
        });

        it('previous months are marked as sibling month', function () {
            const monthWithFirstDayOnFriday = {
                year: 2015,
                month: 4
            };
            let result = new Calendar(monthWithFirstDayOnFriday).days();

            assert(result[0][0].isSiblingMonth);
            assert(result[0][1].isSiblingMonth);
            assert(result[0][2].isSiblingMonth);

            // make sure current month is not flagged
            assert(!result[3].isSiblingMonth);
        });

        it('next months are marked as sibling month', function () {
            let result = new Calendar(monthWithLastDayOnTuesday).days();

            // make sure current month is not flagged
            assert(!result[4][2].isSiblingMonth);

            assert(result[4][3].isSiblingMonth);
            assert(result[4][4].isSiblingMonth);
        });
    });
});
describe('calendar(month, options)', () => {
    describe('option weekStart', () => {
        it('defaults to 0', function () {
            let result = (new Calendar({ year: 2015, month: 3 }));

            assert.equal(0, result.days()[0][0].dayOfWeek);
        });

        it('can be set', function () {
            let result = new Calendar({ year: 2015, month: 3 }, { weekStart: 2 }).days();

            assert.equal(2, result[0][0].dayOfWeek);
            assert.equal(2, result[0][0].month);
            assert.equal(24, result[0][0].day);
        });

        it('affects appending sibling month', function () {
            let result = new Calendar(monthWithLastDayOnTuesday, { weekStart: 4 }).days();
            let result2 = new Calendar(monthWithLastDayOnTuesday, { weekStart: 1 }).days();

            assert.deepEqual({ month: 4, day: 1 }, _.pick(result[4][6],
                                                          ['month', 'day']));
            assert.deepEqual({ month: 4, day: 5 }, _.pick(result2[5][6],
                                                          ['month', 'day']));
        });
    });
});
