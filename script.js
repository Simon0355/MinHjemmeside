// Referencer til elementer
const spinButton = document.getElementById('spin-button');
const betAmountInput = document.getElementById('bet-amount');
const balanceElement = document.getElementById('balance');
const resultArea = document.getElementById('result-area');
let balance = 1000;

// Definer roulette-hjulet (tal og farver)
const wheelNumbers = [
    { number: 0, color: 'green' },
    { number: 1, color: 'red' },
    { number: 2, color: 'black' },
    // Tilføj flere segmenter efter behov
];

// Spin funktion
function spinWheel() {
    const randomIndex = Math.floor(Math.random() * wheelNumbers.length);
    const winningSegment = wheelNumbers[randomIndex];
    
    // Animation af hjulet
    const wheelCanvas = document.getElementById('roulette-wheel');
    const ctx = wheelCanvas.getContext('2d');
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    
    // Tegn hjul (simpel 2D-stil)
    const radius = wheelCanvas.width / 2;
    const segments = wheelNumbers.length;
    const angle = (Math.PI * 2) / segments;
    
    for (let i = 0; i < segments; i++) {
        const startAngle = i * angle;
        const endAngle = (i + 1) * angle;
        ctx.beginPath();
        ctx.arc(radius, radius, radius, startAngle, endAngle);
        ctx.lineTo(radius, radius);
        ctx.fillStyle = wheelNumbers[i].color;
        ctx.fill();
    }

    // Resultatvisning
    resultArea.innerHTML = `Resultat: ${winningSegment.number} (${winningSegment.color})`;

    // Opdater balance (simpel logik)
    balance -= parseInt(betAmountInput.value, 10);
    if (winningSegment.color === 'green') {
        balance += 2 * parseInt(betAmountInput.value, 10);
    }
    balanceElement.innerText = balance;
}

// Event listener for spin button
spinButton.addEventListener('click', function () {
    const betAmount = parseInt(betAmountInput.value, 10);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert("Indtast et gyldigt beløb!");
        return;
    }
    spinWheel();
});
