function displayGamePage(login, password, gameID) {
    document.body.id = 'gamePage';
    document.body.className = '';

    const newContent = `
        <div id="symbols">
            <img src="images/placeholder.svg" alt="icon" />
            <img src="images/placeholder.svg" alt="icon" />
            <img src="images/placeholder.svg" alt="icon" />
            <img src="images/placeholder.svg" alt="icon" />
            <img src="images/placeholder.svg" alt="icon" />
            <img src="images/placeholder.svg" alt="icon" />
            <img src="images/placeholder.svg" alt="icon" />
            <img src="images/placeholder.svg" alt="icon" />
            <img src="images/placeholder.svg" alt="icon" />
            <img src="images/placeholder.svg" alt="icon" />
            <img src="images/placeholder.svg" alt="icon" />
            <img src="images/placeholder.svg" alt="icon" />
        </div>
        <div id="chat">
            <div>
                <h1>Чат</h1>
                <div id="messages">
                    <p>рыба</p>
                    <p>корреспондент</p>
                    <p>редакция</p>
                    <p class="my">министр</p>
                    <p>Вы угадали слово!</p>
                    <p>рыба</p>
                    <p>корреспондент</p>
                    <p>редакция</p>
                    <p class="my">министр</p>
                    <p>Вы угадали слово!</p>
                    <p>рыба</p>
                    <p>корреспондент</p>
                    <p>редакция</p>
                    <p class="my">министр</p>
                    <p>Вы угадали слово!</p>
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
}

async function exitGame(login, password, gameID) {
    const data = await fetchData('leaveGame', [gameID, login, password]);
    if (Object.keys(data)[0] == 'ERROR') console.log(data['ERROR']);
    else displayUserGames(login, password);
}
