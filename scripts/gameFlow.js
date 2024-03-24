function enterGameField(login, password, gameID, gamePhase) {
    displayGamePage(login, password, gameID);
    switch (gamePhase) {
        case 'waiting':
            waitingPhase(login, password, gameID);
            break;
        case 'guessing':
            guessingPhase(login, password, gameID);
            break;
        case 'ideas':
            ideasPhase(login, password, gameID);
            break;
        default:
            console.log('Unknown game phase');
    }
}

async function displayGamePage(login, password, gameID) {
    document.body.id = 'gamePage';
    document.body.className = '';

    const newContent = `
        <div id="symbols">
        </div>
        <div id="chat">
            <div>
                <h1>Чат</h1>
                <div id="messages">
                </div>
            </div>
        </div>
        <div id="exit">
            <button id="exitGame">Выйти из игры</button>
        </div>
        <div id="score">
            <p>Ваши баллы: 0</p>
        </div>
    `;

    document.body.innerHTML = newContent;

    const messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;

    document.getElementById('exitGame').addEventListener('click', function () {
        exitGame(login, password, gameID);
    });

    displaySMS(login, password, gameID);
    displayChips(login, password, gameID);
}

function displayWinMessage() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    const messageBox = document.createElement('div');
    messageBox.id = 'overlayMessage';
    messageBox.innerHTML = `
        <p>Вы угадали слово!</p>
        <button id="continueButton">Продолжить</button>
    `;

    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);

    document
        .getElementById('continueButton')
        .addEventListener('click', function () {
            document.body.removeChild(overlay);
        });
}

async function displayScore(login, password, gameID) {
    const data = await fetchData('displayScore', [login, password, gameID]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else {
        const score = document.getElementById('score');
        score.innerHTML = `<p>Ваши баллы: ${data['RESULTS'][0]['POINTS'][0]}</p>`;
    }
}

function displayWaitingScreen() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    const messageBox = document.createElement('div');
    messageBox.id = 'overlayMessage';
    messageBox.classList = 'waiting';
    messageBox.innerHTML = `
        <p>Ожидание игроков</p>
        <img src="images/waiting.gif" alt="waiting" />
    `;

    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);
}

function removeWaitingScreen() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.parentNode.removeChild(overlay);
    }
}
