async function isMaster(login, gameID) {
    let data = await fetchData('WhoIsMaster', [gameID]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else {
        data = data['RESULTS'][0];
        return data['MASTER'] == login;
    }
}

let masterFuncAdded = false;

async function addMasterFunc(login, password, gameID) {
    if (!(await isMaster(login, gameID))) return;
    if (masterFuncAdded) return;
    masterFuncAdded = true;
    const putChipsButton = document.createElement('button');
    putChipsButton.textContent = 'Поставить фишки';
    putChipsButton.id = 'putLabel';
    document.getElementById('exit').appendChild(putChipsButton);

    putChipsButton.addEventListener('click', () =>
        createSymbolsPage(login, password, gameID)
    );

    const startTurnButton = document.createElement('button');
    startTurnButton.textContent = 'Начать ход';
    startTurnButton.id = 'startMove';
    document.getElementById('start').appendChild(startTurnButton);

    startTurnButton.addEventListener('click', () =>
        beginIdeasPhase(login, password, gameID)
    );
}

async function masterAttempts(login, password, gameID) {
    const data = await fetchData('MasterAttempts', [login, password, gameID]);
    return data['RESULTS'][0]['ATTEMPTS'][0];
}

async function displayMasterMessage(login, password, gameID) {
    const prevOverlay = document.getElementById('overlay');
    if (prevOverlay) prevOverlay.parentNode.removeChild(prevOverlay);

    const wordData = await fetchData('CurrentWord', [login, password, gameID]);
    const word = wordData['RESULTS'][0]['WORD'][0];

    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    const messageBox = document.createElement('div');
    messageBox.id = 'overlayMessage';
    messageBox.classList = 'master';
    messageBox.innerHTML = `
            <p>Вы ведущий</p>
            <p>Ваше слово: ${word}</p>
            <button id="continueButton">Поставить фишки</button>
        `;

    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);

    document
        .getElementById('continueButton')
        .addEventListener('click', function () {
            document.body.removeChild(overlay);
            createSymbolsPage(login, password, gameID);
        });
}

function disableMasterFunc() {
    const putChipsButton = document.getElementById('putLabel');
    if (putChipsButton) putChipsButton.remove();

    const startTurnButton = document.getElementById('startMove');
    if (startTurnButton) startTurnButton.remove();
    masterFuncAdded = false;
}
