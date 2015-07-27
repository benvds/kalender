var assert = require('assert');

import * as util from '../lib/util';

describe('util', function() {
    describe('.mapDays(calendar, callback)', function() {
        it('applies callback to all days', function() {
            var cal = [
                [1, 2],
                [3, 4]
            ];

            var result = util.mapDays(cal, (day) => day + 1);

            assert.equal(2, result[0][0]);
            assert.equal(5, result[1][1]);
        });
    });
});
