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
    let rialValue = ToRial(parseTomanInput(value));

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

function normalizeDigits(value) {
    return String(value)
        .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
        .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

function digitsOnly(value) {
    return normalizeDigits(value).replace(/\D/g, "");
}

function formatTomanInput(event) {
    const el = event.target;
    const caret = el.selectionStart ?? el.value.length;
    const digitsBeforeCaret = digitsOnly(el.value.slice(0, caret)).length;
    const digits = digitsOnly(el.value).replace(/^0+(?=\d)/, "");
    const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    el.value = formatted;

    const pos = caretAfterDigitCount(formatted, digitsBeforeCaret);
    el.setSelectionRange(pos, pos);
    return formatted;
}

function caretAfterDigitCount(formatted, digitCount) {
    if (digitCount <= 0) return 0;

    let count = 0;
    for (let i = 0; i < formatted.length; i++) {
        if (/\d/.test(formatted[i])) {
            count++;
            if (count === digitCount) return i + 1;
        }
    }
    return formatted.length;
}

function parseTomanInput(value) {
    const digits = digitsOnly(value);
    return digits ? Number(digits) : 0;
}

function ToRial(amount) {
    return amount * 10;
}

function ToToman(amount) {
    return amount / 10;
}