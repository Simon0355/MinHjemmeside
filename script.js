const wheelCanvas = document.getElementById("roulette-wheel");
const ctx = wheelCanvas.getContext("2d");
const spinBtn = document.getElementById("spin-btn");
const resultArea = document.getElementById("result-area");
const balanceElement = document.getElementById("balance");
const betAmountInput = document.getElementById("bet-amount");
const betRedBtn = document.getElementById("bet-red");
const betBlackBtn = document.getElementById("bet-black");
const betEvenBtn = document.getElementById("bet-even");
const betOddBtn = document.getElementById("bet-odd");

let balance = 1000; // Start balance
let betAmount = 0; // Indsats
let selectedBet = null; // Hvad spilleren satser på

// Roulletnumre med farver (for hvert nummer defineres farven)
const numbers = [
    { number: 0, color: "green" },
    { number: 1, color: "red" },
    { number: 2, color: "black" },
    { number: 3, color: "red" },
    { number: 4, color: "black" },
    { number: 5, color: "red" },
    { number: 6, color: "black" },
    { number: 7, color: "red" },
    { number: 8, color: "black" },
    { number: 9, color: "red" },
    { number: 10, color: "black" },
    { number: 11, color: "black" },
    { number: 12, color: "red" },
    { number: 13, color: "black" },
    { number: 14, color: "red" },
    { number: 15, color: "black" },
    { number: 16, color: "red" },
    { number: 17, color: "black" },
    { number: 18, color: "red" },
    { number: 19, color: "red" },
    { number: 20, color: "black" },
    { number: 21, color: "red" },
    { number: 22, color: "black" },
    { number: 23, color: "red" },
    { number: 24, color: "black" },
    { number: 25, color: "red" },
    { number: 26, color: "black" },
    { number: 27, color: "red" },
    { number: 28, color: "black" },
    { number: 29, color: "black" },
    { number: 30, color: "red" },
    { number: 31, color: "black" },
    { number: 32, color: "red" },
    { number: 33, color: "black" },
    { number: 34, color: "red" },
    { number: 35, color: "black" },
    { number: 36, color: "red" },
];

const spinAmount = 360 / numbers.length; // Antal grader pr. segment

function drawRouletteWheel() {
    const centerX = wheelCanvas.width / 2;
    const centerY = wheelCanvas.height / 2;
    const radius = 230;

    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

    numbers.forEach((item, index) => {
        const startAngle = index * (2 * Math.PI / numbers.length);
        const endAngle = (index + 1) * (2 * Math.PI / numbers.length);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
    });

    numbers.forEach((item, index) => {
        const angle = (index + 0.5) * (2 * Math.PI / numbers.length);
        const textX = centerX + (radius - 40) * Math.cos(angle);
        const textY = centerY + (radius - 40) * Math.sin(angle);

        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.number, textX, textY);
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
    const adjustedRotation = (rotation % 360) + spinAmount / 2;
    const index = Math.floor(adjustedRotation / spinAmount) % numbers.length;
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

// Bet buttons
betRedBtn.addEventListener("click", () => {
    selectedBet = "red";
    betAmount = parseInt(betAmountInput.value);
});

betBlackBtn.addEventListener("click", () => {
    selectedBet = "black";
    betAmount = parseInt(betAmountInput.value);
});

betEvenBtn.addEventListener("click", () => {
    selectedBet = "even";
    betAmount = parseInt(betAmountInput.value);
});

betOddBtn.addEventListener("click", () => {
    selectedBet = "odd";
    betAmount = parseInt(betAmountInput.value);
});

// Spin button
spinBtn.addEventListener("click", spinWheel);

// Initial wheel drawing
drawRouletteWheel();
