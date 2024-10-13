function generatorTargetCalc(start, end, yearlyTarget) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    function* monthGenerator(start, end) {
        let current = new Date(start);
        while (current <= end) {
            yield current;
            current.setMonth(current.getMonth() + 1);
            current.setDate(1);
        }
    }

    function countWorkingDays(year, month, totalDays) {
        let count = 0;
        for (let day = 1; day <= totalDays; day++) {
            if (new Date(year, month, day).getDay() !== 5) count++;
        }
        return count;
    }

    const totalDaysInMonth = [];
    const daysWorked = [];
    const targetByMonth = [];
    let totalWorkedDays = 0;

    for (let month of monthGenerator(startDate, endDate)) {
        const year = month.getFullYear();
        const monthNumber = month.getMonth();
        const totalDays = new Date(year, monthNumber + 1, 0).getDate();

        const validDaysInMonth = countWorkingDays(year, monthNumber, totalDays);
        totalDaysInMonth.push(validDaysInMonth);

        const activeDays = countWorkingDays(year, monthNumber, totalDays);
        daysWorked.push(activeDays);
        totalWorkedDays += activeDays;
    }

    daysWorked.forEach(days => {
        targetByMonth.push((yearlyTarget / 365) * days);
    });

    const totalTarget = targetByMonth.reduce((sum, val) => sum + val, 0);

    return {
        totalDaysInMonth,
        daysWorked,
        targetByMonth,
        totalTarget
    };
}

console.log(generatorTargetCalc('2024-01-01', '2024-03-31', 5220));