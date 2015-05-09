var k = require('../index'),
    assert = require('assert');

describe('day', function() {
    describe('.dayOfWeek(day)', function() {
        it('returns 0 for sundays', function() {
            assert.equal(0, k.day.dayOfWeek({ year: 2015, month: 4, day: 19 }));
        });

        it('returns 6 for saturdays', function() {
            assert.equal(6, k.day.dayOfWeek({ year: 2015, month: 4, day: 18 }));
        });
    });

    describe('.isBefore(subject, comparison)', function() {
        var subject = { year: 2015, month: 5, day: 4 };

        it('returns true when subject is before comparison', function() {
            var comparison = { year: 2015, month: 5, day: 5 };

            assert(k.day.isBefore(subject, comparison));
        });
        it('returns false when subject is on same day as comparison', function() {
            var comparison = { year: 2015, month: 5, day: 4 };

            assert(!k.day.isBefore(subject, comparison));
        });
        it('returns false when subject is after comparison', function() {
            var comparison = { year: 2015, month: 5, day: 3 };

            assert(!k.day.isBefore(subject, comparison));
        });
    });

    describe('.isAfter(subject, comparison)', function() {
        var subject = { year: 2015, month: 5, day: 4 };

        it('returns true when subject is after comparison', function() {
            var comparison = { year: 2015, month: 5, day: 3 };

            assert(k.day.isAfter(subject, comparison));
        });
        it('returns false when subject is on same day as comparison', function() {
            var comparison = { year: 2015, month: 5, day: 4 };

            assert(!k.day.isAfter(subject, comparison));
        });
        it('returns false when subject is before comparison', function() {
            var comparison = { year: 2015, month: 5, day: 5 };

            assert(!k.day.isAfter(subject, comparison));
        });
    });

    describe('.isEqual(subject, comparison', function() {
        it('returns true when subject and comparison are the same day', function() {
            var subject = { year: 2015, month: 5, day: 5 };
            var comparison = { year: 2015, month: 5, day: 5 };

            assert(k.day.isEqual(subject, comparison));
        });
        it('returns false when subject and comparison are not the same day', function() {
            var subject = { year: 2015, month: 5, day: 5 },
                comparison1 = { year: 2014, month: 5, day: 5 },
                comparison2 = { year: 2015, month: 4, day: 5 },
                comparison3 = { year: 2015, month: 5, day: 4 };

            assert(!k.day.isEqual(subject, comparison1));
            assert(!k.day.isEqual(subject, comparison2));
            assert(!k.day.isEqual(subject, comparison3));
        });
    });
});
