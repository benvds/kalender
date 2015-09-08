import assert from 'assert';
import Month from '../lib/month';

let LEAP_YEARS = [1996, 2000, 2004],
    NON_LEAP_YEARS = [1997, 1998, 1999, 2100];

describe('Month', function(){
    xdescribe('constructor', () => {
        xit('takes a string', function() {
        });
        xit('takes an object', function() {
        });
        xit('two integers', function() {
        });
    });

    describe('.amountOfDays(month) returns the correct number of days', function() {
        let MONTHS_WITH_31_DAYS = [1, 3, 5, 7, 8, 10, 12],
            MONTHS_WITH_30_DAYS = [4, 6, 9, 11],
            MONTHS_WITH_29_OR_28_DAYS = [2],
            year = 2015;

        it('for months with 31 days', function() {
            MONTHS_WITH_31_DAYS.forEach(function(curMonth) {
                assert.equal(31,
                    new Month({ year: year, month: curMonth }).amountOfDays());
            });
        });

        it('for months with 30 days', function() {
            MONTHS_WITH_30_DAYS.forEach(function(curMonth) {
                assert.equal(30, new Month({ year: year, month: curMonth })
                    .amountOfDays());
            });
        });

        it('for months with 29 days', function () {
            LEAP_YEARS.forEach(function(year) {
                MONTHS_WITH_29_OR_28_DAYS.forEach(function(curMonth) {
                    assert.equal(29, new Month({ year: year, month: curMonth })
                        .amountOfDays());
                });
            });
        });

        it('for months with 28 days', function() {
            NON_LEAP_YEARS.forEach(function(year) {
                MONTHS_WITH_29_OR_28_DAYS.forEach(function(curMonth) {
                    assert.equal(28, new Month({ year: year, month: curMonth })
                        .amountOfDays());
                });
            });
        });
    });

    describe('.previous()', function() {
        it('returns the month before in the same year when not january', function() {
            for (let curMonth = 2; curMonth <= 12; curMonth ++) {
                assert.deepEqual({ year: 2015, month: curMonth - 1 },
                                 new Month({ year: 2015, month: curMonth }).previous());
            }
        });

        it('returns december in the previous year when january', function() {
            assert.deepEqual({ year: 2014, month: 12 },
                             new Month({ year: 2015, month: 1 }).previous());
        });
    });

    describe('.next()', function() {
        it('returns the month after in the same year when not december', function() {
            for (let curMonth = 1; curMonth < 12; curMonth ++) {
                assert.deepEqual({ year: 2015, month: curMonth + 1 },
                                 new Month({ year: 2015, month: curMonth }).next());
            }
        });

        it('returns januari in the next year when december', function() {
            assert.deepEqual({ year: 2015, month: 1 },
                             new Month({ year: 2014, month: 12 }).next());
        });
    });

    describe('.days(month) ', function() {
        it('returns all days for a month', function() {
            // let days = month.days({ year: 2000, month: 2 });
            let days = new Month({ year: 2000, month: 2 }).days();

            for (let i = 1; i < 30; i++) {
                assert.equal(2, days[i - 1].month);
                assert.equal(i, days[i - 1].day);
            }

            assert.equal(29, days.length);
        });

        it('returns dayOfWeeks for each day', function() {
            let days = new Month({ year: 2015, month: 4 }).days();

            assert.equal(3, days[0].dayOfWeek);
            assert.equal(4, days[1].dayOfWeek);
            assert.equal(5, days[2].dayOfWeek);
            assert.equal(6, days[3].dayOfWeek);
            assert.equal(0, days[4].dayOfWeek);
        });

        it('flags today', function() {
            let curDate = new Date();
            let curMonth = {
                year: curDate.getFullYear(),
                month: (curDate.getMonth() + 1)
            };
            // let curDay = curDate.getDate();
            let days = new Month(curMonth).days();
            let otherDayIndex = curDate.getDate() === 1 ?  1 : 0;

            assert(days[curDate.getDate() - 1].isToday);
            assert.equal(typeof days[otherDayIndex].isToday, 'undefined');
        });
    });
});
