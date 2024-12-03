// Elementer og initialisering
const spinButton = document.getElementById('spin-button');
const betAmountInput = document.getElementById('bet-amount');
const rouletteWheel = document.getElementById('roulette-wheel');
const balanceAmount = document.getElementById('balance-amount');
const resultArea = document.getElementById('result-message');
const betChoiceButtons = document.querySelectorAll('.bet');
let balance = 1000;
let betChoice = null;
let betAmount = 0;
let wheelSpinning = false;

// Roulette wheel data
const wheelSegments = [
  { number: 0, color: 'green' },
  { number: 32, color: 'red' },
  { number: 15, color: 'black' },
  // Flere tal og farver kan tilføjes her...
];

// Dynamisk opbygning af roulette-hjulet
function createWheel() {
  const anglePerSegment = 360 / wheelSegments.length;
  wheelSegments.forEach((segment, index) => {
    const angleStart = anglePerSegment * index;
    const angleEnd = anglePerSegment * (index + 1);
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M200,200 L${200 + 150 * Math.cos(Math.PI * angleStart / 180)},${200 + 150 * Math.sin(Math.PI * angleStart / 180)} A150,150 0 ${anglePerSegment > 180 ? 1 : 0},1 ${200 + 150 * Math.cos(Math.PI * angleEnd / 180)},${200 + 150 * Math.sin(Math.PI * angleEnd / 180)} Z`);
    path.setAttribute('fill', segment.color);
    rouletteWheel.appendChild(path);

    // Lægger nummeret på hjulet
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', 200 + 120 * Math.cos(Math.PI * (angleStart + angleEnd) / 360));
    text.setAttribute('y', 200 + 120 * Math.sin(Math.PI * (angleStart + angleEnd) / 360));
    text.setAttribute('fill', 'white');
    text.setAttribute('font-size', '14');
    text.setAttribute('text-anchor', 'middle');
    text.textContent = segment.number;
    rouletteWheel.appendChild(text);
  });
}

// Spin hjulet
function spinWheel() {
  if (wheelSpinning) return;
  wheelSpinning = true;

  // Spillerens indsats
  betAmount = parseInt(betAmountInput.value, 10);
  if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
    alert("Indtast et gyldigt beløb!");
    return;
  }

  balance -= betAmount;
  balanceAmount.textContent = balance;

  // Rotation af hjulet
  const randomAngle = Math.floor(Math.random() * 360);
  const totalRotation = 5 * 360 + randomAngle;
  
  rouletteWheel.style.transition = 'transform 5s ease-out';
  rouletteWheel.style.transform = `rotate(${totalRotation}deg)`;

  // Bestem resultat
  setTimeout(() => {
    const winningSegment = wheelSegments[Math.floor(((randomAngle + 180) % 360) / (360 / wheelSegments.length))];
    resultArea.textContent = `Resultat: ${winningSegment.number} (${winningSegment.color})`;
    updateBalance(winningSegment);
    wheelSpinning = false;
  }, 5000); 
}

// Opdater balance og resultater
function updateBalance(winningSegment) {
  if (betChoice === winningSegment.color) {
    balance += betAmount * 2;
    resultArea.textContent += " Du vandt!";
  } else {
    resultArea.textContent += " Du tabte.";
  }
  balanceAmount.textContent = balance;
}

// Håndter klik på bet-knapper
betChoiceButtons.forEach(button => {
  button.addEventListener('click', () => {
    betChoice = button.getAttribute('data-bet');
    betChoiceButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});

// Klik på spin-knap
spinButton.addEventListener('click', spinWheel);

// Initialisering af roulette-hjulet
createWheel();
