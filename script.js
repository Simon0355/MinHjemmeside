let balance = 1000;
let selectedBet = null;

const spinButton = document.getElementById('spin-button');
const betButtons = document.querySelectorAll('.bet-btn');
const balanceElement = document.getElementById('balance');
const resultArea = document.getElementById('result-area');
const wheel = document.getElementById('wheel');

// Bet handling
betButtons.forEach(button => {
    button.addEventListener('click', function () {
        selectedBet = this.dataset.bet;
        resetBetButtons();
        this.classList.add('selected');
    });
});

// Spin button functionality
spinButton.addEventListener('click', function () {
    if (!selectedBet) {
        alert("Vælg en indsats!");
        return;
    }

    // Simulere hjulspin med en dynamisk roterende effekt
    let spinAmount = Math.floor(Math.random() * 360) + 360 * 3; // 3 spins
    wheel.style.transform = `rotate(${spinAmount}deg)`;

    // Simulere resultat efter hjulspinning
    setTimeout(() => {
        const result = getResult(spinAmount);
        displayResult(result);
    }, 2500);
});

// Beregn resultat ud fra spin
function getResult(spinAmount) {
    let segment = Math.floor((spinAmount % 360) / 120);
    return ['red', 'black', 'green'][segment];
}

// Vis resultat og opdater balancen
function displayResult(result) {
    const winAmount = 100; // Vinderlogik
    if (result === selectedBet) {
        balance += winAmount;
        resultArea.innerHTML = `🎉 Du vandt! Gevinst: ${winAmount} kr! (${result}) 🎉`;
    } else {
        balance -= 50; // Tabte indsats
        resultArea.innerHTML = `😞 Du tabte! (Resultat: ${result}) 😞`;
    }
    balanceElement.textContent = balance;
}

// Nulstil indsats-knapper
function resetBetButtons() {
    betButtons.forEach(button => button.classList.remove('selected'));
}
