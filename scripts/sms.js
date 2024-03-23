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
    const data = await fetchData('sendSMS', [message, login, password, gameID]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else if (Object.keys(data['RESULTS'][0])[0] == 'WIN') {
        displayWinMessage();
        displayScore(login, password, gameID);
    } else displaySMS(login, password, gameID);
}

function enableSMS(login, password, gameID) {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
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

function disableSMS() {
    const sendButton = document.getElementById('sendButton');
    const sendButtonClone = sendButton.cloneNode(true);
    sendButton.parentNode.replaceChild(sendButtonClone, sendButton);
}
