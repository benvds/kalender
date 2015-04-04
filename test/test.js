var k = require('../kalender'),
    assert = require('assert');

describe('kalender', function(){
    describe('getMonth(year, month)', function() {
        it('returns [year, month]', function(){
            assert.deepEqual([2015, 1], k.getMonth(2015, 1));
        });
    });
});
