const spinButton = document.getElementById('spin-button');
const betAmountInput = document.getElementById('bet-amount');
const wheelSegments = document.getElementById('wheel-segments');
const ball = document.getElementById('ball');
const arrow = document.getElementById('arrow');
const resultArea = document.getElementById('result-area');
const balanceElement = document.getElementById('balance');

let balance = 1000; // Start balance
let wheelSpinning = false;
let betChoice = null;
let betAmount = 0;

// Roulette segments
const wheelNumbers = [
    { number: 0, color: 'green' },
    { number: 32, color: 'red' },
    { number: 15, color: 'black' },
    { number: 19, color: 'red' },
    { number: 4, color: 'black' },
    { number: 21, color: 'red' },
    { number: 2, color: 'black' },
    { number: 25, color: 'red' },
    { number: 17, color: 'black' },
    { number: 34, color: 'red' },
    // Additional numbers (adding the full set would be similar)
];

// Create roulette wheel
function createWheel() {
    const anglePerSegment = 360 / wheelNumbers.length;
    
    wheelNumbers.forEach((segment, index) => {
        const angleStart = anglePerSegment * index;
        const angleEnd = anglePerSegment * (index + 1);
        const x1 = 200 + 150 * Math.cos(Math.PI * angleStart / 180);
        const y1 = 200 + 150 * Math.sin(Math.PI * angleStart / 180);
        const x2 = 200 + 150 * Math.cos(Math.PI * angleEnd / 180);
        const y2 = 200 + 150 * Math.sin(Math.PI * angleEnd / 180);
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M200,200 L${x1},${y1} A150,150 0 ${anglePerSegment > 180 ? 1 : 0},1 ${x2},${y2} Z`);
        path.setAttribute("fill", segment.color);
        wheelSegments.appendChild(path);
        
        const numberText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        numberText.setAttribute("x", 200 + 120 * Math.cos(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("y", 200 + 120 * Math.sin(Math.PI * (angleStart + angleEnd) / 360));
        numberText.setAttribute("text-anchor", "middle");
        numberText.setAttribute("dy", "5");
        numberText.textContent = segment.number;
        wheelSegments.appendChild(numberText);
    });
}

// Spin the wheel
function spinWheel() {
    if (wheelSpinning) return;
    
    wheelSpinning = true;
    const spinAngle = Math.random() * 360 + 720; // Spin 2 full rotations plus a random angle
    wheelSegments.style.transform = `rotate(${spinAngle}deg)`;
    
    // Wait for the wheel to stop
    setTimeout(() => {
        const finalAngle = spinAngle % 360;
        const winningSegment = Math.floor(finalAngle / (360 / wheelNumbers.length));
        const winningNumber = wheelNumbers[winningSegment].number;
        const winningColor = wheelNumbers[winningSegment].color;

        resultArea.textContent = `Det blev: ${winningNumber} (${winningColor})`;
        
        // Update balance if bet was placed
        if (betChoice && betChoice === winningColor) {
            balance += betAmount * 2;
            resultArea.textContent += ` - Du vandt! Ny balance: ${balance}`;
        } else {
            balance -= betAmount;
            resultArea.textContent += ` - Du tabte. Ny balance: ${balance}`;
        }
        
        balanceElement.textContent = balance;
        wheelSpinning = false;
    }, 5000);
}

// Event listeners for betting
document.querySelectorAll('.bet').forEach(button => {
    button.addEventListener('click', () => {
        betChoice = button.dataset.bet;
        betAmount = parseInt(betAmountInput.value);
    });
});

// Event listener for spinning
spinButton.addEventListener('click', () => {
    if (betAmount <= 0 || !betChoice) {
        alert("Du skal placere et bet og vælge en indsats.");
        return;
    }
    spinWheel();
});

createWheel();
