const vacations = require('./vacations.json');

const res = vacations
    .map((vacation) => ({
        userId: vacation.user._id,
        name: vacation.user.name,
        weekendDates: [{
            startDate: vacation.startDate,
            endDate: vacation.endDate,
        }],
    }))
    .reduce((resultVacations, vacation) => {
        const idx = resultVacations.findIndex((value) => value.userId === vacation.userId);

        if (idx === -1) return [...resultVacations, vacation];

        return [
            ...resultVacations.slice(0, idx),
            {
                ...vacation,
                weekendDates: [
                    ...resultVacations[idx].weekendDates,
                    ...vacation.weekendDates,
                ],
            },
            ...resultVacations.slice(idx + 1),
        ]
    }, []);

console.log(res);