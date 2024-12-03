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

const colors = ['#ff0000', '#000000']; // Red and Black
const numbers = [
    { number: 0, color: '#00ff00' }, { number: 32, color: '#ff0000' }, { number: 15, color: '#000000' }, { number: 19, color: '#ff0000' },
    { number: 4, color: '#000000' }, { number: 21, color: '#ff0000' }, { number: 2, color: '#000000' }, { number: 25, color: '#ff0000' },
    { number: 17, color: '#000000' }, { number: 34, color: '#ff0000' }, { number: 6, color: '#000000' }, { number: 27, color: '#ff0000' },
    { number: 13, color: '#000000' }, { number: 36, color: '#ff0000' }, { number: 11, color: '#000000' }, { number: 30, color: '#ff0000' },
    { number: 8, color: '#000000' }, { number: 23, color: '#ff0000' }, { number: 10, color: '#000000' }, { number: 5, color: '#ff0000' },
    { number: 24, color: '#000000' }, { number: 16, color: '#ff0000' }, { number: 33, color: '#000000' }, { number: 1, color: '#ff0000' }
];

const spinAmount = 360 / numbers.length;

function drawRouletteWheel() {
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    ctx.translate(wheelCanvas.width / 2, wheelCanvas.height / 2); // Center the canvas

    numbers.forEach((item, index) => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 230, (spinAmount * index) * Math.PI / 180, (spinAmount * (index + 1)) * Math.PI / 180);
        ctx.fillStyle = item.color;
        ctx.fill();
    });

    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    numbers.forEach((item, index) => {
        ctx.save();
        ctx.rotate((spinAmount * index) * Math.PI / 180);
        ctx.translate(0, -180);
        ctx.fillText(item.number, -10, 0);
        ctx.restore();
    });
}

function spinWheel() {
    const spins = Math.floor(Math.random() * 5) + 5;
    const deg = Math.floor(Math.random() * 360);
    const rotation = deg + (360 * spins);
    wheelCanvas.style.transition = 'transform 3s ease-out';
    wheelCanvas.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        checkResult(rotation);
    }, 3000);
}

function checkResult(rotation) {
    const index = Math.floor((rotation % 360) / spinAmount);
    const result = numbers[index];
    let message = '';
    
    if (selectedBet === result.color || selectedBet === result.number) {
        balance += betAmount * 2;
        message = `🎉 Du vandt! Gevinst: ${betAmount * 2} kr! (${result.number}) 🎉`;
    } else {
        balance -= betAmount;
        message = `😞 Du tabte! (Resultat: ${result.number}) 😞`;
    }

    resultArea.innerHTML = message;
    balanceElement.innerHTML = balance;
}

betButtons.forEach(button => {
    button.addEventListener('click', function () {
        selectedBet = this.dataset.bet;
        betButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        betAmount = parseFloat(customBetInput.value) || 50;
    });
});

spinButton.addEventListener('click', function () {
    if (!selectedBet || betAmount <= 0 || betAmount > balance) {
        alert("Vælg en indsats og sørg for, at du har penge nok.");
        return;
    }

    spinWheel();
});

drawRouletteWheel();
