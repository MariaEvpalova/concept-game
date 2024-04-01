async function displaySMS(login, password, gameID) {
    let data = await fetchData('ViewSmsHistory', [gameID]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    data = data['RESULTS'][0];

    const messagesElement = document.getElementById('messages');
    messagesElement.innerHTML = '';

    for (let i = 0; i < data.SendDateTime.length; i++) {
        const message = document.createElement('p');
        message.textContent = data['massage'][i];
        if (data['userName'][i] == login) message.className = 'my';
        messagesElement.appendChild(message);
    }
}

async function sendSMS(message, login, password, gameID) {
    const data = await fetchData('SMSSend', [message, login, password, gameID]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else if (Object.keys(data['RESULTS'][0])[0] == 'WIN') {
        displayWinMessage();
        displayScore(login, password, gameID);
        displayAttempts(login, password, gameID);
    } else {
        displaySMS(login, password, gameID);
        displayAttempts(login, password, gameID);
        guessingPhase(login, password, gameID);
    }
}

function enableSMS(login, password, gameID) {
    if (!document.querySelector('form')) {
        const chatDiv = document.getElementById('chat');

        const form = document.createElement('form');
        const messageInput = document.createElement('input');
        const sendButton = document.createElement('button');
        const sendIcon = document.createElement('img');

        messageInput.type = 'text';
        messageInput.id = 'messageInput';
        messageInput.placeholder = 'Отправить сообщение';

        sendButton.id = 'sendButton';

        sendIcon.src = 'images/send.svg';
        sendIcon.alt = 'send';

        sendButton.appendChild(sendIcon);
        form.appendChild(messageInput);
        form.appendChild(sendButton);
        chatDiv.appendChild(form);

        sendButton.addEventListener('click', function (event) {
            event.preventDefault();

            const message = messageInput.value;
            if (message.trim() !== '') {
                sendSMS(message, login, password, gameID);
                messageInput.value = '';
            } else {
                console.log('Message is empty.');
            }
        });
    }
}

function disableSMS() {
    const chatDiv = document.getElementById('chat');
    const form = chatDiv.querySelector('form');
    if (form) {
        form.remove();
    }
}

async function displayScore(login, password, gameID) {
    const data = await fetchData('displayScore', [login, password, gameID]);
    if (Object.keys(data)[0] == 'ERROR') {
        console.log(data['ERROR']);
    } else {
        const scoreDiv = document.getElementById('score');
        let scoreP = scoreDiv.querySelector('p:first-child');
        if (!scoreP) {
            scoreP = document.createElement('p');
            scoreDiv.insertBefore(scoreP, scoreDiv.firstChild);
        }
        scoreP.innerHTML = `Ваш счет: ${data['RESULTS'][0]['POINTS'][0]}`;
    }
}

async function displayAttempts(login, password, gameID) {
    let data;
    if (await isMaster(login, gameID))
        data = await fetchData('MasterAttempts', [login, password, gameID]);
    else data = await fetchData('displayAttempts', [login, password, gameID]);

    if (Object.keys(data)[0] == 'ERROR') {
        console.log(data['ERROR']);
    } else {
        const scoreDiv = document.getElementById('score');
        let attemptsP = scoreDiv.querySelector('p:nth-child(2)');
        if (!attemptsP) {
            attemptsP = document.createElement('p');
            if (scoreDiv.children[0]) {
                scoreDiv.insertBefore(attemptsP, scoreDiv.children[1]);
            } else {
                scoreDiv.appendChild(attemptsP);
            }
        }
        attemptsP.innerHTML = `Ваши попытки: ${data['RESULTS'][0]['ATTEMPTS'][0]}`;
    }
}
