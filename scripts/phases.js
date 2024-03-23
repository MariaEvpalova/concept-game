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
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    removeWaitingScreen();

    if (await isMaster(login, gameID)) {
        addMasterFunc(login, password, gameID);
    } else {
        if (intervalId === null) {
            intervalId = setInterval(async () => {
                displayChips(login, password, gameID);
                if (phase == 'waiting') ideasPhase(login, password, gameID);
            }, 1000);
        }
    }
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
        intervalId = setInterval(() => {
            displaySMS(login, password, gameID);
        }, 1000);
    }
    if (!(await isMaster(login, gameID))) enableSMS(login, password, gameID);
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
