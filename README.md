# Kalender.js

Basic implementation of a calender object. Bring your own rendering.

## Inspirations

- https://github.com/WesleydeSouza/calendar-base
- https://github.com/kylestetz/CLNDR

## Todo

- [x] properties `month` and `weekDay` respect JavaScript’s [`Date.prototype`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/prototype).
- [x] refactor out months
- [x] refactor getCalendar
- [x] refactor interface / api
- [x] months should start at 1, as with years and days, same for weekday, also 1 based, the JS api is just terrible
- [ ] move year, month, day, calendar to separate files
- [ ] try DAYS_PER_MONTH as array structure
- [ ] documentation
- [ ] indicate sibling months
- [ ] indicate weekends
- [ ] set week start
- [ ] setDate (selected date)
- [ ] set start / end dates
- [ ] no lodash dependency of lodash-fp
- [ ] build system
