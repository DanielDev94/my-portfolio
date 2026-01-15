// 1. Paste your API Key here
const apiKey = '4a2a10ece91242a61281f21a'; 

// 2. Select DOM Elements
const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// 3. Fetch Exchange Rates and Update the DOM
function calculate() {
    const currency_one = currencyOne.value;
    const currency_two = currencyTwo.value;

    // The Fetch Command (The "Waiter")
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency_one}`)
        .then(res => res.json()) // Convert the raw response to readable JSON
        .then(data => {
            // Get the specific rate for the second currency
            const rate = data.conversion_rates[currency_two];
            
            // Update the Rate Text
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            // Calculate the bottom amount
            amountTwo.value = (amountOne.value * rate).toFixed(2);
        })
        .catch(error => console.log("Error fetching data:", error));
}

// 4. Event Listeners
// Update whenever the user changes currency or types a number
currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);

// Swap Button Logic
swap.addEventListener('click', () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
});

// Run calculate once when page loads
calculate();