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
            <button id="back">
            <img src="images/back.svg" alt="back arrow">
            </button>
            <button id="exitGame">Выйти из игры</button>
        </div>
        <div id="info">
        <div id="score">
            <p>Ваш счет: 0</p>
            <p>Ваши попытки: 0</p>
        </div>
        <div id="start">
        </div>
    </div>
    `;

    document.body.innerHTML = newContent;

    const messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;

    document.getElementById('exitGame').addEventListener('click', function () {
        exitGame(login, password, gameID);
    });
    document.getElementById('back').addEventListener('click', function () {
        displayUserGames(login, password);
    });

    displaySMS(login, password, gameID);
    displayChips(login, password, gameID);
}

function displayWinMessage() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    const messageBox = document.createElement('div');
    messageBox.id = 'overlayMessage';
    messageBox.classList = 'win';
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
    if (overlay && document.getElementById('overlayMessage').classList != 'win')
        overlay.parentNode.removeChild(overlay);
}

function addChangeGameStatus(login, password, gameID) {
    const changeStatusButton = document.createElement('button');
    changeStatusButton.textContent = 'Сменить фазу';
    changeStatusButton.id = 'changeStatus';
    document.getElementById('start').innerHTML = '';
    document.getElementById('start').appendChild(changeStatusButton);

    changeStatusButton.addEventListener('click', () =>
        changeGameStatus(login, password, gameID)
    );
}

function removeChangeGameStatus() {
    const changeStatusButton = document.getElementById('changeStatus');
    if (changeStatusButton)
        changeStatusButton.parentNode.removeChild(changeStatusButton);
}

async function changeGameStatus(login, password, gameID) {
    fetchData('ChangeGameStatus', [login, password, gameID]);
}
