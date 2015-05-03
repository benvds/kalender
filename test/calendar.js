var k = require('../index'),
    _ = require('lodash'),
    assert = require('assert');

describe('calendar(month)', function(){
    describe('sibling months', function() {
        it('discards previous month when current month starts on weekStart',
           function()
        {
            var MONTH_WITH_FIRST_DAY_ON_WEEKSTART = {
                    year: 2015,
                    month: 3
                };
            assert.deepEqual(
                {
                    year: 2015,
                    month: 3,
                    day: 1
                },
                _.pick(k.calendar(MONTH_WITH_FIRST_DAY_ON_WEEKSTART)[0][0],
                       ['year', 'month', 'day']));
        });

        it('discards next month when current month ends on weeks end',
           function()
        {
            // default weekStart = 0 = sunday
            var MONTH_WITH_LAST_DAY_ON_WEEKS_END = {
                    year: 2015,
                    month: 2
                };
            var result = k.calendar(MONTH_WITH_LAST_DAY_ON_WEEKS_END);
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
            var MONTH_WITH_FIRST_DAY_ON_WEDNESDAY = {
                    year: 2015,
                    month: 4
                };
            var result = k.calendar(MONTH_WITH_FIRST_DAY_ON_WEDNESDAY);

            assert.deepEqual({ month: 3, day: 29 },
                             _.pick(result[0][0], ['month', 'day']));
            assert.deepEqual({ month: 3, day: 30 },
                             _.pick(result[0][1], ['month', 'day']));
            assert.deepEqual({ month: 3, day: 31 },
                             _.pick(result[0][2], ['month', 'day']));
            assert.deepEqual({ month: 4, day: 1 },
                             _.pick(result[0][3], ['month', 'day']));
        });

        // TODO BUG: not enough days are included, test with:
        // { year 2015, month: 3 }, { weekStart: 1 }
        it('includes first days of next month ' +
            'when month ends before week end', function ()
        {
            var MONTH_WITH_LAST_DAY_ON_TUESDAY = {
                    year: 2015,
                    month: 3
                };
            var result = k.calendar(MONTH_WITH_LAST_DAY_ON_TUESDAY);

            assert.deepEqual({ month: 3, day: 31 },
                             _.pick(result[4][2], ['month', 'day']));
            assert.deepEqual({ month: 4, day: 1 },
                             _.pick(result[4][3], ['month', 'day']));
        });

        it('excludes a week start in the next month ', function () {
            var MONTH_WITH_LAST_DAY_ON_TUESDAY = {
                    year: 2015,
                    month: 3
                };
            var result = k.calendar(MONTH_WITH_LAST_DAY_ON_TUESDAY);

            assert.deepEqual({ month: 3, day: 31 }, _.pick(_.last(result)[2],
                                                           ['month', 'day']));
            assert.deepEqual({ month: 4, day: 4 }, _.pick(_.last(result)[6],
                                                          ['month', 'day']));
            assert.equal(undefined, _.last(result)[7]);
        });

        it('previous months are marked as sibling month', function () {
            var MONTH_WITH_FIRST_DAY_ON_FRIDAY = {
                    year: 2015,
                    month: 4
                };
            var result = k.calendar(MONTH_WITH_FIRST_DAY_ON_FRIDAY);

            assert(result[0][0].isSiblingMonth);
            assert(result[0][1].isSiblingMonth);
            assert(result[0][2].isSiblingMonth);

            // make sure current month is not flagged
            assert(!result[3].isSiblingMonth);
        });

        it('next months are marked as sibling month', function () {
            var MONTH_WITH_LAST_DAY_ON_TUESDAY = {
                    year: 2015,
                    month: 3
                };
            var result = k.calendar(MONTH_WITH_LAST_DAY_ON_TUESDAY);

            // make sure current month is not flagged
            assert(!result[4][2].isSiblingMonth);

            assert(result[4][3].isSiblingMonth);
            assert(result[4][4].isSiblingMonth);
        });
    });
});
describe('calendar(month, options)', function(){
    describe('option weekStart', function() {
        it('defaults to 0', function () {
            var result = k.calendar({ year: 2015, month: 3 });

            assert.equal(0, result[0][0].dayOfWeek);
        });

        it('can be set', function () {
            var result = k.calendar({ year: 2015, month: 3 }, { weekStart: 2 });

            assert.equal(2, result[0][0].dayOfWeek);
            assert.equal(2, result[0][0].month);
            assert.equal(24, result[0][0].day);
        });
    });
});
