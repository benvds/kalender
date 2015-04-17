var k = require('../index'),
    assert = require('assert');

describe('day', function() {
    describe('.dayOfWeek(day)', function() {
        it('returns 1 for sundays', function() {
            assert.equal(1, k.day.dayOfWeek({ year: 2015, month: 4, day: 19 }))
        });

        it('returns 7 for saturdays', function() {
            assert.equal(7, k.day.dayOfWeek({ year: 2015, month: 4, day: 18 }))
        });
    });
});
