// Elementer fra HTML
const balanceElement = document.querySelector("#balance");
const indsatsInput = document.querySelector("#indsats");
const spinButton = document.querySelector("#spin");
const resultMessage = document.querySelector("#result-message");
const rouletteWheel = document.querySelector(".roulette-wheel");
const betButtons = document.querySelectorAll("button[data-bet]");

// Startbalance
let balance = 1000;
updateBalance();

// Roulettetal og farver
const numbers = [
  { value: 0, color: "green" },
  { value: 32, color: "red" },
  { value: 15, color: "black" },
  { value: 19, color: "red" },
  { value: 4, color: "black" },
  { value: 21, color: "red" },
  { value: 2, color: "black" },
  { value: 25, color: "red" },
  { value: 17, color: "black" },
  { value: 34, color: "red" },
  { value: 6, color: "black" },
  { value: 27, color: "red" },
  { value: 13, color: "black" },
  { value: 36, color: "red" },
  { value: 11, color: "black" },
  { value: 30, color: "red" },
  { value: 8, color: "black" },
  { value: 23, color: "red" },
  { value: 10, color: "black" },
  { value: 5, color: "red" },
  { value: 24, color: "black" },
  { value: 16, color: "red" },
  { value: 33, color: "black" },
  { value: 1, color: "red" },
  { value: 20, color: "black" },
  { value: 14, color: "red" },
  { value: 31, color: "black" },
  { value: 9, color: "red" },
  { value: 22, color: "black" },
  { value: 18, color: "red" },
  { value: 29, color: "black" },
  { value: 7, color: "red" },
  { value: 28, color: "black" },
  { value: 12, color: "red" },
  { value: 35, color: "black" },
  { value: 3, color: "red" },
  { value: 26, color: "black" },
];

// Når man trykker på spin-knappen
spinButton.addEventListener("click", () => {
  const indsats = parseInt(indsatsInput.value);

  // Tjek om indsats er gyldig
  if (isNaN(indsats) || indsats <= 0) {
    alert("Indtast en gyldig indsats!");
    return;
  }

  if (indsats > balance) {
    alert("Du har ikke nok penge til denne indsats!");
    return;
  }

  // Spin hjulet og få et tilfældigt resultat
  const randomDegree = Math.floor(Math.random() * 360);
  const winningNumber = calculateWinningNumber(randomDegree);

  // Vis animation af hjulet
  spinWheel(randomDegree);

  // Opdater resultat og balance
  setTimeout(() => {
    handleResult(winningNumber, indsats);
  }, 5000); // Match hjul-animationens varighed
});

// Tilføj aktiv klasse til bet-knapper
betButtons.forEach((button) => {
  button.addEventListener("click", () => {
    betButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// Funktion til at spinne hjulet
function spinWheel(degree) {
  rouletteWheel.style.transition = "transform 5s ease-out";
  rouletteWheel.style.transform = `rotate(${degree + 3600}deg)`; // 3600 tilføjes for flere spins
}

// Beregn hvilket nummer der vinder
function calculateWinningNumber(degree) {
  const sliceSize = 360 / numbers.length;
  const index = Math.floor((degree % 360) / sliceSize);
  return numbers[index];
}

// Håndter resultatet af spin
function handleResult(winningNumber, indsats) {
  const activeButton = document.querySelector("button.active");
  if (!activeButton) {
    alert("Du skal vælge en indsats (rød, sort, ulige, lige)!");
    return;
  }

  const betType = activeButton.dataset.bet;
  const isWin = checkWin(winningNumber, betType);

  if (isWin) {
    const winnings = indsats * 2;
    balance += winnings;
    resultMessage.textContent = `🎉 Du vandt! (Resultat: ${winningNumber.value}, ${winningNumber.color}) 🎉`;
  } else {
    balance -= indsats;
    resultMessage.textContent = `😢 Du tabte! (Resultat: ${winningNumber.value}, ${winningNumber.color}) 😢`;
  }

  updateBalance();
}

// Tjek om væddemålet vandt
function checkWin(winningNumber, betType) {
  switch (betType) {
    case "rød":
      return winningNumber.color === "red";
    case "sort":
      return winningNumber.color === "black";
    case "lige":
      return winningNumber.value !== 0 && winningNumber.value % 2 === 0;
    case "ulige":
      return winningNumber.value % 2 !== 0;
    default:
      return false;
  }
}

// Opdater balance på skærmen
function updateBalance() {
  balanceElement.textContent = `Balance: ${balance} kr`;
}
