import * as fs from 'fs';
import {jalaliToGregorian} from "./jalaliToGregorianDate";
import {Result} from "./functions";

export function calculateSum(value: number, p_year: number, p_month: number, p_day: number): Result<CalculationResult> {
    const jsonData = fs.readFileSync('./asset/Gold24Carat_min.json', 'utf-8');
    const goldData = JSON.parse(jsonData) as Gold24CaratData[];
    let georgianDate = jalaliToGregorian(p_year, p_month, p_day);

    goldData.sort((a, b) => b.Date.getDate() - a.Date.getDate());
    const lastData = goldData[0];
    let dataOnDate = goldData.find(d => d.Date === georgianDate);
    if (dataOnDate !== undefined) {
        return Result.failure()
    }
    let valueAtDate = value / dataOnDate?.RialPrice;
    let valueAtLastDate = valueAtDate * lastData.RialPrice;

    const rounded = Math.round(valueAtLastDate * 100) / 100;
    let res: CalculationResult = {
        InputValue: rounded,
        LastPrice: lastData.RialPrice,
        PriceOnDate: dataOnDate.
    }
    return Result.success(res);
}

type CalculationResult = {
    InputValue: number;
    LastPrice: number;
    PriceOnDate: number;
}

interface Gold24CaratData {
    RialPrice: number;
    Date: Date;
}