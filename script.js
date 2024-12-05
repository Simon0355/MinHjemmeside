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

const pointerPosition = {
    top: 152.326, 
    left: 296.111, 
    bottom: 767.882,
    right: 911.667,
};

const numbers = [
    { number: 1, color: '#000000' }, { number: 2, color: '#ff0000' },
    { number: 3, color: '#000000' }, { number: 4, color: '#ff0000' },
    { number: 5, color: '#000000' }, { number: 6, color: '#ff0000' },
    { number: 7, color: '#000000' }, { number: 8, color: '#ff0000' },
    { number: 9, color: '#000000' }, { number: 10, color: '#ff0000' },
    { number: 11, color: '#000000' }, { number: 12, color: '#ff0000' },
    { number: 13, color: '#000000' }, { number: 14, color: '#ff0000' },
    { number: 15, color: '#000000' }, { number: 16, color: '#ff0000' },
    { number: 17, color: '#000000' }, { number: 18, color: '#ff0000' },
];

const spinAmount = 360 / numbers.length;

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

function updateBalance(amount) {
    balance += amount;
    balanceElement.textContent = balance;
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
        const pointerIndex = Math.floor((360 - actualDeg) / spinAmount);
        const result = numbers[pointerIndex];

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
