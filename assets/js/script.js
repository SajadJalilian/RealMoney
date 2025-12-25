const ToRial = amount => (amount * 10);
const ToToman = amount => (amount / 10);

document.addEventListener("DOMContentLoaded", function() {
  fetch('https://cdn.jsdelivr.net/gh/SajadJalilian/RialExchangeRateWithGold@refs/heads/data/Gold24Carat_min.json')
    .then(response => response.json())
    .then(data => {
      this.data = data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  
  const calculateSum = (value, year, month, day) => {
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

  const result_container = document.getElementById("result");
  const res_last_value = document.getElementById("res-last-value");
  const res_price_at_date = document.getElementById("res-price-at-date");
  const res_price = document.getElementById("res-price");

  const calculate_btn = document.getElementById("calculate");
  calculate_btn.onclick = () => {
    var value = document.getElementById("price_IRT").value;
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var day = document.getElementById("day").value;

    try {
      var res_data = calculateSum(value, year, month, day);
      result_container.classList.add('active');
      res_last_value.innerText = res_data.lastValue
      res_price_at_date.innerText = res_data.priceAtDate
      res_price.innerText = res_data.price
    } catch (error) {
      alert("اطلاعات وارد شده صحیح نمی‌باشد.");
      throw error;
    }
  };
});