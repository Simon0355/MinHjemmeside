let balance = 1000; // Startbalance
let selectedBet = null;
let betAmount = 0;

const spinButton = document.getElementById('spin-btn');
const betButtons = document.querySelectorAll('.bet-option');
const balanceElement = document.getElementById('balance');
const resultArea = document.getElementById('result');
const customBetInput = document.getElementById('custom-bet');
const wheelCanvas = document.getElementById('roulette-wheel');
const ctx = wheelCanvas.getContext('2d');

// Roulette-felter og farver
const numbers = [
    { number: 0, color: '#000000' }, { number: 32, color: '#ff0000' }, { number: 15, color: '#000000' }, 
    { number: 19, color: '#ff0000' }, { number: 4, color: '#000000' }, { number: 21, color: '#ff0000' }, 
    { number: 2, color: '#00ff00' }, { number: 25, color: '#ff0000' }, { number: 17, color: '#000000' }, 
    { number: 34, color: '#ff0000' }, { number: 6, color: '#000000' }, { number: 27, color: '#ff0000' },
    { number: 13, color: '#000000' }, { number: 36, color: '#ff0000' }, { number: 11, color: '#000000' }, 
    { number: 30, color: '#ff0000' }, { number: 8, color: '#000000' }, { number: 23, color: '#ff0000' },
    { number: 10, color: '#000000' }, { number: 5, color: '#ff0000' }, { number: 24, color: '#000000' }, 
    { number: 16, color: '#ff0000' }, { number: 33, color: '#000000' }, { number: 1, color: '#ff0000' }
];

const spinAmount = 360 / numbers.length; // Vinkel for hvert felt

// Tegn roulettehjulet
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

// Opdater balancen
function updateBalance(amount) {
    balance += amount;
    balanceElement.textContent = balance;
}

// Spin hjulet
function spinWheel() {
    if (!selectedBet || !betAmount) {
        resultArea.innerHTML = `<span style="color: red;">Vælg en indsats og beløb!</span>`;
        return;
    }
    if (betAmount > balance) {
        resultArea.innerHTML = `<span style="color: red;">Ikke nok balance!</span>`;
        return;
    }

    const spins = Math.floor(Math.random() * 5) + 5; // Antal fulde spins
    const deg = Math.floor(Math.random() * 360); // Slutposition
    const rotation = deg + (360 * spins);

    wheelCanvas.style.transition = 'transform 3s ease-out';
    wheelCanvas.style.transform = `rotate(${rotation}deg)`;

    // Udregn resultat
    setTimeout(() => {
        const actualDeg = rotation % 360;
        const index = Math.floor(actualDeg / spinAmount);
        const result = numbers[index];
        resultArea.innerHTML = `Resultat: <strong>${result.number}</strong> (${result.color === '#ff0000' ? 'Rød' : result.color === '#000000' ? 'Sort' : 'Grøn'})`;

        // Tjek indsats og opdater balance
        let win = false;
        if ((selectedBet === 'red' && result.color === '#ff0000') ||
            (selectedBet === 'black' && result.color === '#000000') ||
            (selectedBet === 'odd' && result.number % 2 !== 0 && result.number !== 0) ||
            (selectedBet === 'even' && result.number % 2 === 0 && result.number !== 0)) {
            win = true;
        }

        if (win) {
            updateBalance(betAmount); // Gevinst (indsatsen fordobles)
            resultArea.innerHTML += `<br><span style="color: green;">Du vandt ${betAmount} kr!</span>`;
        } else {
            updateBalance(-betAmount); // Tab
            resultArea.innerHTML += `<br><span style="color: red;">Du tabte ${betAmount} kr!</span>`;
        }

        // Nulstil indsats
        selectedBet = null;
        betAmount = 0;
        betButtons.forEach(btn => btn.classList.remove('selected'));
        customBetInput.value = '';
    }, 3000);
}

// Håndter valg af indsats
betButtons.forEach(button => {
    button.addEventListener('click', function () {
        selectedBet = this.dataset.bet;
        betButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// Håndter indsatsbeløb
customBetInput.addEventListener('input', function () {
    betAmount = parseInt(this.value) || 0;
});

// Start spin
spinButton.addEventListener('click', spinWheel);

// Tegn roulettehjulet første gang
drawRouletteWheel();
