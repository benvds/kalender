(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.kalender = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var daysPerWeek = 7;
    function kalender(dateArgs, options) {
        if (dateArgs === void 0) { dateArgs = new Date(); }
        var month = monthFromDateArgs(dateArgs);
        var weekStart = parseOptions(options);
        var days = calendarDays(month, weekStart);
        return days.reduce(function fillCalendar(calendar, day, index) {
            var weekIndex = Math.floor(index / daysPerWeek);
            var dayIndex = index % daysPerWeek;
            calendar[weekIndex][dayIndex] = day;
            return calendar;
        }, emptyCalendar(days.length));
    }
    exports.default = kalender;
    /**
     *  Returns an array with the calendar dates. Includes surrounding days to fill
     *  all the weeks.
     *
     *  @argument {Date|Object|String|undefined} dateArgs a value which represents
     *              a date. An object should contain a year and month value like,
     *              e.g. { year: 1999, month: 0 }. A string is passed to the Date
     *              constructor. When undefined calendar defaults to the current
     *              month
     *  @argument {Number} weekStart day in which the week starts. 0-based index,
     *              0 is sunday, 6 is saturday
     *
     *  @returns {Date[]} an array of dates for the calendar
     *
     */
    function calendarDays(month, weekStart) {
        var startDayOfMonth = -1 * daysMissingBefore(month, weekStart);
        var amountDays = totalDays(month, weekStart);
        var result = new Array(amountDays);
        for (var i = 1; i <= amountDays; i++) {
            result[i - 1] = new Date(month.year, month.month, startDayOfMonth + i);
        }
        return result;
    }
    /**
     *  Returns a year/month object from dateArgs. Defaults to the current month.
     *
     *  @argument {Date|Object|String|undefined} dateArgs
     *
     *  @returns {Object} a year/month object
     *
     */
    function monthFromDateArgs(dateArgs) {
        if (dateArgs instanceof Date) {
            return monthFromDate(dateArgs);
        }
        else if (typeof dateArgs === 'object') {
            return dateArgs;
        }
        else {
            return monthFromDate(new Date(dateArgs));
        }
    }
    /**
     *  Returns an object containing a year and month. Months use Date's 0-based
     *  index.
     *
     *  @argument {Date} date
     *
     *  @returns {Month} containing the date's year and month
     *
     */
    function monthFromDate(date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth()
        };
    }
    /**
     *  Returns the week start. The weekStart argument takes precedence otherwise
     *  it looks into a DateArgs object. Returns undefined if no weekStart is
     *  found.
     *
     *  @argument {Number} weekStart day in which the week starts
     *
     *  @returns {Number|undefined} the week start index
     *
     */
    function parseOptions(options) {
        var defaultWeekStart = 0;
        if (typeof options === 'number') {
            return options;
        }
        else if (typeof options === 'object') {
            return options.weekStart;
        }
        else {
            return defaultWeekStart;
        }
    }
    /**
     *  Returns amount of days missing before the first of the month given a week
     *  starts on week start.
     *
     *  @argument {Number} year
     *  @argument {Number} month
     *  @argument {Number} weekStart 0 = sunday, 6 = saturday
     *
     *  @returns {Number} amount of days missing before the first day of the month
     *
     */
    function daysMissingBefore(month, weekStart) {
        return (daysPerWeek - weekStart + new Date(month.year, month.month, 1).getDay()) % daysPerWeek;
    }
    /**
     *  Returns actual days in a month excluding surrounding days
     *
     *  @argument {Number} year
     *  @argument {Number} month
     *
     *  @returns {Number} amount of days for a month excluding surrounding days
     *
     */
    function daysInMonth(month) {
        return new Date(month.year, month.month + 1, 0).getDate();
    }
    /**
     *  Returns amount of weeks for a month including surrounding days.
     *
     *  @argument {Number} year
     *  @argument {Number} month
     *  @argument {Number} weekStart
     *
     *  @returns {Number} amount of weeks for a month including surrounding days
     *
     */
    function weeksForMonth(month, weekStart) {
        return Math.ceil((daysInMonth(month) +
            daysMissingBefore(month, weekStart)) / daysPerWeek);
    }
    /**
     *  Returns the totals days for a month including surrounding days.
     *
     *  @argument {Number} year
     *  @argument {Number} month
     *  @argument {Number} weekStart
     *
     *  @returns {Number} amount of days for a month including surrounding days
     *
     */
    function totalDays(month, weekStart) {
        return weeksForMonth(month, weekStart) * daysPerWeek;
    }
    /**
     *  Returns an empty table for the calendar dates.
     *
     *  @argument {Number} totalDays total number of days for the calendar
     *
     *  @returns {[][]} nested arrays for each week of the calendar
     *
     */
    function emptyCalendar(totalDays) {
        var totalWeeks = totalDays / daysPerWeek;
        var result = [];
        for (var i = 0; i < totalWeeks; i++) {
            result[i] = new Array(daysPerWeek);
        }
        return result;
    }
});

},{}]},{},[1])(1)
});
//# sourceMappingURL=kalender.js.map
