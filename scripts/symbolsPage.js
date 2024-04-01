function createSymbolsPage(login, password, gameID) {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }

    setTimeout(function () {
        document.body.innerHTML = '';
        document.body.id = 'symbolsPage';

        const symbolsDiv = document.createElement('div');
        symbolsDiv.id = 'symbols';

        const iconNames = [
            'adult',
            'air',
            'airborne',
            'arm',
            'arts',
            'baby',
            'break',
            'broken',
            'building',
            'circle',
            'clothing',
            'cloud',
            'cone',
            'conflict',
            'cross',
            'cube',
            'curve',
            'cylinder',
            'date',
            'death',
            'defence',
            'ear',
            'earth',
            'electronics',
            'expression',
            'eye',
            'fabric',
            'fast',
            'female',
            'fictional',
            'fire',
            'flat',
            'flora',
            'food',
            'games',
            'grid',
            'head',
            'holidays',
            'hollow',
            'home',
            'huge',
            'idea',
            'inside',
            'joyous',
            'left',
            'leg',
            'life',
            'lightning',
            'literature',
            'location',
            'low',
            'male',
            'mechanical',
            'medical',
            'metal',
            'money',
            'mouth',
            'music',
            'night',
            'nose',
            'object',
            'opposed',
            'opposed2',
            'outside',
            'paper',
            'part',
            'person',
            'plastic',
            'power',
            'recreation',
            'rectangle',
            'religion',
            'right',
            'ring',
            'rock',
            'sad',
            'science',
            'sinusoidal',
            'slow',
            'small',
            'sphere',
            'spiral',
            'star',
            'straight',
            'sun',
            'tall',
            'televition',
            'theatre',
            'time',
            'title',
            'tools',
            'torso',
            'triangle',
            'turn',
            'unity',
            'use',
            'vehicle',
            'watercraft',
            'wildlife',
            'wood',
            'work',
            'zero',
        ];

        iconNames.forEach((iconName) => {
            const button = document.createElement('button');

            button.addEventListener('click', function () {
                addSymbol(login, password, gameID, iconName);
            });

            const img = document.createElement('img');
            img.src = `icons/${iconName}.svg`;
            img.alt = iconName;

            button.appendChild(img);

            symbolsDiv.appendChild(button);
        });

        document.body.appendChild(symbolsDiv);
        masterFuncAdded = false;
    }, 1000);
}

async function displayChips(login, password, gameID) {
    let data = await fetchData('displayGameChips', [login, password, gameID]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else {
        data = data['RESULTS'][0];
        const container = document.getElementById('symbols');
        container.innerHTML = '';
        for (let i = 0; i < data.image.length; i++) {
            const img = document.createElement('img');
            img.src = `icons/${data.image[i]}.svg`;
            img.alt = data.image[i];
            container.appendChild(img);
        }
    }
}

async function addSymbol(login, password, gameID, symbol) {
    let data = await fetchData('SetGameChips', [
        login,
        password,
        '.',
        'red',
        symbol,
        gameID,
    ]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    await displayGamePage(login, password, gameID);
    addMasterFunc(login, password, gameID);
}

async function exitSymbolsPage(login, password, gameID) {
    await displayGamePage(login, password, gameID);
    addMasterFunc(login, password, gameID);
    guessingPhase(login, password, gameID);
}
