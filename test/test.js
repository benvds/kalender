var k = require('../kalender'),
    assert = require('assert');

describe('kalender.getMonth(year, month)', function(){
    describe('returns the correct number of days', function() {
        var LEAP_YEARS = [1996, 2000, 2004],
            NON_LEAP_YEARS = [1997, 1998, 1999, 2100],
            MONTHS_WITH_31_DAYS = [1, 3, 5, 7, 8, 10, 12],
            MONTHS_WITH_30_DAYS = [4, 6, 9, 11],
            MONTHS_WITH_29_OR_28_DAYS = [2],
            year = 2015;

        it('for months with 31 days', function() {
            MONTHS_WITH_31_DAYS.forEach(function(month) {
                assert.equal(31, k.getMonth(year, month).length);
            });
        });

        it('for months with 30 days', function() {
            MONTHS_WITH_30_DAYS.forEach(function(month) {
                assert.equal(30, k.getMonth(year, month).length);
            });
        });

        it('for months with 29 days', function () {
            LEAP_YEARS.forEach(function(year) {
                MONTHS_WITH_29_OR_28_DAYS.forEach(function(month) {
                    assert.equal(29, k.getMonth(year, month).length);
                });
            });
        });

        it('for months with 28 days', function() {
            NON_LEAP_YEARS.forEach(function(year) {
                MONTHS_WITH_29_OR_28_DAYS.forEach(function(month) {
                    assert.equal(28, k.getMonth(year, month).length);
                });
            });
        });

    });
});
