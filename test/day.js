var k = require('../index'),
    assert = require('assert');

describe('day', function() {
    describe('.dayOfWeek(day)', function() {
        it('returns 0 for sundays', function() {
            assert.equal(0, k.day.dayOfWeek({ year: 2015, month: 4, day: 19 }))
        });

        it('returns 6 for saturdays', function() {
            assert.equal(6, k.day.dayOfWeek({ year: 2015, month: 4, day: 18 }))
        });
    });
});
