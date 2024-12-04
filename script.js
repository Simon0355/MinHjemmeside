let balance = 1000; // Startbalance
let bet = 100; // Standard indsats
let betType = null; // Den type væddemål, der er placeret
let isSpinning = false; // Forhindrer flere spins på samme tid

// Event listeners for knapperne
document.getElementById("spinButton").addEventListener("click", spinWheel);
document.getElementById("redBet").addEventListener("click", () => placeBet("red"));
document.getElementById("blackBet").addEventListener("click", () => placeBet("black"));
document.getElementById("oddBet").addEventListener("click", () => placeBet("odd"));
document.getElementById("evenBet").addEventListener("click", () => placeBet("even"));
document.getElementById("bet").addEventListener("input", (e) => {
    bet = parseInt(e.target.value) || 0;
});

// Opdater balance på skærmen
function updateBalance() {
    document.getElementById("balance").textContent = `Balance: ${balance} kr`;
}

// Håndtering af væddemål
function placeBet(type) {
    if (isSpinning) return;
    betType = type;
    alert(`Du har placeret en indsats på: ${type}`);
}

// Spin-hjul funktion
function spinWheel() {
    if (isSpinning) return;
    if (bet <= 0 || bet > balance) {
        alert("Ugyldig indsats! Sørg for, at din indsats er inden for din balance.");
        return;
    }
    if (!betType) {
        alert("Placer en indsats først!");
        return;
    }

    isSpinning = true;
    let wheel = document.getElementById("wheel");
    let randomDegree = Math.floor(Math.random() * 360) + 1440; // Rotation med flere omgange
    let duration = 4; // Spinvarighed i sekunder

    // Start spin
    wheel.style.transition = `transform ${duration}s ease-out`;
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    // Vent til spin er færdigt
    setTimeout(() => {
        isSpinning = false;
        let finalDegree = randomDegree % 360;
        let result = getResult(finalDegree);

        checkBet(result);
        updateBalance();
        alert(`Resultatet er: ${result.number} (${result.color})`);
    }, duration * 1000);
}

// Find resultat baseret på rotation
function getResult(degree) {
    // Roulette-tal og farver
    const pockets = [
        { number: 0, color: "green" },
        { number: 32, color: "red" },
        { number: 15, color: "black" },
        { number: 19, color: "red" },
        { number: 4, color: "black" },
        { number: 21, color: "red" },
        { number: 2, color: "black" },
        { number: 25, color: "red" },
        { number: 17, color: "black" },
        { number: 34, color: "red" },
        { number: 6, color: "black" },
        { number: 27, color: "red" },
        { number: 13, color: "black" },
        { number: 36, color: "red" },
        { number: 11, color: "black" },
        { number: 30, color: "red" },
        { number: 8, color: "black" },
        { number: 23, color: "red" },
        { number: 10, color: "black" },
        { number: 5, color: "red" },
        { number: 24, color: "black" },
        { number: 16, color: "red" },
        { number: 33, color: "black" },
        { number: 1, color: "red" },
        { number: 20, color: "black" },
        { number: 14, color: "red" },
        { number: 31, color: "black" },
        { number: 9, color: "red" },
        { number: 22, color: "black" },
        { number: 18, color: "red" },
        { number: 29, color: "black" },
        { number: 7, color: "red" },
        { number: 28, color: "black" },
        { number: 12, color: "red" },
        { number: 35, color: "black" },
        { number: 3, color: "red" },
        { number: 26, color: "black" }
    ];

    // Hver sektor er 360 / 37 grader
    let sectorSize = 360 / pockets.length;
    let index = Math.floor(degree / sectorSize);
    return pockets[index];
}

// Tjek om væddemålet er vundet
function checkBet(result) {
    let win = false;

    if (betType === "red" && result.color === "red") win = true;
    else if (betType === "black" && result.color === "black") win = true;
    else if (betType === "odd" && result.number % 2 !== 0 && result.number !== 0) win = true;
    else if (betType === "even" && result.number % 2 === 0 && result.number !== 0) win = true;

    if (win) {
        balance += bet;
        alert("Du har vundet!");
    } else {
        balance -= bet;
        alert("Du har tabt!");
    }

    betType = null; // Nulstil væddemål
}
