let balance = 1000;
let selectedBet = null;
let betAmount = 0;

const spinButton = document.getElementById('spin-btn');
const betButtons = document.querySelectorAll('.bet-option');
const balanceElement = document.getElementById('balance');
const resultArea = document.getElementById('result-area');
const wheelCanvas = document.getElementById('roulette-wheel');
const customBetInput = document.getElementById('custom-bet');

// Bet handling
betButtons.forEach(button => {
    button.addEventListener('click', function () {
        selectedBet = this.dataset.bet;
        resetBetButtons();
        this.classList.add('selected');
        betAmount = parseFloat(customBetInput.value) || 50; // Default bet if empty
    });
});

// Spin button functionality
spinButton.addEventListener('click', function () {
    if (!selectedBet) {
        alert("Vælg en indsats!");
        return;
    }

    if (betAmount <= 0 || betAmount > balance) {
        alert("Ugyldigt beløb. Sørg for at du har penge nok.");
        return;
    }

    // Simulere hjulspin med en dynamisk roterende effekt
    let spinAmount = Math.floor(Math.random() * 360) + 360 * 3; // 3 spins
    spinWheel(spinAmount);

    // Subtract the bet amount from balance
    balance -= betAmount;
    balanceElement.textContent = balance;

    // Simulere resultat efter hjulspinning
    setTimeout(() => {
        const result = getResult(spinAmount);
        displayResult(result);
    }, 2500);
});

// Wheel spin animation
function spinWheel(degrees) {
    wheelCanvas.style.transition = 'transform 2s ease-out';
    wheelCanvas.style.transform = `rotate(${degrees}deg)`;
}

// Calculate result based on spin
function getResult(spinAmount) {
    let segment = Math.floor((spinAmount % 360) / 120);
    return ['red', 'black', 'green'][segment];
}

// Display result and update balance
function displayResult(result) {
    const winAmount = betAmount * 2; // Vinderlogik
    if (result === selectedBet) {
        balance += winAmount;
        resultArea.innerHTML = `🎉 Du vandt! Gevinst: ${winAmount} kr! (${result}) 🎉`;
    } else {
        resultArea.innerHTML = `😞 Du tabte! (Resultat: ${result}) 😞`;
    }
    balanceElement.textContent = balance;
}

// Reset bet buttons
function resetBetButtons() {
    betButtons.forEach(button => button.classList.remove('selected'));
}
