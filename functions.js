function fetchData() {
    return fetch('https://cdn.jsdelivr.net/gh/SajadJalilian/RialExchangeRateWithGold@refs/heads/data/Gold24Carat_min.json')
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

    let fdate = CreateDate(year, month, day);
    let rialValue = ToRial(value);

    let recordOnDate = rawData.find(obj => obj.Date === fdate);
    let priceAtDate = recordOnDate.RialPrice;

    const lastRecord = rawData[0];
    const lastPrice = lastRecord.RialPrice;

    let val = rialValue / priceAtDate;
    let valueAtLastPrice = val * lastPrice;
    let valueAtLastPriceToman = ToToman(valueAtLastPrice);

    const rounded = Math.round(valueAtLastPriceToman);
    return { price: rounded.toLocaleString(), lastValue: ToToman(lastPrice).toLocaleString(), priceAtDate: ToToman(priceAtDate).toLocaleString() }

    function CreateDate(year, month, day) {
        let y = Number(year);
        let m = Number(month);
        let d = Number(day);

        let gdate = jalaali.toGregorian(y, m, d);

        let sm = gdate.gm.toLocaleString();
        let sd = gdate.gd.toLocaleString();


        date = `${gdate.gy}-${sm.padStart(2, '0')}-${sd.padStart(2, '0')}`;

        return date;
    }
};

function showData() {
    return this.data;
}

function ToRial(amount) {
    return amount * 10;
}

function ToToman(amount) {
    return amount / 10;
}