//Cryptocurrency API
var url = "https://api.coinmarketcap.com/v1/ticker/?limit=50";

//Fetch coins data
fetch(url)
    .then(function (res) {
        return res.json()
    })
    .then(updateCoins);


function updateCoins(data) {
    for (var i = 0; i < data.length; i++) {
        var rank = data[i].rank;
        var coinName = data[i].name;
        var symbol = data[i].symbol;
        var marketCap = data[i].market_cap_usd;
        var price = data[i].price_usd;
        var changeHr = data[i].percent_change_1h;
        var change = data[i].percent_change_24h;
        var formatted = formatter.format(marketCap);
        var formatPrice = formatter.format(price);

        //create html elements
        var markup = `
        <div class="coin-info">
            <div class="key rank">
                ${rank}
            </div>
            <div class="key name">
                ${coinName}
                (${symbol})
            </div>
            <div class="key cap">
                ${formatted}
            </div>
            <div class="key coinPrice">
                ${formatPrice}
            </div>
            <div class="key changeHr">
                ${changeHr}
            </div>
            <div class="key change">
                ${change}
            </div>
        </div>
        `;

        //Append the markup to the DOM
        var div = document.getElementById('coinData');
        div.insertAdjacentHTML('beforeend', markup);
        changeColor();
    }

};

//Change currency
//function changeCurrency() {
//    var selection = document.getElementById("currencies").value;
//    var url = "https://api.coinmarketcap.com/v1/ticker/?convert=" + selection + "&limit=10";
//    fetch(url)
//        .then(function (res) {
//            return res.json()
//       })
//        .then(updateCoins);

//};

//Load more coins
var btn = document.getElementById('btn');
btn.addEventListener('click', function () {
    //Get amount of coins currently displaying
    var total = document.getElementsByClassName("coin-info").length;

    var url = "https://api.coinmarketcap.com/v1/ticker/?start=" + total + "&limit=50";
    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(updateCoins);

});

//Change color of amounts to denote positive or negative changes
function changeColor() {
    var changes = document.getElementsByClassName('change');
    var changeHr = document.getElementsByClassName('changeHr');
    var price = document.getElementsByClassName('coinPrice');
    var cap = document.getElementsByClassName('cap');

    for (var i = 0; i < changes.length; i++) {
        if (changes[i].innerText < 0) {
            changes[i].style.color = "#F4796B";
            changeHr[i].style.color = "#F4796B";
            price[i].style.color = "#F4796B";
            cap[i].style.color = "#F4796B";
        } else {
            changes[i].style.color = "#448F83";
            changeHr[i].style.color = "#448F83";
            price[i].style.color = "#448F83";
            cap[i].style.color = "#448F83";
        }
    }

};
  
//Format currency amounts
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});









