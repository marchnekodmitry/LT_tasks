const { isWeekend, nextMonday, set, differenceInMinutes, add } = require("date-fns");

/**
 * 
 * @param {Date} date 
 * @param {number} minutes 
 * @returns {Date}
 */
const addMinutesToWorkingTime = (date, minutes) => {
    const workingHours = {
        start: 10,
        end: 19,
    };

    /**
     * 
     * @param {Date} date 
     * @returns 
     */
     const isAfterDayEnd = (date) => {
        const hours = date.getHours();

        return hours >= workingHours.end;
    }

    /**
     * 
     * @param {Date} date 
     * @returns 
     */
     const isBeforeDayStart = (date) => {
        const hours = date.getHours();

        return hours < workingHours.start;
    }

    /**
     * 
     * @param {Date} date 
     * @returns 
     */
    const setStartOfDay = (date) => {
        return set(date, { hours: workingHours.start, minutes: 0, seconds: 0, milliseconds: 0 });
    }

    /**
     * 
     * @param {Date} date 
     * @param {number} minutes 
     * @returns {[Date, number]}
     */
    const addMinutesToWorkday = (date, minutes) => {
        const endOfDay = set(date, { hours: workingHours.end, minutes: 0, seconds: 0, milliseconds: 0 });

        const minutesLeft = minutes - differenceInMinutes(endOfDay, date);

        if (minutesLeft < 0) {
            return [add(date, { minutes }), 0];
        }

        return [endOfDay, minutesLeft];
    }

    /**
     * 
     * @param {Date} date 
     * @returns 
     */
    const getNextDay = (date) => {
        return set(add(date, { days: 1 }), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    }

    /**
     * 
     * @param {Date} date 
     * @param {number} minutes 
     * @returns 
     */
    const calculate = (date, minutes) => {

        if (minutes === 0) return date;

        if (minutes < 0) {
            console.error('minutes < 0');
            return date;
        }

        if (isWeekend(date)) {
            date = nextMonday(date);
            date = setStartOfDay(date);
        } else if (isBeforeDayStart(date)) {
            date = setStartOfDay(date);
        } else if (isAfterDayEnd(date)) {
            date = getNextDay(date);
        } else {
            [date, minutes] = addMinutesToWorkday(date, minutes);
        }

        return calculate(date, minutes);
    }

    return calculate(date, minutes);
}

module.exports = {
    addMinutesToWorkingTime,
};