import {fetchData, readInputById, setSpanInputById} from "./functions";
import {calculateSum} from "./calculateSum";

export const data = fetchData('../asset/Gold24Carat_min.json');

function getDataAndShowResults() {
    const day = parseInt(readInputById('day'))
    const month = parseInt(readInputById('month'))
    const year = parseInt(readInputById('year'))
    const value = parseInt(readInputById('value'))

    const result = calculateSum(value, day, month, year);

    setSpanInputById('last_gold_price', result.value?.LastPrice.toString() ?? "");
    setSpanInputById('price_at_provided_date', result.value?.PriceOnDate.toString() ?? "");
    setSpanInputById('provided_price_in_today', result.value?.InputValue.toString() ?? "");
}

