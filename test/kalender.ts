/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

import * as assert from 'assert';
import kalender from '../src/kalender';

describe('kalender', () => {
    it('returns a table of dates', () => {
        const result = kalender();

        assert(result instanceof Array);
        assert(result[0] instanceof Array);
        assert(result[0][0] instanceof Date);
        assert(result[4][6] instanceof Date);
    });

    it('defaults to the current month', () => {
        const month = (new Date()).getMonth();
        const result = kalender();

        assert.equal(result[1][0].getMonth(), month);
    });

    it('takes a Date to set the month', () => {
        const result = kalender(new Date(1983, 9, 6));

        assert.equal(result[1][0].getMonth(), 9);
    });

    it('takes an object to set the month', () => {
        const result = kalender({ year: 1983, month: 9 });

        assert.equal(result[1][0].getMonth(), 9);
    });

    it('takes a string to set the month', () => {
        const result = kalender('1983-10-6');

        assert.equal(result[1][0].getMonth(), 9);
    });

    it('takes a weekStart as second argument', () => {
        const monday = kalender('1983-10-6', 1);
        const saturday = kalender('1983-10-6', 6);

        assert.equal(monday[0][0].getDay(), 1);
        assert.equal(saturday[1][0].getDay(), 6);
    });

    it('prepends days to fill the first week', () => {
        const result = kalender('1983-10-6');

        assert.equal(result[0][0].getMonth(), 8);
        assert.equal(result[0][5].getMonth(), 8);
        assert.equal(result[0][6].getMonth(), 9);
    });

    it('prepends days to fill the first week when weekStart is set', () => {
        const result = kalender('1983-10-6', 5);

        assert.equal(result[0][0].getMonth(), 8);
        assert.equal(result[0][1].getMonth(), 9);
    });

    it('appends days to fill the last week', () => {
        const result = kalender('1983-10-6');

        assert.equal(result[5][1].getMonth(), 9);
        assert.equal(result[5][2].getMonth(), 10);
        assert.equal(result[5][6].getMonth(), 10);
    });

    it('appends days to fill the last week when weekStart is set', () => {
        const result = kalender('1983-10-6', 3);

        assert.equal(result[4][5].getMonth(), 9);
        assert.equal(result[4][6].getMonth(), 10);
    });

    it('does not appends days when not needed', () => {

        const result = kalender('2016-01-01',1);

        assert.equal(result[4][6].getDate(), 31);
        assert.equal(typeof result[5], 'undefined');
    });
});
