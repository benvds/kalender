var k = require('../index'),
    assert = require('assert');

describe('util', function() {
    describe('.mapDays(calendar, callback)', function() {
        it('applies callback to all days', function() {
            var cal = k.calendar({ year: 2015, month: 2 });
            var result = k.util.mapDays(cal, function(day) {
                return { year: (day.year + 1) };
            });

            assert.equal(2016, result[0][0].year);
        });
    });

    describe('.isBefore(subject, comparison)', function() {
        var subject = { year: 2015, month: 5, day: 4 };

        it('returns true when subject is before comparison', function() {
            var comparison = { year: 2015, month: 5, day: 5 };

            assert(k.util.isBefore(subject, comparison));
        });
        it('returns false when subject is on same day as comparison', function() {
            var comparison = { year: 2015, month: 5, day: 4 };

            assert(!k.util.isBefore(subject, comparison));
        });
        it('returns false when subject is after comparison', function() {
            var comparison = { year: 2015, month: 5, day: 3 };

            assert(!k.util.isBefore(subject, comparison));
        });
    });

    describe('.isAfter(subject, comparison)', function() {
        var subject = { year: 2015, month: 5, day: 4 };

        it('returns true when subject is after comparison', function() {
            var comparison = { year: 2015, month: 5, day: 3 };

            assert(k.util.isAfter(subject, comparison));
        });
        it('returns false when subject is on same day as comparison', function() {
            var comparison = { year: 2015, month: 5, day: 4 };

            assert(!k.util.isAfter(subject, comparison));
        });
        it('returns false when subject is before comparison', function() {
            var comparison = { year: 2015, month: 5, day: 5 };

            assert(!k.util.isAfter(subject, comparison));
        });
    });
});
