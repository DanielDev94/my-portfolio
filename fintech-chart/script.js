// --- 1. SELECT THE CANVAS ---
// We need to tell JavaScript exactly where to draw. '2d' means it's a flat 2D graph.
const ctx = document.getElementById('forexChart').getContext('2d');

// --- 2. INITIALIZE OUR DATA ---
// We will use some realistic dummy data for the USD to NGN exchange rate.
let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let exchangeRates = [1450, 1465, 1460, 1480, 1475, 1490, 1500];

// --- 3. BUILD THE CHART ---
// We use the 'new Chart' command provided by the library we imported in the HTML.
const forexChart = new Chart(ctx, {
    type: 'line', // This defines the style. Try changing it to 'bar' later!
    data: {
        labels: days, // The X-axis (Bottom)
        datasets: [{
            label: 'USD to NGN Rate (₦)',
            data: exchangeRates, // The Y-axis (Side)
            borderColor: '#0fb9b1', // The Teal line color
            backgroundColor: 'rgba(15, 185, 177, 0.2)', // Light teal glow under the line
            borderWidth: 3,
            tension: 0.3, // Makes the line slightly curved and smooth instead of jagged
            fill: true // Fills the space under the line with the backgroundColor
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false // Currencies don't drop to zero, so we focus on the 1400+ range
            }
        }
    }
});

// --- 4. SIMULATE LIVE MARKET UPDATES ---
const updateBtn = document.getElementById('update-btn');

updateBtn.addEventListener('click', () => {
    // 1. Remove the oldest data point (Monday) using .shift()
    forexChart.data.labels.shift(); 
    forexChart.data.datasets[0].data.shift();

    // 2. Add a new label to the end using .push()
    forexChart.data.labels.push('Live'); 

    // 3. Generate a random new exchange rate (between 1480 and 1520)
    let newRate = Math.floor(Math.random() * (1520 - 1480 + 1)) + 1480;
    forexChart.data.datasets[0].data.push(newRate);

    // 4. CRITICAL: Tell the chart to redraw itself with the new data!
    forexChart.update();
});