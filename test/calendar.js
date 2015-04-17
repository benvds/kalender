var k = require('../index'),
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
                k.calendar(MONTH_WITH_FIRST_DAY_ON_WEEKSTART)[0]);
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
                result[result.length - 1]);
        });

        it('includes last days of previous month ' +
            'when month starts after week start', function ()
        {
            var MONTH_WITH_FIRST_DAY_ON_FRIDAY = {
                    year: 2015,
                    month: 4
                };
            var result = k.calendar(MONTH_WITH_FIRST_DAY_ON_FRIDAY);

            assert.deepEqual({ year: 2015, month: 3, day: 29 }, result[0]);
            assert.deepEqual({ year: 2015, month: 3, day: 30 }, result[1]);
            assert.deepEqual({ year: 2015, month: 3, day: 31 }, result[2]);
            assert.deepEqual({ year: 2015, month: 4, day: 1 }, result[3]);
        });

        it('includes first days of next month ' +
            'when month starts ends before week end', function ()
        {
            var MONTH_WITH_LAST_DAY_ON_TUESDAY = {
                    year: 2015,
                    month: 3
                };
            var result = k.calendar(MONTH_WITH_LAST_DAY_ON_TUESDAY);

            assert.deepEqual({ year: 2015, month: 3, day: 31 }, result[30]);
            assert.deepEqual({ year: 2015, month: 4, day: 1 }, result[31]);
            assert.deepEqual({ year: 2015, month: 4, day: 2 }, result[32]);
            assert.deepEqual({ year: 2015, month: 4, day: 3 }, result[33]);
            assert.deepEqual({ year: 2015, month: 4, day: 4 }, result[34]);
        });

        it('excludes a week start in the next month ', function () {
            var MONTH_WITH_LAST_DAY_ON_TUESDAY = {
                    year: 2015,
                    month: 3
                };
            var result = k.calendar(MONTH_WITH_LAST_DAY_ON_TUESDAY);

            assert.deepEqual({ year: 2015, month: 3, day: 31 }, result[30]);
            assert.deepEqual({ year: 2015, month: 4, day: 4 }, result[34]);
            assert.equal(undefined, result[35]);
        });
    });
});
