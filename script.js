let balance = 1000; // Starting balance
let selectedBet = null;
let betAmount = 0;

const spinButton = document.getElementById('spin-btn');
const betButtons = document.querySelectorAll('.bet-option');
const balanceElement = document.getElementById('balance');
const resultArea = document.getElementById('result');
const customBetInput = document.getElementById('custom-bet');
const wheelCanvas = document.getElementById('roulette-wheel');
const ctx = wheelCanvas.getContext('2d');

// Roulette fields and colors
const numbers = [
    { number: 1, color: '#ff0000' }, { number: 2, color: '#000000' }, { number: 3, color: '#ff0000' },
    { number: 4, color: '#000000' }, { number: 5, color: '#ff0000' }, { number: 6, color: '#000000' },
    { number: 7, color: '#ff0000' }, { number: 8, color: '#000000' }, { number: 9, color: '#ff0000' },
    { number: 10, color: '#000000' }, { number: 11, color: '#ff0000' }, { number: 12, color: '#000000' },
    { number: 13, color: '#ff0000' }, { number: 14, color: '#000000' }, { number: 15, color: '#ff0000' },
    { number: 16, color: '#000000' }, { number: 17, color: '#ff0000' }, { number: 18, color: '#000000' }
];

const spinAmount = 360 / numbers.length; // Angle for each segment

// Draw the roulette wheel
function drawRouletteWheel() {
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    ctx.translate(wheelCanvas.width / 2, wheelCanvas.height / 2);

    numbers.forEach((item, index) => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 230, (spinAmount * index) * Math.PI / 180, (spinAmount * (index + 1)) * Math.PI / 180);
        ctx.fillStyle = item.color;
        ctx.fill();
    });

    ctx.font = '16px Arial';
    ctx.fillStyle = '#fff';
    numbers.forEach((item, index) => {
        ctx.save();
        ctx.rotate((spinAmount * index + spinAmount / 2) * Math.PI / 180);
        ctx.translate(0, -200);
        ctx.fillText(item.number, -10, 0);
        ctx.restore();
    });
    ctx.translate(-wheelCanvas.width / 2, -wheelCanvas.height / 2);
}

// Update balance
function updateBalance(amount) {
    balance += amount;
    balanceElement.textContent = balance;
}

// Spin the wheel
function spinWheel() {
    if (!selectedBet || !betAmount) {
        resultArea.innerHTML = `<span style="color: red;">Select a bet and amount!</span>`;
        return;
    }
    if (betAmount > balance) {
        resultArea.innerHTML = `<span style="color: red;">Not enough balance!</span>`;
        return;
    }

    const spins = Math.floor(Math.random() * 5) + 5; // Number of full spins
    const deg = Math.floor(Math.random() * 360); // Final position
    const rotation = deg + (360 * spins);

    wheelCanvas.style.transition = 'transform 3s ease-out';
    wheelCanvas.style.transform = `rotate(${rotation}deg)`;

    // Calculate result
    setTimeout(() => {
        const actualDeg = rotation % 360;
        const index = Math.floor(actualDeg / spinAmount);
        const result = numbers[index];
        resultArea.innerHTML = `Result: <strong>${result.number}</strong> (${result.color === '#ff0000' ? 'Red' : 'Black'})`;

        // Check bet and update balance
        let win = false;
        if ((selectedBet === 'red' && result.color === '#ff0000') ||
            (selectedBet === 'black' && result.color === '#000000') ||
            (selectedBet === 'odd' && result.number % 2 !== 0) ||
            (selectedBet === 'even' && result.number % 2 === 0)) {
            win = true;
        }

        if (win) {
            updateBalance(betAmount);
            resultArea.innerHTML += `<br>You win! Your new balance is: ${balance} kr`;
        } else {
            updateBalance(-betAmount);
            resultArea.innerHTML += `<br>You lose! Your new balance is: ${balance} kr`;
        }

        // Reset bet after spinning
        selectedBet = null;
        betAmount = 0;
        customBetInput.value = '';
        betButtons.forEach(button => button.classList.remove('selected'));
    }, 3000); // Match the duration of the spin animation
}

// Event listeners for bet buttons
betButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedBet = button.dataset.bet;
        betAmount = parseInt(customBetInput.value) || 0;
        
        betButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

// Event listener for custom bet input
customBetInput.addEventListener('input', () => {
    betAmount = parseInt(customBetInput.value) || 0;
});

// Event listener for the spin button
spinButton.addEventListener('click', spinWheel);

// Initialize the roulette wheel on page load
drawRouletteWheel();
