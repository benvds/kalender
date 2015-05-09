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
});
