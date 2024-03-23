function createSymbolsPage(login, password, gameID) {
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
        'clear',
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
        'fragment',
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
        'paper',
        'part',
        'person',
        'plastic',
        'power',
        'pyramid',
        'reality',
        'recreation',
        'rectangle',
        'religion',
        'right',
        'ring',
        'rock',
        'sad',
        'science',
        'sinusoidal',
        'skinny',
        'slow',
        'small',
        'sphere',
        'spiral',
        'star',
        'straight',
        'sun',
        'tall',
        'television',
        'theatre',
        'time',
        'title',
        'tools',
        'top',
        'torso',
        'triangle',
        'turn',
        'unity',
        'use',
        'vehicle',
        'water',
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
        img.src = `icons/${iconName}.png`;
        img.alt = iconName;

        button.appendChild(img);

        symbolsDiv.appendChild(button);
    });

    document.body.appendChild(symbolsDiv);
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
            img.src = `icons/${data.image[i]}.png`;
            img.alt = data.image[i];
            container.appendChild(img);
        }
    }
}

async function addSymbol(login, password, gameID, symbol) {
    let data = await fetchData('addChip', [login, password, gameID, symbol]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    displayGamePage(login, password, gameID);
}
