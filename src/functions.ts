import fs from "fs";
import { jalaliToGregorian } from "./jalaliToGregorianDate";

export async function fetchData(location: string): Promise<any> {
    const response = await fetch(location);
    if (!response.ok) {
        console.log("Failed to read data");
    }
    return response.json();
};

export function readInputById(inputId: string): string {
    let inputElement;
    inputElement = document.getElementById(inputId) as HTMLInputElement;
    return inputElement.value;
}

export function setSpanInputById(inputId: string, spanTextContent: string) {
    let element;
    element = document.getElementById(inputId) as HTMLSpanElement;
    element.innerText = spanTextContent;
}

export class Result<T> {
    public isSuccess: boolean;
    public error?: string;
    public value?: T;

    private constructor(isSuccess: boolean, error?: string, value?: T) {
        this.isSuccess = isSuccess;
        this.error = error;
        this.value = value;
    }

    public static success<T>(value: T): Result<T> {
        return new Result<T>(true, undefined, value);
    }

    public static failure<T>(error: string): Result<T> {
        return new Result<T>(false, error);
    }
}

export interface Gold24CaratData {
    RialPrice: number;
    Date: Date;
}

export type CalculationResult = {
    InputValue: number;
    LastPrice: number;
    PriceOnDate: number;
}

export function calculator(value: number, p_year: number, p_month: number, p_day: number): Result<CalculationResult> {
    const jsonData = fs.readFileSync('../asset/Gold24Carat_min.json', 'utf-8');

    const goldData = JSON.parse(jsonData) as Gold24CaratData[];
    let georgianDate = jalaliToGregorian(p_year, p_month, p_day);

    goldData.sort((a, b) => b.Date.getDate() - a.Date.getDate());
    const lastData = goldData[0];
    let dataOnDate = goldData.find(d => d.Date === georgianDate);

    let valueAtDate: number;

    if (dataOnDate) {
        valueAtDate = value / dataOnDate.RialPrice;
    } else {
        return Result.failure("No data found fot the provided date")
    }

    let valueAtLastDate = valueAtDate * lastData.RialPrice;

    const rounded = Math.round(valueAtLastDate * 100) / 100;
    let res: CalculationResult = {
        InputValue: rounded,
        LastPrice: lastData.RialPrice,
        PriceOnDate: dataOnDate.RialPrice
    }
    return Result.success(res);
}

function getDataAndShowResults() {
    const day = parseInt(readInputById('day'))
    const month = parseInt(readInputById('month'))
    const year = parseInt(readInputById('year'))
    const value = parseInt(readInputById('value'))

    const result = calculator(value, day, month, year);

    setSpanInputById('last_gold_price', result.value?.LastPrice.toString() ?? "");
    setSpanInputById('price_at_provided_date', result.value?.PriceOnDate.toString() ?? "");
    setSpanInputById('provided_price_in_today', result.value?.InputValue.toString() ?? "");
}

// export function showData() {
//     const rawData = fetchData('../asset/Gold24Carat_min.json')
//
//     // Populate the table with data
//     populateTable(items);
//
//     // Function to create rows and populate data
//     function populateTable(items: Element[]) {
//         // Reference to the table body
//         const tableBody = document.querySelector('#myTable tbody');
//
//         items.forEach(item => {
//             const row = document.createElement('tr');
//             // Main item cell
//             const mainItemCell = document.createElement('td');
//             mainItemCell.textContent = item.name;
//             row.appendChild(mainItemCell);
//             // Subitems cell
//             const subitemsCell = document.createElement('td');
//             const subitemsList = document.createElement('ul');
//             item.subitems.forEach(subitem => {
//                 const subitemLi = document.createElement('li');
//                 subitemLi.textContent = subitem;
//                 subitemsList.appendChild(subitemLi);
//             });
//             subitemsCell.appendChild(subitemsList);
//             row.appendChild(subitemsCell);
//             // Append row to the table body
//             tableBody.appendChild(row);
//         });
//     }
// }