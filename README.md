# Kalender.js

Basic library of helper functions for rendering calendars.

**IMPORTANT**: This is a heavily opinionated library and deviates from
Javascript's default Date interface. The API relies on objects with year, month
and day attributes, e.g.
`{ year: 2015, month: 12 }` and `{ year: 2014, month: 1, day: 31 }`.
This library uses 1-based numbers for months and weekdays. Javascript's Date
interface inconsistent uses 0-based index for months and week days, but not for
month days or years.

Using Date for a calendar object is also not necessary, it represents a moment
in time. This library is only interested in days, months and years.


## Usage


### calendar

`calendar({ year: year, month: month })`

Returns collection of day objects for the given month. Includes days from
sibling months to make for full weeks.

    > kalender.calendar({ year: 2011, month: 12 });
    [ { year: 2011, month: 11, day: 27 },
      { year: 2011, month: 11, day: 28 },
      { year: 2011, month: 11, day: 29 },
      { year: 2011, month: 11, day: 30 },
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

Returns collection of day objects for given month

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

Returns day of week for given day.

**IMPORTANT**: This is a 1–based index, so januari is 1 and december is 12. This
is in contrast with javascripts Date interface.

    > day.dayOfWeek({ year: 2015, month: 4, day: 4 })
    7
    > day.dayOfWeek({ year: 2015, month: 4, day: 5 })
    1


## Reasoning and goals

*TODO*
Been using various calender and datepicker widgets. They're either too big or have too many bugs. As a lazy dev I need code which I can easily understand to be able to fix or adjust. Most are not.

- basic calender component
- modular
- code quality (according my own standards) understandable,
maintainable,
my prefered coding style: functional, style etc.
- only transpiling
- little dependencies


## Inspiration

- https://github.com/WesleydeSouza/calendar-base
- https://github.com/kylestetz/CLNDR


## Todo

- [ ] indicate sibling months
- [ ] indicate weekends
- [ ] set week start
- [ ] setDate (selected date)
- [ ] set start / end dates
- [ ] no lodash dependency of lodash-fp
- [ ] build system
