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

function disableSMS() {
    const chatDiv = document.getElementById('chat');
    const form = chatDiv.querySelector('form');
    if (form) {
        form.remove();
    }
}
