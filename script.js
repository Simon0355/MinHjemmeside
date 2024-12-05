let balance = 1000;
let selectedBet = null;
let betAmount = 0;

const spinButton = document.getElementById('spin-btn');
const betButtons = document.querySelectorAll('.bet-option');
const balanceElement = document.getElementById('balance');
const resultArea = document.getElementById('result');
const customBetInput = document.getElementById('custom-bet');
const wheelCanvas = document.getElementById('roulette-wheel');
const ctx = wheelCanvas.getContext('2d');

const numbers = [
    { number: 1, color: '#000000' }, { number: 2, color: '#ff0000' }, { number: 3, color: '#000000' }, 
    { number: 4, color: '#ff0000' }, { number: 5, color: '#000000' }, { number: 6, color: '#ff0000' }, 
    { number: 7, color: '#000000' }, { number: 8, color: '#ff0000' }, { number: 9, color: '#000000' }, 
    { number: 10, color: '#ff0000' }, { number: 11, color: '#000000' }, { number: 12, color: '#ff0000' }, 
    { number: 13, color: '#000000' }, { number: 14, color: '#ff0000' }, { number: 15, color: '#000000' }, 
    { number: 16, color: '#ff0000' }, { number: 17, color: '#000000' }, { number: 18, color: '#ff0000' }
];

const spinAmount = 360 / numbers.length;

function drawRouletteWheel() {
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    const radius = 230;
    ctx.translate(wheelCanvas.width / 2, wheelCanvas.height / 2);

    numbers.forEach((item, index) => {
        const startAngle = (spinAmount * index) * Math.PI / 180;
        const endAngle = (spinAmount * (index + 1)) * Math.PI / 180;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.fillStyle = item.color;
        ctx.fill();
    });

    numbers.forEach((item, index) => {
        const angle = (spinAmount * index + spinAmount / 2) * Math.PI / 180;
        const textRadius = 180;
        const x = textRadius * Math.cos(angle);
        const y = textRadius * Math.sin(angle);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);

        ctx.font = '20px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.number, 0, 0);

        ctx.restore();
    });

    ctx.translate(-wheelCanvas.width / 2, -wheelCanvas.height / 2);
}

function spinWheel() {
    if (!selectedBet || !betAmount) {
        resultArea.innerHTML = `<span style="color: red;">Select a bet and amount!</span>`;
        return;
    }
    if (betAmount > balance) {
        resultArea.innerHTML = `<span style="color: red;">Not enough balance!</span>`;
        return;
    }

    const spins = Math.floor(Math.random() * 5) + 5;
    const deg = Math.floor(Math.random() * 360);
    const rotation = deg + (360 * spins);

    wheelCanvas.style.transition = 'transform 3s ease-out';
    wheelCanvas.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        const actualDeg = rotation % 360;
        const index = Math.floor(actualDeg / spinAmount);
        const result = numbers[index];
        resultArea.innerHTML = `Result: <strong>${result.number}</strong> (${result.color === '#ff0000' ? 'Red' : 'Black'})`;

        let win = false;
        if ((selectedBet === 'red' && result.color === '#ff0000') ||
            (selectedBet === 'black' && result.color === '#000000') ||
            (selectedBet === 'odd' && result.number % 2 !== 0) ||
            (selectedBet === 'even' && result.number % 2 === 0)) {
            win = true;
        }

        if (win) {
            updateBalance(betAmount);
            resultArea.innerHTML += `<br><span style="color: green;">You won ${betAmount} kr!</span>`;
        } else {
            updateBalance(-betAmount);
            resultArea.innerHTML += `<br><span style="color: red;">You lost ${betAmount} kr!</span>`;
        }

        selectedBet = null;
        betAmount = 0;
        betButtons.forEach(btn => btn.classList.remove('selected'));
        customBetInput.value = '';
    }, 3000);
}

function updateBalance(amount) {
    balance += amount;
    balanceElement.textContent = balance;
}

betButtons.forEach(button => {
    button.addEventListener('click', function () {
        selectedBet = this.dataset.bet;
        betButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
    });
});

customBetInput.addEventListener('input', function () {
    betAmount = parseInt(this.value) || 0;
});

spinButton.addEventListener('click', spinWheel);

drawRouletteWheel();
