$(document).ready(function () {

    registerServiceWorker();


    // for spot
    $('#cPriceS, #usdtPriceS, #cQtyS').keyup(function () {
        var price = $('#cPriceS').val();
        var USDT = $('#usdtPriceS').val();

        if (price != '' && USDT != '') {
            $('#cQtyS').val(USDT / price);
        }
    });

    $('#spotForm').submit(function (e) {
        e.preventDefault();

        var USDT = $('#usdtPriceS').val();
        var Qty = $('#cQtyS').val();
        var sell = $('#tpS').val();

        var answer = (Qty * sell) - USDT;
        var percentage = (answer / USDT) * 100;

        var html = `
            Profit = 
            <span class="${answer < 0 ? 'text-danger' : 'text-success'}">${answer.toFixed(2)} USDT</span>
            <br>
            Percentage = 
            <span class="${answer < 0 ? 'text-danger' : 'text-success'}">${percentage.toFixed(2)}%</span>
        `;

        $('#spotOutput').html(html);
    });


    // for future
    $('#cPriceF, #usdtPriceF, #cQtyF').keyup(function () {
        var price = $('#cPriceF').val();
        var USDT = $('#usdtPriceF').val();

        if (price != '' && USDT != '') {
            $('#cQtyF').val(USDT / price);
        }
    });


    $('#futureForm').submit(function (e) {
        e.preventDefault();

        var postion = $('#cPosition').val();
        var USDT = $('#usdtPriceF').val();
        var Qty = $('#cQtyF').val();
        var leverage = $('#lvg').val();
        var TP = $('#tpF').val();
        var SL = $('#slF').val();

        var reward = Math.abs(((Qty * TP) - USDT) * leverage);
        var rewardPercent = Math.abs((reward / USDT) * 100);

        var risk = Math.abs((USDT - (Qty * SL)) * leverage);
        var riskPrecent = Math.abs((risk / USDT) * 100);

        var html = `
            Reward = <span class="text-success">${reward.toFixed(4)} USDT</span>
            <br>
            Risk = <span class="text-danger">${risk.toFixed(4)} USDT</span>
            <br>
            R:R = 
            <span class="text-primary">
                ${riskPrecent.toFixed(2)}% / ${rewardPercent.toFixed(2)}%
            </span>
        `;

        $('#futureOutput').html(html);
    });
});




function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(reg => {
            console.log('Registration successful', reg);
        }).catch(e => console.error('Error during service worker registration:', e));
    } else {
        console.warn('Service Worker is not supported');
    }
}