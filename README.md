# Kalender

Returns a nested array (matrix) of calendar dates as Date objects. Adds "surrounding" dates to a month to fill the matrix.

## Usage

    kal() == kal(new Date())
    kal(new Date(2014, 0, 31))
    kal({ year: 2014, month: 0 })
    kal('2014-1-31')
    kal('2014-1-31', 1)
    kal({ weekStart: 1 }) == kal(new Date(), 1)


## Why

I've been using various calender and datepicker widgets. Eventually I got
frustrated with all of them. Goals for Kalender are:

1. readable, understandable and maintainable
2. minimal API, e.g. calendar logic should not contain render logic
3. no dependencies, just for linting, testing and building
4. well tested
5. functional instead of imperative style


## Build

    > npm install
    > npm run dist


## Lint

    > npm run lint


## Test

    > npm test


## Inspiration

- https://github.com/WesleydeSouza/calendar-base
- https://github.com/kylestetz/CLNDR
