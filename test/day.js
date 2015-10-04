import assert from 'assert';
import Day from '../lib/day';

describe('Day', () => {
    describe('constructor', () => {
        it('sets the year, month and day', () => {
            let args = {
                year: 2015,
                month: 1,
                date: 2
            };
            let day = new Day(args);

            assert.equal(day.year, args.year);
            assert.equal(day.month, args.month);
            assert.equal(day.date, args.date);
        });

        it('defaults to today', () => {
            let today = new Date();
            let day = new Day();

            assert.equal(day.year, today.getFullYear());
            assert.equal(day.month, today.getMonth() + 1);
            assert.equal(day.date, today.getDate());
        });
    });

    describe('.jsDate()', () => {
        let args = {
            year: 2015,
            month: 1,
            date: 2
        };

        it('returns a new native Date object for day', () => {
            assert
                .equal(new Day(args).jsDate().toString(),
                    new Date(2015, 0, 2).toString());
        });
    });

    describe('.getDay()', () => {
        it('returns 0 for sundays', () => {
            assert
                .equal(new Day({ year: 2015, month: 4, date: 19 }).getDay(),
                    0);
        });

        it('returns 6 for saturdays', () => {
            assert
                .equal(new Day({ year: 2015, month: 4, date: 18 }).getDay(),
                    6);
        });
    });

    describe('.isBefore(subject, comparison)', function() {
        let subject = new Day({ year: 2015, month: 5, date: 4 });

        it('returns true when subject is before comparison', function() {
            let comparison = new Day({ year: 2015, month: 5, date: 5 });

            assert(subject.isBefore(comparison));
        });
        it('returns false when subject is on same day as comparison', function() {
            let comparison = new Day({ year: 2015, month: 5, date: 4 });

            assert(!subject.isBefore(comparison));
        });
        it('returns false when subject is after comparison', function() {
            let comparison = new Day({ year: 2015, month: 5, date: 3 });

            assert(!subject.isBefore(comparison));
        });
    });

    describe('.isAfter(subject, comparison)', function() {
        let subject = new Day({ year: 2015, month: 5, date: 4 });

        it('returns true when subject is after comparison', function() {
            let comparison = new Day({ year: 2015, month: 5, date: 3 });

            assert(subject.isAfter(comparison));
        });
        it('returns false when subject is on same day as comparison', function() {
            let comparison = new Day({ year: 2015, month: 5, date: 4 });

            assert(!subject.isAfter(comparison));
        });
        it('returns false when subject is before comparison', function() {
            let comparison = new Day({ year: 2015, month: 5, date: 5 });

            assert(!subject.isAfter(comparison));
        });
    });

    describe('.isEqual(comparison)', function() {
        it('returns true when subject and comparison are the same day', function() {
            let subject = new Day({ year: 2015, month: 5, date: 5 });
            let comparison = new Day({ year: 2015, month: 5, date: 5 });

            assert(subject.isEqual(comparison));
        });
        it('returns false when subject and comparison are not the same day', function() {
            let subject = new Day({ year: 2015, month: 5, date: 5 }),
                comparison1 = new Day({ year: 2014, month: 5, date: 5 }),
                comparison2 = new Day({ year: 2015, month: 4, date: 5 }),
                comparison3 = new Day({ year: 2015, month: 5, date: 4 });

            assert(!subject.isEqual(comparison1));
            assert(!subject.isEqual(comparison2));
            assert(!subject.isEqual(comparison3));
        });
    });
});
