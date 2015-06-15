var k = require('../index'),
    assert = require('assert');

var LEAP_YEARS = [1996, 2000, 2004],
    NON_LEAP_YEARS = [1997, 1998, 1999, 2100];

describe('month', function(){
    describe('.amountOfDays(month) returns the correct number of days', function() {
        var MONTHS_WITH_31_DAYS = [1, 3, 5, 7, 8, 10, 12],
            MONTHS_WITH_30_DAYS = [4, 6, 9, 11],
            MONTHS_WITH_29_OR_28_DAYS = [2],
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
            for (var month = 2; month <= 12; month ++) {
                assert.deepEqual({ year: 2015, month: month - 1 },
                                 k.month.previousMonth({ year: 2015, month: month }));
            }
        });

        it('returns december in the previous year when january', function() {
            assert.deepEqual({ year: 2014, month: 12 },
                             k.month.previousMonth({ year: 2015, month: 1 }));
        });
    });

    describe('.nextMonth(month)', function() {
        it('returns the month after in the same year when not december', function() {
            for (var month = 1; month < 12; month ++) {
                assert.deepEqual({ year: 2015, month: month + 1 },
                                 k.month.nextMonth({ year: 2015, month: month }));
            }
        });

        it('returns januari in the next year when december', function() {
            assert.deepEqual({ year: 2015, month: 1 },
                             k.month.nextMonth({ year: 2014, month: 12 }));
        });
    });

    describe('.days(month) ', function() {
        it('returns all days for a month', function() {
            var days = k.month.days({ year: 2000, month: 2 });

            for (var i = 1; i < 30; i++) {
                assert.equal(2, days[i - 1].month);
                assert.equal(i, days[i - 1].day);
            }

            assert.equal(29, days.length);
        });

        it('returns dayOfWeeks for each day', function() {
            var days = k.month.days({ year: 2015, month: 4 });

            assert.equal(3, days[0].dayOfWeek);
            assert.equal(4, days[1].dayOfWeek);
            assert.equal(5, days[2].dayOfWeek);
            assert.equal(6, days[3].dayOfWeek);
            assert.equal(0, days[4].dayOfWeek);
        });

        it('flags today', function() {
            var curDate = new Date();
            var curMonth = {
                year: curDate.getFullYear(),
                month: (curDate.getMonth() + 1)
            };
            // var curDay = curDate.getDate();
            var days = k.month.days(curMonth);
            var otherDayIndex = curDate.getDate() === 1 ?  1 : 0;

            assert(days[curDate.getDate() - 1].isToday);
            assert.equal(typeof days[otherDayIndex].isToday, 'undefined');
        });
    });
});
