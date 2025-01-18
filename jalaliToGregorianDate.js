export function jalaliToGregorian(jy, jm, jd) {
    const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]; // Days in each Jalali month
    const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Days in each Georgian month

    // Check if the Jalali year is a leap year
    const isLeapYear = (jy % 33 % 4 === 1 && jy % 33 !== 0) || jy % 33 === 0;
    if (isLeapYear) {
        jDaysInMonth[11] = 30; // Esfand has 30 days in a leap year
    }

    // Calculate the total days since the start of the Jalali calendar
    let totalDays = jd - 1;
    for (let i = 0; i < jm - 1; i++) {
        totalDays += jDaysInMonth[i];
    }
    totalDays += 365 * (jy - 1) + Math.floor((jy + 3) / 4) - Math.floor((jy + 99) / 100) + Math.floor((jy + 399) / 400);

    // Convert total days to Georgian date
    let gy = 622; // Start of the Georgian calendar (622 AD)
    while (totalDays > 365) {
        const isGregorianLeapYear = (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0;
        const daysInYear = isGregorianLeapYear ? 366 : 365;
        if (totalDays >= daysInYear) {
            totalDays -= daysInYear;
            gy++;
        } else {
            break;
        }
    }

    // Adjust for leap years in the Georgian calendar
    const isGregorianLeapYear = (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0;
    if (isGregorianLeapYear) {
        gDaysInMonth[1] = 29; // February has 29 days in a leap year
    }

    let gm = 1;
    while (totalDays >= gDaysInMonth[gm - 1]) {
        totalDays -= gDaysInMonth[gm - 1];
        gm++;
    }

    const gd = totalDays + 1;

    return { gy, gm, gd };
}