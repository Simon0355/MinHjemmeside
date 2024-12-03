const spinButton = document.getElementById('spin-button');
const balanceDisplay = document.getElementById('balance');
const betButtons = document.querySelectorAll('.bet-option');
const resultDisplay = document.getElementById('result-display');
const betAmountInput = document.getElementById('bet-amount');
let balance = 1000;
let selectedBet = null;

// Canvas setup
const canvas = document.getElementById('roulette-wheel');
const ctx = canvas.getContext('2d');
canvas.width = canvas.height = 400;

const segments = [
    { number: 0, color: 'green' },
    { number: 1, color: 'red' },
    { number: 2, color: 'black' },
    // Add more segments as needed
];

function drawWheel() {
    const anglePerSegment = (2 * Math.PI) / segments.length;
    segments.forEach((segment, index) => {
        const startAngle = index * anglePerSegment;
        const endAngle = startAngle + anglePerSegment;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, startAngle, endAngle);
        ctx.fillStyle = segment.color;
        ctx.fill();

        // Draw number
        const textAngle = startAngle + anglePerSegment / 2;
        const x = 200 + Math.cos(textAngle) * 140;
        const y = 200 + Math.sin(textAngle) * 140;
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(segment.number, x, y);
    });
}

function spinWheel() {
    const spinDegrees = Math.random() * 360 + 720; // Ensure at least 2 spins
    canvas.style.transition = 'transform 5s cubic-bezier(0.3, 1.3, 0.2, 1)';
    canvas.style.transform = `rotate(${spinDegrees}deg)`;

    setTimeout(() => {
        const resultIndex = Math.floor(Math.random() * segments.length);
        const result = segments[resultIndex];
        resultDisplay.textContent = `Hjulet landede på ${result.number} (${result.color})!`;
    }, 5000);
}

// Event listeners
spinButton.addEventListener('click', spinWheel);
drawWheel();
