async function isMaster(login, gameID) {
    let data = await fetchData('WhoIsMaster', [gameID]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else {
        data = data['RESULTS'][0];
        return data['MASTER'] == login;
    }
}

function addMasterFunc(login, password, gameID) {
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
    document.getElementById('score').appendChild(startTurnButton);

    startTurnButton.addEventListener('click', () =>
        beginIdeasPhase(login, password, gameID)
    );
}

function disableMasterFunc() {
    const putChipsButton = document.getElementById('putLabel');
    if (putChipsButton) putChipsButton.remove();

    const startTurnButton = document.getElementById('startMove');
    if (startTurnButton) startTurnButton.remove();
}
