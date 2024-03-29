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

async function guessingPhase(login, password, gameID) {
    disableSMS();
    await displayScore(login, password, gameID);
    await displayAttempts(login, password, gameID);
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    removeWaitingScreen();

    if (await isMaster(login, gameID)) addMasterFunc(login, password, gameID);

    intervalId = setInterval(async () => {
        displayChips(login, password, gameID);
        if ((await currentPhase(gameID)) == 'ideas')
            ideasPhase(login, password, gameID);
    }, 1000);
}

async function beginIdeasPhase(login, password, gameID) {
    let data = await fetchData('ChangeGameStatus', [login, password, gameID]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else {
        ideasPhase(login, password, gameID);
    }
}

async function ideasPhase(login, password, gameID) {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    intervalId = setInterval(async () => {
        displaySMS(login, password, gameID);
        if ((await currentPhase(gameID)) == 'guessing')
            guessingPhase(login, password, gameID);
    }, 1000);

    if (!(await isMaster(login, gameID))) enableSMS(login, password, gameID);
    else disableMasterFunc();
}

async function exitGame(login, password, gameID) {
    const data = await fetchData('leaveGame', [gameID, login, password]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
        displayUserGames(login, password);
    }
}

/*
    if (intervalId === null) {
        // Prevent multiple intervals from being created
        intervalId = setInterval(() => {
            console.log('This function is executed every 1 second');
        }, 1000);
        console.log('Interval started.');
    }
*/
/*
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null; // Reset the intervalId
        console.log('Interval stopped.');
    }
*/
