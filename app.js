const flipper = document.getElementById('flipper')
const colorDisplay = document.querySelector('.color-display')
const colorPreview = document.querySelector('.color-preview')
const colorValue = document.getElementById('color-value')
const h1 = document.getElementById("h1");
const quote = document.getElementById("quote");
const historyContainer = document.querySelector('.history-container');
const particlesContainer = document.querySelector('.particles');

let colorHistory = [];
const MAX_HISTORY = 8;

// Helper function to generate random hex color
function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Helper function to check if color is light or dark
function isLightColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
}

// Create particles
function createParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 20 + 10 + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Add color to history
function addToHistory(color) {
    colorHistory.unshift(color);
    if (colorHistory.length > MAX_HISTORY) {
        colorHistory.pop();
    }
    updateHistory();
}

// Update history display
function updateHistory() {
    historyContainer.innerHTML = '';
    colorHistory.forEach(color => {
        const colorElement = document.createElement('div');
        colorElement.className = 'history-color';
        colorElement.style.backgroundColor = color;
        colorElement.addEventListener('click', () => {
            applyColor(color);
        });
        historyContainer.appendChild(colorElement);
    });
}

// Apply color to all elements
function applyColor(color) {
    const isLight = isLightColor(color);
    
    // Update background color
    document.body.style.backgroundColor = color;
    
    // Update color display
    colorDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    colorPreview.style.backgroundColor = color;
    colorValue.textContent = color;
    
    // Update text colors based on background brightness
    const textColor = isLight ? '#2c3e50' : '#ffffff';
    h1.style.color = textColor;
    quote.style.color = textColor;
    colorValue.style.color = textColor;
    
    // Update button colors
    flipper.style.backgroundColor = isLight ? 'rgba(44, 62, 80, 0.1)' : 'rgba(255, 255, 255, 0.1)';
    flipper.style.color = textColor;
    flipper.style.borderColor = isLight ? 'rgba(44, 62, 80, 0.2)' : 'rgba(255, 255, 255, 0.2)';
}

// Initialize
createParticles();

flipper.onclick = function changeColors() {
    const color = generateRandomColor();
    applyColor(color);
    addToHistory(color);
};

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        flipper.click();
    }
});