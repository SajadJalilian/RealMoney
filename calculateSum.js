import {jalaliToGregorian} from "./jalaliToGregorianDate";

export function calculateSum(value, p_year, p_month, p_day, jsonData) {
    const rawData = jsonData;
    let georgianDate = jalaliToGregorian(p_year, p_month, p_day);

    let sellPriceOnDate = rawData[CreateDate(p_year, p_month, p_day)]["azadi1"]["sell"];

    const keys = Object.keys(rawData);
    const lastKey = keys[keys.length - 1];
    const lastValue = rawData[lastKey];

    let latestSellPrice = lastValue["azadi1"]["sell"];

    let valueAtDate = value / sellPriceOnDate;
    let valueAtLastDate = valueAtDate * latestSellPrice;

    const rounded = Math.round(valueAtLastDate * 100) / 100;
    return {
        value: rounded.toLocaleString(),
        lastUsdValue: latestSellPrice.toLocaleString(),
        usdValueOnDate: sellPriceOnDate.toLocaleString()
    }

    function CreateDate(year, month, day) {
        let date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        return date;
    }
}