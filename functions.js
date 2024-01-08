function fetchData() {
    debugger
    return fetch('https://cdn.jsdelivr.net/gh/SamadiPour/rial-exchange-rates-archive@data/jalali_all.min.json')
        .then(response => response.json())
        .then(data => {
            this.data = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

function calculateSum(value, year, month, day) {
    const rawData = this.data;
    usdOnDate = rawData[CreateDate(year, month, day)]["azadi1"]["sell"];

    const keys = Object.keys(rawData);
    const lastKey = keys[keys.length - 1];
    const lastValue = rawData[lastKey];

    latestUsdValue = lastValue["azadi1"]["sell"];

    usdAtDate = value / usdOnDate;
    rialAtLastDate = usdAtDate * latestUsdValue;

    const rounded = Math.round(rialAtLastDate * 100) / 100;
    return { value: rounded.toLocaleString(), lastUsdValue: latestUsdValue.toLocaleString(), usdValueOnDate: usdOnDate.toLocaleString() }

    function CreateDate(year, month, day) {
        date = `${year}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`;
        return date;
    }
};

function showData() {
    return this.data;
}