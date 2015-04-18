# Kalender.js

Basic library of helper functions for rendering calendars.

**IMPORTANT**: This is a heavily opinionated library and deviates from
Javascript's default Date interface. The API relies on objects with year, month
and day attributes, e.g.
`{ year: 2015, month: 12 }` and `{ year: 2014, month: 1, day: 31 }`.
This library uses a 1-based index for month and weekday numbers. Javascript's
Date interface inconsistently uses a 0-based index for months and week days,
but not for month, days or years.

Using Date for a calendar object is not necessary, it represents a moment in
time. This library is only interested in days, months and years.


## Goals

I've been using various calender and datepicker widgets. Eventually I got
frustrated with all of them. This is a just for fun project to do things my way.

1. for modular use; calendar logic should not contain render logic
2. readable, understandable and maintainable
3. little to no dependencies, just for linting, testing and building
4. well tested


## Usage


### calendar

`calendar({ year: year, month: month })`

Returns collection of day objects for the given month. Includes days from
sibling months to make for full weeks. Sibling months are marked with
`isSiblingMonth: true`.

    > kalender.calendar({ year: 2011, month: 12 });
    [ { year: 2011, month: 11, day: 27, isSiblingMonth: true },
      { year: 2011, month: 11, day: 28, isSiblingMonth: true },
      { year: 2011, month: 11, day: 29, isSiblingMonth: true },
      { year: 2011, month: 11, day: 30, isSiblingMonth: true },
      { year: 2011, month: 12, day: 1 },
      { year: 2011, month: 12, day: 2 },
      { year: 2011, month: 12, day: 3 },
    ...


### year

`year.isLeapYear(year)`

Returns true when given year is a leap year.

    > kalender.year.isLeapYear(2000);
    true


### month

`month.days({ year: year, month: month })`

Returns collection of day objects for given month.

    > month.days({ year: 2014, month: 12 });
    [ { year: 2014, month: 12, day: 1 },
      { year: 2014, month: 12, day: 2 },
      { year: 2014, month: 12, day: 3 },
    ...


`month.amountOfDays({ year: year, month: month })`

Returns amount of days for given month, includes leap days.

    > month.amountOfDays({ year: 2000, month: 2 });
    29


`month.previousMonth({ year: year, month: month })`

Returns month previous to given month.

    > month.previousMonth({ year: 2015, month: 3 });
    { year: 2015, month: 2 }


`month.nextMonth({ year: year, month: month })`

Returns month next to given month.

    > month.nextMonth({ year: 2015, month: 5 });
    { year: 2015, month: 7 }


### day

`day.dayOfWeek({ year: year, month: month, day: day })`

Returns day of week for given day. Results range from 1 to 7.

    > day.dayOfWeek({ year: 2015, month: 4, day: 4 })
    7
    > day.dayOfWeek({ year: 2015, month: 4, day: 5 })
    1


## Inspiration

- https://github.com/WesleydeSouza/calendar-base
- https://github.com/kylestetz/CLNDR


## TODO

- [ ] indicate weekdays
- [ ] set week start
- [ ] setDate (selected date)
- [ ] set start / end dates
- [ ] build system
