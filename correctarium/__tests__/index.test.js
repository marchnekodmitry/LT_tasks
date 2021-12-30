const { addMinutesToWorkingTime } = require('../src/functions/addMinutesToWorkingTime');
const { calculatePrice } = require('../src/functions/calculatePrice');
const { calculateWorkingMinutes } = require('../src/functions/calculateWorkingMinutes');

describe('deadline', () => {
    test('added before working days starts', () => {
        expect(addMinutesToWorkingTime(new Date(2021, 11, 10), 60 * 4)).toStrictEqual(new Date(2021, 11, 10, 14));
    });
    test('added during working hours', () => {
        expect(addMinutesToWorkingTime(new Date(2021, 11, 10, 12), 60 * 4)).toStrictEqual(new Date(2021, 11, 10, 16));
    });
    test('added after working day ends', () => {
        expect(addMinutesToWorkingTime(new Date(2021, 11, 7, 20), 60 * 4)).toStrictEqual(new Date(2021, 11, 8, 14));
    });

    test('should correctly work at the end of a day', () => {
        expect(addMinutesToWorkingTime(new Date(2021, 11, 8, 19), 60 * 4)).toStrictEqual(new Date(2021, 11, 9, 14));
        expect(addMinutesToWorkingTime(new Date(2021, 11, 8, 19, 1), 60 * 4)).toStrictEqual(new Date(2021, 11, 9, 14));
        expect(addMinutesToWorkingTime(new Date(2021, 11, 8, 18, 55), 60 * 4)).toStrictEqual(new Date(2021, 11, 9, 13, 55));
    });

    test('should correctly work at the start of a day', () => {
        expect(addMinutesToWorkingTime(new Date(2021, 11, 8, 10), 60 * 4)).toStrictEqual(new Date(2021, 11, 8, 14));
        expect(addMinutesToWorkingTime(new Date(2021, 11, 8, 10, 1), 60 * 4)).toStrictEqual(new Date(2021, 11, 8, 14, 1));
        expect(addMinutesToWorkingTime(new Date(2021, 11, 8, 9, 55), 60 * 4)).toStrictEqual(new Date(2021, 11, 8, 14));
    });

    test('added before weekends after start time', () => {
        expect(addMinutesToWorkingTime(new Date(2021, 11, 10, 20), 60 * 4)).toStrictEqual(new Date(2021, 11, 13, 14));
    });

    test('added at weekends before start time', () => {
        expect(addMinutesToWorkingTime(new Date(2021, 11, 18, 8), 60 * 5)).toStrictEqual(new Date(2021, 11, 20, 15));
    });
    test('added at weekends after start time and before end time', () => {
        expect(addMinutesToWorkingTime(new Date(2021, 11, 18, 12), 60 * 5)).toStrictEqual(new Date(2021, 11, 20, 15));
    });
    test('added at weekends after end time', () => {
        expect(addMinutesToWorkingTime(new Date(2021, 11, 18, 20), 60 * 5)).toStrictEqual(new Date(2021, 11, 20, 15));
    });

    test('takes over 1 week to do the job', () => {
        expect(addMinutesToWorkingTime(new Date(2021, 11, 15, 12), 60 * 9 * 5)).toStrictEqual(new Date(2021, 11, 22, 12));
    });

    test('should count year and month', () => {
        expect(addMinutesToWorkingTime(new Date(2021, 11, 31, 12), 60 * 9)).toStrictEqual(new Date(2022, 0, 3, 12));
    });
});

describe('price', () => {
    test('should correctly work with languages', () => {
        expect(calculatePrice('ru', 10000, 'doc')).toEqual(500);
        expect(calculatePrice('ua', 10000, 'doc')).toEqual(500);
        expect(calculatePrice('en', 10000, 'doc')).toEqual(1200);
    });

    test('should correctly work with mimetype', () => {
        expect(calculatePrice('ru', 10000, 'notdoc')).toEqual(600);
        expect(calculatePrice('ua', 10000, 'notdoc')).toEqual(600);
        expect(calculatePrice('en', 10000, 'notdoc')).toEqual(1440);
    });

    test('should not be less then min price', () => {
        expect(calculatePrice('ru', 100, 'doc')).toEqual(50);
        expect(calculatePrice('ua', 100, 'notdoc')).toEqual(50);
        expect(calculatePrice('en', 100, 'doc')).toEqual(120);
    });
});

describe('working time', () => {
    test('should correctly work with languages', () => {
        expect(calculateWorkingMinutes('ru', 10000, 'doc')).toEqual(481);
        expect(calculateWorkingMinutes('ua', 10000, 'doc')).toEqual(481);
        expect(calculateWorkingMinutes('en', 10000, 'doc')).toEqual(1832);
    });

    test('should correctly work with mimetype', () => {
        expect(calculateWorkingMinutes('ua', 10000, 'notdoc')).toEqual(571);
        expect(calculateWorkingMinutes('ru', 10000, 'notdoc')).toEqual(571);
        expect(calculateWorkingMinutes('en', 10000, 'notdoc')).toEqual(2193);
    });

    test('should not be less then min price', () => {
        expect(calculateWorkingMinutes('ua', 100, 'doc')).toEqual(60);
        expect(calculateWorkingMinutes('ru', 100, 'notdoc')).toEqual(60);
        expect(calculateWorkingMinutes('en', 100, 'doc')).toEqual(60);
    });
});