/* Generelle stilarter */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Helvetica Neue', sans-serif;
    background-color: #1c2541; /* Mørkeblå baggrund */
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
}

.container {
    text-align: center;
    width: 100%;
    max-width: 1000px; /* Øget bredde til MacBook-skærme */
    margin: 0 auto;
}

header {
    margin-bottom: 20px;
}

header h1 {
    font-size: 3rem;
    color: #ff6347;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.balance {
    font-size: 1.2rem;
    color: #aaa;
    margin-top: 10px;
}

main {
    background-color: #1c1c1c;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
    width: 100%;
    max-width: 900px; /* Max bredde for at sikre god visning på MacBook */
}

.wheel-container {
    position: relative;
    margin-bottom: 30px;
    width: 100%;
    max-width: 600px; /* Roulettehjulet tilpasset skærmen */
    margin-left: auto;
    margin-right: auto;
}

#roulette-wheel {
    border-radius: 50%;
    border: 8px solid #222;
    margin-bottom: 20px;
    max-width: 100%;
}

.pointer {
    position: absolute;
    top: 50%; /* Flyt pilen til bunden af rouletten */
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    width: 20px;
    height: 40px;
    background-color: #f1c40f;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    z-index: 10;
}

button {
    padding: 15px 30px;
    font-size: 1.2rem;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #c0392b;
}

.bet-options {
    margin-top: 20px;
}

.bet-option {
    padding: 12px 25px;
    background-color: #34495e;
    font-size: 1.1rem;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
    transition: background-color 0.3s ease;
}

.bet-option.selected {
    background-color: #27ae60;
    color: white;
}

input[type="number"] {
    padding: 10px;
    margin-top: 15px;
    width: 150px;
    font-size: 1rem;
    text-align: center;
    border-radius: 5px;
    border: none;
}

.result {
    font-size: 1.5rem;
    margin-top: 20px;
    color: #f1c40f;
}
