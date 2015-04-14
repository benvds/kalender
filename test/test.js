var k = require('../kalender'),
    assert = require('assert');

var LEAP_YEARS = [1996, 2000, 2004],
    NON_LEAP_YEARS = [1997, 1998, 1999, 2100];


describe('year', function() {
    describe('.isLeapYear(year)', function() {
        it('returns true for leap years', function() {
            LEAP_YEARS.forEach(function(year) {
                assert(k.year.isLeapYear(year));
            });
        });

        it('returns false for non leap years', function() {
            NON_LEAP_YEARS.forEach(function(year) {
                assert(!k.year.isLeapYear(year));
            });
        });
    });
});


describe('month', function(){
    describe('.amountOfDays(month) returns the correct number of days', function() {
        var MONTHS_WITH_31_DAYS = [0, 2, 4, 6, 7, 9, 11],
            MONTHS_WITH_30_DAYS = [3, 5, 8, 10],
            MONTHS_WITH_29_OR_28_DAYS = [1],
            year = 2015;

        it('for months with 31 days', function() {
            MONTHS_WITH_31_DAYS.forEach(function(month) {
                assert.equal(31, k.month.amountOfDays({ year: year, month: month }));
            });
        });

        it('for months with 30 days', function() {
            MONTHS_WITH_30_DAYS.forEach(function(month) {
                assert.equal(30, k.month.amountOfDays({ year: year, month: month }));
            });
        });

        it('for months with 29 days', function () {
            LEAP_YEARS.forEach(function(year) {
                MONTHS_WITH_29_OR_28_DAYS.forEach(function(month) {
                    assert.equal(29, k.month.amountOfDays({ year: year, month: month }));
                });
            });
        });

        it('for months with 28 days', function() {
            NON_LEAP_YEARS.forEach(function(year) {
                MONTHS_WITH_29_OR_28_DAYS.forEach(function(month) {
                    assert.equal(28, k.month.amountOfDays({ year: year, month: month }));
                });
            });
        });
    });

    describe('.previousMonth(month)', function() {
        it('returns the month before in the same year when not january', function() {
            for (var month = 1; month < 12; month ++) {
                assert.deepEqual({ year: 2015, month: month - 1 },
                                 k.month.previousMonth({ year: 2015, month: month }));
            }
        });

        it('returns december in the previous year when january', function() {
            assert.deepEqual({ year: 2014, month: 11 },
                             k.month.previousMonth({ year: 2015, month: 0 }));
        });
    });

    describe('.nextMonth(month)', function() {
        it('returns the month after in the same year when not december', function() {
            for (var month = 0; month < 11; month ++) {
                assert.deepEqual({ year: 2015, month: month + 1 },
                                 k.month.nextMonth({ year: 2015, month: month }));
            }
        });

        it('returns januari in the next year when december', function() {
            assert.deepEqual({ year: 2015, month: 0 },
                             k.month.nextMonth({ year: 2014, month: 11 }));
        });
    });

    describe('.days(month) ', function() {
        it('returns all days for a month', function() {
            var days = k.month.days({ year: 2000, month: 1 });

            for (var i = 0; i < 29; i++) {
                assert.deepEqual({ year: 2000, month: 1, day: i }, days[i]);
            }

            assert.equal(29, days.length);
        });
    });
});


describe('day', function() {
    describe('.dayOfWeek(day)', function() {
        it('returns 0 for sundays', function() {
            assert.equal(0, k.day.dayOfWeek({ year: 2015, month: 2, day: 14 }))
        });

        it('returns 6 for saturdays', function() {
            assert.equal(6, k.day.dayOfWeek({ year: 2015, month: 2, day: 20 }))
        });
    });
});


describe('calendar(month)', function(){
    describe('sibling months', function() {
        it('discards previous month when current month starts on weekStart',
           function()
        {
            var MONTH_WITH_FIRST_DAY_ON_WEEKSTART = {
                    year: 2015,
                    month: 2
                };
            assert.deepEqual(
                {
                    year: 2015,
                    month: 2,
                    day: 0
                },
                k.calendar(MONTH_WITH_FIRST_DAY_ON_WEEKSTART)[0]);
        });

        it('discards next month when current month ends on weeks end',
           function()
        {
            // default weekStart = 0 = sunday
            var MONTH_WITH_LAST_DAY_ON_WEEKS_END = {
                    year: 2015,
                    month: 1
                };
            var result = k.calendar(MONTH_WITH_LAST_DAY_ON_WEEKS_END); 
            assert.deepEqual(
                {
                    year: 2015,
                    month: 1,
                    day: 27
                },
                result[result.length - 1]);
        });

        it('includes last days of previous month ' +
            'when month starts after week start', function ()
        {
            var MONTH_WITH_FIRST_DAY_ON_FRIDAY = {
                    year: 2015,
                    month: 3
                };
            var result = k.calendar(MONTH_WITH_FIRST_DAY_ON_FRIDAY);

            assert.deepEqual({ year: 2015, month: 2, day: 28 }, result[0]);
            assert.deepEqual({ year: 2015, month: 2, day: 29 }, result[1]);
            assert.deepEqual({ year: 2015, month: 2, day: 30 }, result[2]);
            assert.deepEqual({ year: 2015, month: 3, day: 0 }, result[3]);
        });

        it('includes first days of next month ' +
            'when month starts ends before week end', function ()
        {
            var MONTH_WITH_LAST_DAY_ON_TUESDAY = {
                    year: 2015,
                    month: 2
                };
            var result = k.calendar(MONTH_WITH_LAST_DAY_ON_TUESDAY);

            assert.deepEqual({ year: 2015, month: 2, day: 30 }, result[30]);
            assert.deepEqual({ year: 2015, month: 3, day: 0 }, result[31]);
            assert.deepEqual({ year: 2015, month: 3, day: 1 }, result[32]);
            assert.deepEqual({ year: 2015, month: 3, day: 2 }, result[33]);
            assert.deepEqual({ year: 2015, month: 3, day: 3 }, result[34]);
        });

        it('excludes a week start in the next month ', function () {
            var MONTH_WITH_LAST_DAY_ON_TUESDAY = {
                    year: 2015,
                    month: 2
                };
            var result = k.calendar(MONTH_WITH_LAST_DAY_ON_TUESDAY);

            assert.deepEqual({ year: 2015, month: 2, day: 30 }, result[30]);
            assert.deepEqual({ year: 2015, month: 3, day: 3 }, result[34]);
            assert.equal(undefined, result[35]);
        });
    });
});
