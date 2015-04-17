var k = require('../index'),
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
