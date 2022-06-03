const vacations = require('./vacations.json');

const map = new Map();

vacations.forEach((vacation) => {
    const vac = {
        startDate: vacation.startDate,
        endDate: vacation.endDate,
    };
    const key = vacation.user._id;

    map.set(key, {
        name: vacation.user.name,
        daysOff: map.has(key)
            ? [...map.get(key).daysOff, vac]
            : [vac],
    });
});

const result = [];
for (let [key, value] of map) {
    result.push({
        ...value,
        userId: key,
    });
}

console.log(result);