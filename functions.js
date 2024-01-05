function fetchData() {
    return fetch('https://cdn.jsdelivr.net/gh/SamadiPour/rial-exchange-rates-archive@data/jalali_all.min.json')
        .then(response => response.json())
        .then(data => {
            this.data = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

function calculateSum(value, date) {
    const rawData = this.data;
    usdOnDate = rawData[date]["azadi1"]["sell"];

    const keys = Object.keys(rawData);
    const lastKey = keys[keys.length - 1];
    const lastValue = rawData[lastKey];

    latestUsdValue = lastValue["azadi1"]["sell"];

    usdAtDate = value / usdOnDate;
    rialAtLastDate = usdAtDate * latestUsdValue;

    const rounded = Math.round(rialAtLastDate * 100) / 100;
    return { value: rounded, lastUsdValue: latestUsdValue, usdValueOnDate: usdOnDate }
};

function showData() {
    return this.data;
}