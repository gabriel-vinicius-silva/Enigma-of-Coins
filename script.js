let coins = 50; // Moedas iniciais
let attempts = [];
let randomNumber = 0; // Número aleatório
const messageContainer = document.getElementById("message-container");
const coinsDisplay = document.getElementById("coins-display");
const attemptsList = document.getElementById("attempts-list");
const gameSection = document.getElementById("game-section");

coinsDisplay.textContent = `💰 Moedas: ${coins}`;

function startGame() {
    const min = parseInt(document.getElementById("min").value);
    const max = parseInt(document.getElementById("max").value);

    // Gera um número aleatório
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Limpa tentativas e mostra a seção de jogo
    attempts = [];
    attemptsList.innerHTML = "";
    messageContainer.textContent = "";
    gameSection.style.display = "block"; // Mostra a seção de jogo
}

function makeGuess() {
    const guessedNumber = parseInt(document.getElementById("guess").value);

    if (isNaN(guessedNumber)) {
        showMessage("📉 Insira um número válido!");
        return;
    }

    if (attempts.includes(guessedNumber)) {
        showMessage("🔄 Você já tentou esse número!");
        return;
    }

    if (coins <= 0) {
        showMessage("😞 Você não tem mais moedas! Reinicie o jogo.");
        return;
    }

    attempts.push(guessedNumber);
    
    coins -= 1; // Gasta uma moeda para jogar
    coinsDisplay.textContent = `💰 Moedas: ${coins}`;

    if (guessedNumber === randomNumber) {
        let reward = calculateReward(attempts.length, Math.abs(randomNumber - parseInt(document.getElementById("min").value)));
        coins += reward; // Adiciona a recompensa
        coinsDisplay.textContent = `💰 Moedas: ${coins}`;
        showMessage(`🎉 Você adivinhou! O número era ${randomNumber}. Recompensa: ${reward} moedas!`);
        randomNumber = 0; // Reinicia o jogo
        gameSection.style.display = "none"; // Oculta a seção de jogo
    } else {
        showMessage(`😞 Erro! Tente novamente.`);
    }

    updateAttempts();
}

function calculateReward(attemptsLength, range) {
    let baseReward = 0;
    if (range > 1000) {
        baseReward = 50;
    } else if (range > 100) {
        baseReward = 20;
    } else {
        baseReward = 5;
    }

    // Recompensa maior para menos tentativas
    return Math.max(0, baseReward - attemptsLength);
}

function showMessage(message) {
    messageContainer.textContent = message;
}

function updateAttempts() {
    attemptsList.innerHTML = ""; // Limpa a lista atual
    attempts.forEach(attempt => {
        const li = document.createElement("li");
        li.textContent = `🔢 Tentativa: ${attempt}`;
        attemptsList.appendChild(li);
    });
}
