var k = require('../kalender'),
    assert = require('assert');

describe('kalender.getMonth(year, month)', function(){
    describe('returns the correct number of days', function() {
        var year = 2015;

        it('for months with 31 days', function() {
            var MONTHS_WITH_31_DAYS = [1, 3, 5, 7, 8, 10, 12];

            MONTHS_WITH_31_DAYS.forEach(function(month) {
                assert.equal(31, k.getMonth(year, month).length);
            });
        });

        it('for months with 30 days', function() {
            var MONTHS_WITH_30_DAYS = [4, 6, 9, 11];

            MONTHS_WITH_30_DAYS.forEach(function(month) {
                assert.equal(30, k.getMonth(year, month).length);
            });
        });

        it('for months with 28 days', function() {
            var MONTHS_WITH_28_DAYS = [2];

            MONTHS_WITH_28_DAYS.forEach(function(month) {
                assert.equal(28, k.getMonth(year, month).length);
            });
        });

        /*
         * https://en.wikipedia.org/wiki/Leap_year#Algorithm
         * http://stackoverflow.com/questions/725098/leap-year-calculation
         * http://www.dispersiondesign.com/articles/time/determining_leap_years
         */
        it('for months with 29 days');
    });
});
