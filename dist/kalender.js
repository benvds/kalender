(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.kalender = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libMonth = require('./lib/month');

var _libMonth2 = _interopRequireDefault(_libMonth);

var _libDay = require('./lib/day');

var _libDay2 = _interopRequireDefault(_libDay);

var _libUtil = require('./lib/util');

var util = _interopRequireWildcard(_libUtil);

var _libCalendar = require('./lib/calendar');

var _libCalendar2 = _interopRequireDefault(_libCalendar);

exports.Month = _libMonth2['default'];
exports.Day = _libDay2['default'];
exports.Calendar = _libCalendar2['default'];
exports.util = util;

},{"./lib/calendar":2,"./lib/day":4,"./lib/month":5,"./lib/util":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _consts = require('./consts');

var _month = require('./month');

/**
 * Returns collection of day objects for the given month. Includes days from
 * sibling months to make for full weeks. Defaults to the current month.
 *
 * @argument {Object} month
 * @argument {Number} month.year
 * @argument {Number} month.month
 * @argument {Object} options
 * @argument {Number} options.weekStart sets the first day of week
 *
 * @returns {Object[]} days
 */

var _month2 = _interopRequireDefault(_month);

var Calendar = (function () {
    function Calendar(_currentMonth, options) {
        _classCallCheck(this, Calendar);

        var currentMonth = _currentMonth || this.getCurrentMonth();
        var currentDays = new _month2['default'](currentMonth).days();

        // TODO move this to days methods, build proper constructor
        this._days = [].concat(this.daysMissingBefore(currentMonth, this.weekStart(options))).concat(currentDays).concat(this.daysMissingAfter(currentMonth, this.weekStart(options), currentDays));
    }

    _createClass(Calendar, [{
        key: 'days',
        value: function days() {
            var days = this.markToday(this._days);
            return this.groupPerWeek(days);
        }

        /**
         * Returns the current month
         *
         * @returns {Object} month
         * @returns {Object} month.year
         * @returns {Object} month.month
         */
    }, {
        key: 'getCurrentMonth',
        value: function getCurrentMonth() {
            var currentDate = new Date();

            return {
                year: currentDate.getFullYear(),
                month: currentDate.getMonth() + 1
            };
        }

        /**
         * Returns week start using the one defined in options otherwise falls back to
         * default week start.
         *
         * @argument {Object} options
         * @argument {Number} options.weekStart sets the first day of week
         *
         * @returns {Number} week start
         */
    }, {
        key: 'weekStart',
        value: function weekStart(options) {
            var weekStartDefault = 0;

            if (options && options.weekStart) {
                return options.weekStart;
            } else {
                return weekStartDefault;
            }
        }

        /**
         * Returns collection of day objects for the month before given month. Only
         * includes days to make a full week.
         *
         * @returns {Array} collection of days
         */
    }, {
        key: 'daysMissingBefore',
        value: function daysMissingBefore(currentMonth, weekStart) {
            var amount = this.amountMissingBefore(currentMonth, weekStart);

            if (amount) {
                var days = new _month2['default'](currentMonth).previous().days().slice(-1 * amount);

                return this.markSiblingMonths(days);
            } else {
                return [];
            }
        }

        /**
         * Returns amount of days missing before given month to make a full week.
         *
         * @argument {Object} month
         * @argument {Number} month.year
         * @argument {Number} month.month
         *
         * @returns {Number} amount of days
         */
    }, {
        key: 'amountMissingBefore',
        value: function amountMissingBefore(currentMonth, weekStart) {
            return (_consts.DAYS_PER_WEEK - weekStart + new Date(currentMonth.year, currentMonth.month - 1, 0).getDate()) % _consts.DAYS_PER_WEEK;
        }

        /**
         * Returns collection of days marked as sibling month.
         *
         * @argument {Object[]} days
         * @argument {Number} days[].year
         * @argument {Number} days[].month
         * @argument {Number} days[].day
         *
         * @returns {Object[]} days with attribute isSiblingMonth: true
         */
    }, {
        key: 'markSiblingMonths',
        value: function markSiblingMonths(days) {
            return days.map(function (day) {
                day.isSiblingMonth = true;

                return day;
            });
        }

        /**
         * Returns collection of day objects for the month after given month. Only
         * includes days to make a full week.
         *
         * @argument {Object} month
         * @argument {Number} month.year
         * @argument {Number} month.month
         *
         * @returns {Array} collection of days
         */
    }, {
        key: 'daysMissingAfter',
        value: function daysMissingAfter(currentMonth, weekStart, currentDays) {
            if (this.amountMissingAfter(weekStart, currentDays)) {
                var days = new _month2['default'](currentMonth).next().days().slice(0, this.amountMissingAfter(weekStart, currentDays));

                return this.markSiblingMonths(days);
            } else {
                return [];
            }
        }

        /**
         * Returns amount of days missing after given month to make a full week.
         *
         * @argument {Object} month
         * @argument {Number} month.year
         * @argument {Number} month.month
         *
         * @returns {Number} amount of days
         */
    }, {
        key: 'amountMissingAfter',
        value: function amountMissingAfter(weekStart, currentDays) {
            var lastDayOfWeek = currentDays[currentDays.length - 1].dayOfWeek;

            return (_consts.DAYS_PER_WEEK + weekStart - lastDayOfWeek - 1) % _consts.DAYS_PER_WEEK;
        }
    }, {
        key: 'markToday',
        value: function markToday(days) {
            var today = new Date();
            var dayOfMonth = today.getDate();
            var year = today.getFullYear();
            var month = today.getMonth() + 1;

            return days.map(function (day) {
                if (day.day === dayOfMonth && day.month === month && day.year === year) {
                    day.isToday = true;
                }

                return day;
            });
        }

        /**
         * Group the days per week.
         *
         * @argument {Object[]} days
         *
         * @returns {Object[][]} returns a matrix of weeks and days
         */
    }, {
        key: 'groupPerWeek',
        value: function groupPerWeek(days) {
            var amountOfWeeks = days.length / _consts.DAYS_PER_WEEK;
            var weeks = [];

            for (var week = 0; week < amountOfWeeks; week++) {
                weeks.push(days.slice(week * _consts.DAYS_PER_WEEK, (week + 1) * _consts.DAYS_PER_WEEK));
            }

            return weeks;
        }
    }]);

    return Calendar;
})();

exports['default'] = Calendar;
module.exports = exports['default'];

},{"./consts":3,"./month":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var MONTHS_PER_YEAR = 12;
exports.MONTHS_PER_YEAR = MONTHS_PER_YEAR;
var DAYS_PER_WEEK = 7;
exports.DAYS_PER_WEEK = DAYS_PER_WEEK;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Day = (function () {
    /**
     * Sets the year, month and day.
     *
     * @argument {Object} args
     * @argument {Number} args.year
     * @argument {Number} args.month
     * @argument {Number} args.day
     */

    function Day(args) {
        _classCallCheck(this, Day);

        this.year = args.year;
        this.month = args.month;
        this.day = args.day;
        this.dayOfWeek = args.dayOfWeek;
    }

    /**
     * Returns new native Date object for day.
     *
     * @returns {Date} date for day
     */

    _createClass(Day, [{
        key: 'date',
        value: function date() {
            return new Date(this.year, this.month - 1, this.day);
        }

        /**
         * Returns day of week for given day. 1 for sunday, 7 for monday.
         *
         * @returns {Number} day of week
         */
    }, {
        key: 'getDayOfWeek',
        value: function getDayOfWeek() {
            return this.date().getDay();
        }

        /**
         * Returns true when days are the same
         *
         * @arguments {Day} day to compare
         *
         * @returns {Boolean} comparison is the same day
         */
    }, {
        key: 'isEqual',
        value: function isEqual(comparison) {
            return +this.date() === +comparison.date();
        }

        /**
         * Returns true when this day is before comparison day. Returns false when
         * days are the same.
         *
         * @arguments {Day} day to compare
         *
         * @returns {Boolean} this day is before comparison day
         */
    }, {
        key: 'isBefore',
        value: function isBefore(comparison) {
            return +this.date() < +comparison.date();
        }

        /**
         * Returns true when this day is after comparison day. Returns false when
         * days are the same.
         *
         * @arguments {Day} day to compare
         *
         * @returns {Boolean} this day is after comparison day
         */
    }, {
        key: 'isAfter',
        value: function isAfter(comparison) {
            return +this.date() > +comparison.date();
        }
    }]);

    return Day;
})();

exports['default'] = Day;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _consts = require('./consts');

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

function toArray(subject) {
    return Array.prototype.slice.call(subject);
}

var Month = (function () {
    /**
     * Sets the year, month
     */

    function Month() {
        _classCallCheck(this, Month);

        var args = toArray(arguments);

        if (typeof args[0] === 'number') {
            this.constructWithNumbers(args);
        } else if (typeof args[0] === 'object') {
            this.constructWithObject(args[0]);
        }
    }

    _createClass(Month, [{
        key: 'constructWithNumbers',
        value: function constructWithNumbers(numbers) {
            this.year = numbers[0];
            this.month = numbers[1];
        }
    }, {
        key: 'constructWithObject',
        value: function constructWithObject(object) {
            this.year = object.year;
            this.month = object.month;
        }

        /**
         * Returns collection of days for this month.
         *
         * @returns {Array} collection of days
         */
    }, {
        key: 'days',
        value: function days() {
            var result = [];

            var firstDayOfWeek = new _day2['default']({
                year: this.year,
                month: this.month,
                day: 1
            }).getDayOfWeek();

            for (var currentDay = 0, amount = this.amountOfDays(); currentDay < amount; currentDay++) {
                result.push(new _day2['default']({
                    year: this.year,
                    month: this.month,
                    day: currentDay + 1,
                    dayOfWeek: (firstDayOfWeek + currentDay) % _consts.DAYS_PER_WEEK
                }));
            }

            return result;
        }

        /**
         * Returns previous month.
         *
         * @returns {Object} new month object
         */
    }, {
        key: 'previous',
        value: function previous() {
            if (this.month === 1) {
                return new Month({
                    year: this.year - 1,
                    month: _consts.MONTHS_PER_YEAR
                });
            } else {
                return new Month({
                    year: this.year,
                    month: this.month - 1
                });
            }
        }

        /**
         * Returns next month.
         *
         * @returns {Object} new Month object
         */
    }, {
        key: 'next',
        value: function next() {
            if (this.month === _consts.MONTHS_PER_YEAR) {
                return new Month({
                    year: this.year + 1,
                    month: 1
                });
            } else {
                return new Month({
                    year: this.year,
                    month: this.month + 1
                });
            }
        }

        /**
         * Returns amount of days for month.
         *
         * @returns {Number} amount of days
         */
    }, {
        key: 'amountOfDays',
        value: function amountOfDays() {
            return new Date(this.year, this.month, 0).getDate();
        }
    }]);

    return Month;
})();

exports['default'] = Month;
module.exports = exports['default'];

},{"./consts":3,"./day":4}],6:[function(require,module,exports){
'use strict';

/**
 * Returns a new calendar with the results of calling a provided callback
 * function on every day.
 *
 * @argument {Object[][]} calendar
 * @argument {Function} callback
 *
 * @returns {Object[][]} calendar with days mapped with callback
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
function mapDays(calendar, callback) {
  return calendar.map(function (week) {
    return week.map(callback);
  });
}

exports.mapDays = mapDays;

},{}]},{},[1])(1)
});
//# sourceMappingURL=kalender.js.map
