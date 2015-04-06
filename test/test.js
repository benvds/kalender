var k = require('../kalender'),
    assert = require('assert');

describe('kalender.getDays(year, month)', function(){
    describe('returns the correct number of days', function() {
        var LEAP_YEARS = [1996, 2000, 2004],
            NON_LEAP_YEARS = [1997, 1998, 1999, 2100],
            MONTHS_WITH_31_DAYS = [1, 3, 5, 7, 8, 10, 12],
            MONTHS_WITH_30_DAYS = [4, 6, 9, 11],
            MONTHS_WITH_29_OR_28_DAYS = [2],
            year = 2015;

        it('for months with 31 days', function() {
            MONTHS_WITH_31_DAYS.forEach(function(month) {
                assert.equal(31, k.getDays({ year: year, month: month }).length);
            });
        });

        it('for months with 30 days', function() {
            MONTHS_WITH_30_DAYS.forEach(function(month) {
                assert.equal(30, k.getDays({ year: year, month: month }).length);
            });
        });

        it('for months with 29 days', function () {
            LEAP_YEARS.forEach(function(year) {
                MONTHS_WITH_29_OR_28_DAYS.forEach(function(month) {
                    assert.equal(29, k.getDays({ year: year, month: month }).length);
                });
            });
        });

        it('for months with 28 days', function() {
            NON_LEAP_YEARS.forEach(function(year) {
                MONTHS_WITH_29_OR_28_DAYS.forEach(function(month) {
                    assert.equal(28, k.getDays({ year: year, month: month }).length);
                });
            });
        });
    });

    describe('sibling months', function() {
        it('discards previous month when current month starts on weekStart',
           function()
        {
            // default weekStart = 0 = sunday
            var MONTH_WITH_FIRST_DAY_ON_WEEKSTART = {
                    year: 2015,
                    month: 3
                },
                options = {
                    includeAdjacentMonths: true
                };
            assert.deepEqual(
                {
                    year: 2015,
                    month: 3,
                    day: 1
                },
                k.getCalendar(MONTH_WITH_FIRST_DAY_ON_WEEKSTART, options)[0]);
        });

        it('discards next month when current month ends on weeks end',
           function()
        {
            // default weekStart = 0 = sunday
            var MONTH_WITH_LAST_DAY_ON_WEEKS_END = {
                    year: 2015,
                    month: 2
                },
                options = {
                    includeAdjacentMonths: true
                };
            var result = k.getCalendar(MONTH_WITH_LAST_DAY_ON_WEEKS_END,
                                       options);
            assert.deepEqual(
                {
                    year: 2015,
                    month: 2,
                    day: 28
                },
                result[result.length - 1]);
        });
    });
});
