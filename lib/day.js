'use strict';

function dayOfWeek(day) {
    var date = new Date(Date.UTC(day.year, day.month - 1, day.day));

    return date.getDay() + 1;
}

module.exports = {
    dayOfWeek: dayOfWeek
};
