function displayGamePage(login, password, gameID) {
    document.body.id = 'gamePage';
    document.body.className = '';

    const newContent = `
        <div id="symbols">
        </div>
        <div id="chat">
            <div>
                <h1>Чат</h1>
                <div id="messages">
                </div>
            </div>
            <form>
                <input
                    type="text"
                    id="messageInput"
                    placeholder="Отправить сообщение" />
                <button id="sendButton">
                    <img src="images/send.svg" alt="send" />
                </button>
            </form>
        </div>
        <div id="exit">
            <button id="exitGame">Выйти из игры</button>
        </div>
        <div id="score">
            <p>Ваши баллы: 5</p>
        </div>
    `;

    document.body.innerHTML = newContent;

    // Automatically scroll the messages to the bottom
    const messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;

    document.getElementById('exitGame').addEventListener('click', function () {
        exitGame(login, password, gameID);
    });

    displaySMS(login, password, gameID);
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

    displayChips(login, password, gameID);
}

async function exitGame(login, password, gameID) {
    const data = await fetchData('leaveGame', [gameID, login, password]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else displayUserGames(login, password);
}

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
    else displaySMS(login, password, gameID);
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

async function isMaster(login, gameID) {
    let data = await fetchData('WhoIsMaster', [gameID]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else {
        data = data['RESULTS'][0];
        return data['MASTER'] == login;
    }
}
