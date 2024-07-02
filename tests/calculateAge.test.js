const { calculateAge } = require('../utils/calculateAge'); // Adjust the path as necessary

describe('calculateAge', () => {
    it('should correctly calculate the age for a birthdate earlier this year', () => {
        const dob = new Date('1990-01-15');
        const age = calculateAge(dob);
        const expectedAge = new Date().getFullYear() - 1990;
        expect(age).toBe(expectedAge);
    });

    it('should correctly calculate the age for a birthdate later this year', () => {
        const dob = new Date('1990-12-15');
        const age = calculateAge(dob);
        const expectedAge = new Date().getFullYear() - 1990 - 1;
        expect(age).toBe(expectedAge);
    });

    it('should return 0 for a birthdate today', () => {
        const today = new Date();
        const age = calculateAge(today);
        expect(age).toBe(0);
    });

    it('should return negative age for a future birthdate', () => {
        const futureDate = new Date(new Date().getFullYear() + 1, 0, 1);
        const age = calculateAge(futureDate);
        expect(age).toBe(-1);
    });

    it('should correctly calculate the age for a birthdate at the end of the year', () => {
        const dob = new Date('1990-12-31');
        const age = calculateAge(dob);
        const expectedAge = new Date().getFullYear() - 1990 - 1;
        expect(age).toBe(expectedAge);
    });

    it('should correctly calculate the age for a leap year birthdate', () => {
        const dob = new Date('2000-02-29');
        const age = calculateAge(dob);
        const expectedAge = new Date().getFullYear() - 2000;
        if (new Date().getMonth() < 1 || (new Date().getMonth() === 1 && new Date().getDate() < 29)) {
            expect(age).toBe(expectedAge - 1);
        } else {
            expect(age).toBe(expectedAge);
        }
    });

    it('should return NaN for an invalid date', () => {
        const dob = new Date('invalid-date');
        const age = calculateAge(dob);
        expect(age).toBeNaN();
    });

    it('should return NaN for a non-date input', () => {
        const dob = "not-a-date";
        const age = calculateAge(dob);
        expect(age).toBeNaN();
    });

    it('should correctly calculate the age for a recent past date', () => {
        const dob = new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate() - 1);
        const age = calculateAge(dob);
        expect(age).toBe(1);
    });

    it('should correctly calculate the age for a birthdate on February 29 on a non-leap year', () => {
        const dob = new Date('2000-02-29');
        const age = calculateAge(dob);
        const expectedAge = new Date().getFullYear() - 2000;
        if (new Date().getMonth() < 1 || (new Date().getMonth() === 1 && new Date().getDate() < 28)) {
            expect(age).toBe(expectedAge - 1);
        } else {
            expect(age).toBe(expectedAge);
        }
    });
});