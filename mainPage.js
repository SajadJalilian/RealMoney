import {readInput} from "./functions";

export const data = await fetchData('/asset/Gold24Carat_min.json');

function getInputs() {
    const day = readInput('day')
    const month = readInput('month')
    const year = readInput('year')
    const value = readInput('value')

    calculateSum(value, day, month, year);
}

