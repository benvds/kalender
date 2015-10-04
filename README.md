# Kalender

Basic component for rendering calendars.

## Todo

- [ ] default to javascript's 0-based index for months and weekdays
- [ ] use 1-based index only for string inputs

**IMPORTANT**: This is a heavily opinionated component and deviates from
Javascript's default Date interface. *This component uses a 1-based index for
months.* Javascript's Date interface inconsistently uses a 0-based index for
months and week days, but not for days or years.

The API relies on objects with year, month
and day attributes, e.g.
`{ year: 2015, month: 12 }` and `{ year: 2014, month: 1, day: 31 }`.

Using Date for a calendar object is not necessary, which represents a moment in
time and includes a timezone. This component is only interested in days, months
and years. It assumes timezones and localization are handled elsewhere.

More information:

- [Creating a Javascript component – reasons & requirements](https://gist.github.com/benvds/cb1099296a23df9759da)
- [Kalender – Technical considerations](https://gist.github.com/benvds/529acf573b1d66bde9c9)

## Implementation examples

- [Various datepicker examples](https://github.com/benvds/kalender-datepicker-examples)


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

`day.day({ year: year, month: month, day: day })`

Returns day of week for given day. Results range from 1 to 7.

    > day.day({ year: 2015, month: 4, day: 4 })
    7
    > day.day({ year: 2015, month: 4, day: 5 })
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
frustrated with all of them. This is a just for fun project to do things my way:

1. modular e.g. calendar logic should not contain render logic
2. readable, understandable and maintainable
3. little to no dependencies, just for linting, testing and building
4. well tested
5. functional(ish) style e.g. no deeply nested if statements or block scopes
6. prefer readibility over performance
7. minimal API

## Inspiration

- https://github.com/WesleydeSouza/calendar-base
- https://github.com/kylestetz/CLNDR
