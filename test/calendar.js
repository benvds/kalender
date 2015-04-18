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
                _.pick(k.calendar(MONTH_WITH_FIRST_DAY_ON_WEEKSTART)[0],
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
                _.pick(result[result.length - 1],
                       ['year', 'month', 'day']));
        });

        it('includes last days of previous month ' +
            'when month starts after week start', function ()
        {
            var MONTH_WITH_FIRST_DAY_ON_FRIDAY = {
                    year: 2015,
                    month: 4
                };
            var result = k.calendar(MONTH_WITH_FIRST_DAY_ON_FRIDAY);

            assert.deepEqual({ month: 3, day: 29 }, _.pick(result[0], ['month', 'day']));
            assert.deepEqual({ month: 3, day: 30 }, _.pick(result[1], ['month', 'day']));
            assert.deepEqual({ month: 3, day: 31 }, _.pick(result[2], ['month', 'day']));
            assert.deepEqual({ month: 4, day: 1 }, _.pick(result[3], ['month', 'day']));
        });

        it('includes first days of next month ' +
            'when month starts ends before week end', function ()
        {
            var MONTH_WITH_LAST_DAY_ON_TUESDAY = {
                    year: 2015,
                    month: 3
                };
            var result = k.calendar(MONTH_WITH_LAST_DAY_ON_TUESDAY);

            assert.deepEqual({ month: 3, day: 31 }, _.pick(result[30], ['month', 'day']));
            assert.deepEqual({ month: 4, day: 1 }, _.pick(result[31], ['month', 'day']));
            assert.deepEqual({ month: 4, day: 2 }, _.pick(result[32], ['month', 'day']));
            assert.deepEqual({ month: 4, day: 3 }, _.pick(result[33], ['month', 'day']));
            assert.deepEqual({ month: 4, day: 4 }, _.pick(result[34], ['month', 'day']));
        });

        it('excludes a week start in the next month ', function () {
            var MONTH_WITH_LAST_DAY_ON_TUESDAY = {
                    year: 2015,
                    month: 3
                };
            var result = k.calendar(MONTH_WITH_LAST_DAY_ON_TUESDAY);

            assert.deepEqual({ month: 3, day: 31 }, _.pick(result[30], ['month', 'day']));
            assert.deepEqual({ month: 4, day: 4 }, _.pick(result[34], ['month', 'day']));
            assert.equal(undefined, result[35]);
        });

        it('previous months are marked as sibling month', function () {
            var MONTH_WITH_FIRST_DAY_ON_FRIDAY = {
                    year: 2015,
                    month: 4
                };
            var result = k.calendar(MONTH_WITH_FIRST_DAY_ON_FRIDAY);

            assert(result[0].isSiblingMonth);
            assert(result[1].isSiblingMonth);
            assert(result[2].isSiblingMonth);

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
            assert(!result[30].isSiblingMonth);

            assert(result[31].isSiblingMonth);
            assert(result[32].isSiblingMonth);
            assert(result[33].isSiblingMonth);
        });
    });
});
