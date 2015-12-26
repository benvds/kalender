# Kalender

Returns a nested array of calendar dates.

## Usage

    kalender() == kalender(new Date())
    kalender(new Date(2014, 0, 31))
    kalender({ year: 2014, month: 0 })
    kalender('2014-1-31')
    kalender('2014-1-31', 1)
    kalender({ weekStart: 1 }) == kalender(new Date(), 1)


## Reasoning

I've been using various calender and datepicker widgets. Eventually I got
frustrated with all of them.

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
