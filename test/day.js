import assert from 'assert';
import Day from '../lib/day';

describe('day', function() {
    describe('.dayOfWeek(day)', function() {
        it('returns 0 for sundays', function() {
            assert
                .equal(new Day({ year: 2015, month: 4, day: 19 }).dayOfWeek(),
                    0);
        });

        it('returns 6 for saturdays', function() {
            assert
                .equal(new Day({ year: 2015, month: 4, day: 18 }).dayOfWeek(),
                    6);
        });
    });

    xdescribe('.isBefore(subject, comparison)', function() {
        let subject = { year: 2015, month: 5, day: 4 };

        it('returns true when subject is before comparison', function() {
            let comparison = { year: 2015, month: 5, day: 5 };

            assert(day.isBefore(subject, comparison));
        });
        it('returns false when subject is on same day as comparison', function() {
            let comparison = { year: 2015, month: 5, day: 4 };

            assert(!day.isBefore(subject, comparison));
        });
        it('returns false when subject is after comparison', function() {
            let comparison = { year: 2015, month: 5, day: 3 };

            assert(!day.isBefore(subject, comparison));
        });
    });

    xdescribe('.isAfter(subject, comparison)', function() {
        let subject = { year: 2015, month: 5, day: 4 };

        it('returns true when subject is after comparison', function() {
            let comparison = { year: 2015, month: 5, day: 3 };

            assert(day.isAfter(subject, comparison));
        });
        it('returns false when subject is on same day as comparison', function() {
            let comparison = { year: 2015, month: 5, day: 4 };

            assert(!day.isAfter(subject, comparison));
        });
        it('returns false when subject is before comparison', function() {
            let comparison = { year: 2015, month: 5, day: 5 };

            assert(!day.isAfter(subject, comparison));
        });
    });

    xdescribe('.isEqual(subject, comparison', function() {
        it('returns true when subject and comparison are the same day', function() {
            let subject = { year: 2015, month: 5, day: 5 };
            let comparison = { year: 2015, month: 5, day: 5 };

            assert(day.isEqual(subject, comparison));
        });
        it('returns false when subject and comparison are not the same day', function() {
            let subject = { year: 2015, month: 5, day: 5 },
                comparison1 = { year: 2014, month: 5, day: 5 },
                comparison2 = { year: 2015, month: 4, day: 5 },
                comparison3 = { year: 2015, month: 5, day: 4 };

            assert(!day.isEqual(subject, comparison1));
            assert(!day.isEqual(subject, comparison2));
            assert(!day.isEqual(subject, comparison3));
        });
    });
});
