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


## Usage


### calendar

`calendar({ year: year, month: month }[, { weekStart: 1 }])`

Returns collection of day objects for the given month. Includes days from
sibling months to make for full weeks. Sibling months are marked with
`isSiblingMonth: true`. Defaults to the current month.
Option `weekStart` sets the first day of the week.

    > kalender.calendar({ year: 2011, month: 12 });
    [ { year: 2011, month: 11, day: 27, weekDay: 1, isSiblingMonth: true },
      { year: 2011, month: 11, day: 28, weekDay: 2, isSiblingMonth: true },
      { year: 2011, month: 11, day: 29, weekDay: 3, isSiblingMonth: true },
      { year: 2011, month: 11, day: 30, weekDay: 4, isSiblingMonth: true },
      { year: 2011, month: 12, day: 1, weekDay: 5 },
      { year: 2011, month: 12, day: 2, weekDay: 6 },
      { year: 2011, month: 12, day: 3, weekDay: 7 },
    ...


### year

`year.isLeapYear(year)`

Returns true when given year is a leap year.

    > kalender.year.isLeapYear(2000);
    true


### month

`month.days({ year: year, month: month })`

Returns collection of day objects for given month. Today is flagged using
`isToday: true`.

    > month.days({ year: 2014, month: 12 });
    [ { year: 2014, month: 12, day: 1, weekDay: 2 },
      { year: 2014, month: 12, day: 2, weekDay: 3, isToday: true },
      { year: 2014, month: 12, day: 3, weekDay: 4 },
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

`day.isBefore(subjectDay, comparisonDay);`

Returns if subject day is before comparison day.

    > day.isBefore({ year: 2015, month: 1, day: 1},
    >     { year: 2015, month: 1, day: 2});
    true

`day.isAfter(subjectDay, comparisonDay);`

Returns if subject day is after comparison day.

    > day.isAfter({ year: 2015, month: 4, day: 4},
    >     { year: 2015, month: 3, day: 3});
    true

`day.isEqual(subjectDay, comparisonDay);`

Returns if subject day is the same as the comparison day.

    > day.isEqual({ year: 2015, month: 4, day: 4},
    >     { year: 2015, month: 4, day: 4});
    true
    > day.isEqual({ year: 2015, month: 4, day: 4},
    >     { year: 2015, month: 4, day: 3});
    false


### util

`util.mapDays(caldendar, callback)`

Returns a new calendar with the results of calling a provided callback function
on every day.

    > util.mapDays(calendar, function yearsOnly(day) {
    >     return { year: day.year };
    > });
    [ [ { year: 2015 },
        { year: 2015 },
        ...


## Build

    > npm install
    > npm run dist


## Lint

    > npm run lint


## Test

    > npm test


## Reasoning

I've been using various calender and datepicker widgets. Eventually I got
frustrated with all of them. This is a just for fun project to do things my way.

1. for modular use; calendar logic should not contain render logic
2. readable, understandable and maintainable
3. little to no dependencies, just for linting, testing and building
4. well tested
- commonjs modules
- no deeply nested if statements or block scopes
- functional(ish) code
- optimize for readibility not performance (not necessary)
- bare minimum api, not much to learn, easy to understand and maintain:
  just fork and adjust the code or map it's output
- sane defaults (objects, strings, date, momentjs)
- NO CALLBACK METHOD (give example with mapMatrix)


## Inspiration

- https://github.com/WesleydeSouza/calendar-base
- https://github.com/kylestetz/CLNDR


## TODO

- flag today
- select day (take object, strings, Date)
