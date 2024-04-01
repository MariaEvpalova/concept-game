async function currentPhase(gameID) {
    const data = await fetchData('currentGamePhase', [gameID]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else return data['RESULTS'][0]['PHASE'][0];
}

let intervalId = null;

function waitingPhase(login, password, gameID) {
    displayWaitingScreen();
    if (intervalId === null) {
        intervalId = setInterval(async () => {
            const phase = await currentPhase(gameID);
            if (phase == 'guessing') guessingPhase(login, password, gameID);
        }, 1000);
    }
}

let guessingEntered = false;

async function guessingPhase(login, password, gameID) {
    if (guessingEntered) return;

    guessingEntered = true;

    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    removeChangeGameStatus();
    disableSMS();
    await displayScore(login, password, gameID);
    await displayAttempts(login, password, gameID);
    removeWaitingScreen();

    if (await isMaster(login, gameID)) {
        addMasterFunc(login, password, gameID);
        const attempts = await masterAttempts(login, password, gameID);
        if (attempts == 0 || attempts == 1)
            displayMasterMessage(login, password, gameID);
    }

    intervalId = setInterval(async () => {
        displayChips(login, password, gameID);
        if ((await currentPhase(gameID)) == 'ideas')
            ideasPhase(login, password, gameID);
    }, 1000);
}

async function beginIdeasPhase(login, password, gameID) {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    let data = await fetchData('ChangeGameStatus', [login, password, gameID]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else {
        ideasPhase(login, password, gameID);
    }
}

async function ideasPhase(login, password, gameID) {
    guessingEntered = false;

    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    disableMasterFunc();
    intervalId = setInterval(async () => {
        displaySMS(login, password, gameID);
        if ((await currentPhase(gameID)) == 'guessing')
            guessingPhase(login, password, gameID);
    }, 1000);
    if (!(await isMaster(login, gameID))) {
        enableSMS(login, password, gameID);
        addChangeGameStatus(login, password, gameID);
    } else {
        displayAttempts(login, password, gameID);
    }
}

async function exitGame(login, password, gameID) {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    const data = await fetchData('leaveGame', [gameID, login, password]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else {
        displayUserGames(login, password);
    }
}
