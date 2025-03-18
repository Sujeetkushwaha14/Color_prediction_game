let timer;
let timeLeft = 30;
let selectedColor = '';
let betAmount = 0;
let gameLog = [];
let gameCount = 0;
let playerName = '';
let playerBalance = 0;
let adminBalance = 0;
let bets = [];

function initializeGame() {
    playerName = document.getElementById('playerName').value;
    playerBalance = parseFloat(document.getElementById('initialBalance').value);
    if (!playerName || isNaN(playerBalance) || playerBalance <= 0) {
        alert('Please enter a valid name and initial balance.');
        return;
    }
    document.getElementById('balance').innerText = `Player: ${playerName}, Balance: $${playerBalance}`;
}

function rechargeBalance() {
    const rechargeAmount = parseFloat(document.getElementById('rechargeAmount').value);
    if (isNaN(rechargeAmount) || rechargeAmount <= 0) {
        alert('Please enter a valid recharge amount.');
        return;
    }
    playerBalance += rechargeAmount;
    document.getElementById('balance').innerText = `Player: ${playerName}, Balance: $${playerBalance}`;
    document.getElementById('rechargeAmount').value = '';
}

function selectColor(color) {
    selectedColor = color;
    document.getElementById('betAmountContainer').style.display = 'block';
}

function selectBetAmount(amount) {
    betAmount += amount;
    document.getElementById('selectedBetAmount').innerText = betAmount;
}

function confirmBetAmount() {
    if (betAmount <= 0 || betAmount > playerBalance) {
        alert('Please select a valid bet amount within your balance.');
        return;
    }
    bets.push({ player: playerName, color: selectedColor, amount: betAmount });
    updateBetList();
    updateTotalBetAmount();
    document.getElementById('betAmountContainer').style.display = 'none';
    betAmount = 0;
    document.getElementById('selectedBetAmount').innerText = betAmount;
}

function goBack() {
    betAmount = 0;
    document.getElementById('selectedBetAmount').innerText = betAmount;
    document.getElementById('betAmountContainer').style.display = 'none';
}

function updateBetList() {
    const betListItems = document.getElementById('betListItems');
    betListItems.innerHTML = '';
    bets.forEach(bet => {
        const li = document.createElement('li');
        li.innerText = `${bet.player} bet $${bet.amount} on ${bet.color}`;
        betListItems.appendChild(li);
    });
}

function updateTotalBetAmount() {
    const totalBetAmount = bets.reduce((total, bet) => total + bet.amount, 0);
    document.getElementById('totalBetAmount').innerText = `Total Bet Amount: $${totalBetAmount}`;
}

function startGame() {
    document.getElementById('result').innerText = '';
    timeLeft = 30;
    document.getElementById('timer').innerText = timeLeft;
    timer = setInterval(countdown, 1000);
}

function countdown() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        checkResult();
        setTimeout(startGame, 2000); // Auto-restart after 2 seconds
    } else {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
    }
}

function checkResult() {
    const colors = ['red', 'green'];
    const winningColor = colors[Math.floor(Math.random() * colors.length)];
    let resultText = `The winning color is ${winningColor}. `;
    if (bets.length === 0) {
        resultText += 'No bets were placed.';
    } else {
        bets.forEach(bet => {
            if (bet.color === winningColor) {
                const winAmount = bet.amount * 2;
                const adminCharge = winAmount * 0.1;
                const playerWinAmount = winAmount - adminCharge;
                playerBalance += playerWinAmount;
                adminBalance += adminCharge;
                resultText += `${bet.player} won $${playerWinAmount} (after 10% admin charge). `;
            } else {
                playerBalance -= bet.amount;
                resultText += `${bet.player} lost $${bet.amount}. `;
            }
        });
    }
    document.getElementById('result').innerText = resultText;
    document.getElementById('balance').innerText = `Player: ${playerName}, Balance: $${playerBalance}`;
    document.getElementById('adminBalance').innerText = `Admin Balance: $${adminBalance}`;
    logResult(resultText);
    bets = [];
    updateBetList();
    updateTotalBetAmount();
}

function logResult(resultText) {
    gameCount++;
    gameLog.push(`Game ${gameCount}: ${resultText}`);
    document.getElementById('log').innerText = gameLog.join('\n');
}