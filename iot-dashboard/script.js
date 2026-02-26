// --- 1. SELECT DOM ELEMENTS ---
// We grab the HTML elements by their ID so we can control them
const lightToggle = document.getElementById('light-toggle');
const lightIcon = document.getElementById('light-icon');
const lightCard = document.getElementById('light-card');

const fanSlider = document.getElementById('fan-slider');
const fanSpeedDisplay = document.getElementById('fan-speed-display');
const fanIcon = document.getElementById('fan-icon');

const tempDisplay = document.getElementById('temp-display');

// --- 2. FEATURE: SMART LIGHT (Boolean Logic) ---
lightToggle.addEventListener('change', () => {
    // Check if the switch is ON (checked)
    if (lightToggle.checked) {
        // Turn ON: Change icon color to yellow and card border
        lightIcon.style.color = '#f1c40f'; // Yellow
        lightIcon.style.textShadow = '0 0 10px #f1c40f'; // Glow effect
        lightCard.style.borderColor = '#f1c40f';
    } else {
        // Turn OFF: Reset to grey
        lightIcon.style.color = '#555';
        lightIcon.style.textShadow = 'none';
        lightCard.style.borderColor = '#eee';
    }
});

// --- 3. FEATURE: COOLING FAN (Analog Logic) ---
fanSlider.addEventListener('input', () => {
    // 1. Get the current value (0-100)
    const speed = fanSlider.value;
    
    // 2. Update the text number
    fanSpeedDisplay.textContent = speed;

    // 3. Make the fan spin! 
    // We use CSS 'animation-duration' to control speed.
    // High speed = Low duration (fast spin).
    if (speed > 0) {
        fanIcon.style.animation = `spin ${1.5 - (speed / 100)}s linear infinite`;
        fanIcon.style.color = '#3498db'; // Blue when on
    } else {
        fanIcon.style.animation = 'none'; // Stop spinning
        fanIcon.style.color = '#555'; // Grey when off
    }
});

// --- 4. FEATURE: TEMPERATURE SENSOR (Simulation) ---
// In a real app, this would fetch data from a server.
// Here, we simulate a sensor reading every 2 seconds.
setInterval(() => {
    // Generate a random number between 23 and 26
    const randomTemp = (Math.random() * 3) + 23;
    
    // Update the text (toFixed(1) keeps it to 1 decimal place, e.g., 24.5)
    tempDisplay.textContent = randomTemp.toFixed(1);
    
    // Logic: If it gets too hot (>25.5), make text red!
    if (randomTemp > 25.5) {
        tempDisplay.style.color = '#e74c3c'; // Red
    } else {
        tempDisplay.style.color = '#333'; // Black
    }
}, 2000); // Run this every 2000 milliseconds (2 seconds)