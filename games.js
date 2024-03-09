async function displayUserGames(login, password) {
    document.body.innerHTML = '';
    document.body.id = 'games';

    const gamesPageContent = `
            <header>
                <h1>Мои игры</h1>
                <div>
                    <button id="allGames">Все игры</button>
                    <button id="createGame">Создать игру</button>
                    <button id="logout">Выйти</button>
                </div>
            </header>
            <main>
            </main>
        `;

    document.body.innerHTML = gamesPageContent;

    document
        .getElementById('allGames')
        .addEventListener('click', () =>
            displayAvailableGames(login, password)
        );

    document
        .getElementById('createGame')
        .addEventListener('click', () => createGame(login, password));

    document
        .getElementById('logout')
        .addEventListener('click', () => logout(login, password));

    try {
        const userGamesData = await fetchData('getUserGames', [
            login,
            password,
        ]);
        const games = userGamesData['RESULTS'][0];

        const mainElement = document.querySelector('main');
        const numberOfGames = games.gameID.length;
        for (let i = 0; i < numberOfGames; i++) {
            const gameElement = document.createElement('div');
            gameElement.className = 'game';

            gameElement.innerHTML = `
                    <div class="data">
                        <div class="deadline">
                            <h2>Начало</h2>
                            <p>${games.startTime[i]}</p>
                        </div>
                        <div class="difficulty">
                            <h2>Сложность</h2>
                            <p>${games.difficulty[i]}</p>
                        </div>
                        <div class="turnTime">
                            <h2>Продолжительность</h2>
                            <p>${games.duration[i]} мин</p>
                        </div>
                        <div class="tries">
                            <h2>Баллы</h2>
                            <p>${games.points[i]}</p>
                        </div>
                        <div class="numPlayers">
                            <h2>Игроки</h2>
                            <p>${games.maxPlayers[i]}</p>
                        </div>
                        <div class="creator">
                            <h2>Создатель</h2>
                            <p>${games.creator[i]}</p>
                        </div>
                    </div>
                `;

            const joinButton = document.createElement('button');
            joinButton.className = 'join';
            joinButton.textContent = 'Присоединиться к игре';
            joinButton.addEventListener('click', () =>
                enterGame(login, password, games.gameID[i])
            );

            gameElement.appendChild(joinButton);

            mainElement.appendChild(gameElement);
        }
    } catch (error) {
        console.error('Failed to fetch user games:', error);
    }
}

async function displayAvailableGames(login, password) {
    document.body.innerHTML = '';
    document.body.id = 'games';

    const gamesPageContent = `
            <header>
                <h1>Доступные игры</h1>
                <div>
                    <button id="userGames">Мои игры</button>
                    <button id="createGame">Создать игру</button>
                    <button id="logout">Выйти</button>
                </div>
            </header>
            <main>
            </main>
        `;

    document.body.innerHTML = gamesPageContent;

    document
        .getElementById('userGames')
        .addEventListener('click', () => displayUserGames(login, password));

    document
        .getElementById('createGame')
        .addEventListener('click', () => createGame(login, password));

    document
        .getElementById('logout')
        .addEventListener('click', () => logout(login, password));

    try {
        const userGamesData = await fetchData('getOthersGames', [
            login,
            password,
        ]);
        const games = userGamesData['RESULTS'][0];

        const mainElement = document.querySelector('main');
        const numberOfGames = games.gameID.length;
        for (let i = 0; i < numberOfGames; i++) {
            const gameElement = document.createElement('div');
            gameElement.className = 'game';

            gameElement.innerHTML = `
                    <div class="data">
                        <div class="deadline">
                            <h2>Начало</h2>
                            <p>${games.startTime[i]}</p>
                        </div>
                        <div class="difficulty">
                            <h2>Сложность</h2>
                            <p>${games.difficulty[i]}</p>
                        </div>
                        <div class="turnTime">
                            <h2>Продолжительность</h2>
                            <p>${games.duration[i]} мин</p>
                        </div>
                        <div class="tries">
                            <h2>Баллы</h2>
                            <p>${games.points[i]}</p>
                        </div>
                        <div class="numPlayers">
                            <h2>Игроки</h2>
                            <p>${games.maxPlayers[i]}</p>
                        </div>
                        <div class="creator">
                            <h2>Создатель</h2>
                            <p>${games.creator[i]}</p>
                        </div>
                    </div>
                `;

            const joinButton = document.createElement('button');
            joinButton.className = 'join';
            joinButton.textContent = 'Присоединиться к игре';
            joinButton.addEventListener('click', () =>
                enterGame(login, password, games.gameID[i])
            );

            gameElement.appendChild(joinButton);

            mainElement.appendChild(gameElement);
        }
    } catch (error) {
        console.error('Failed to fetch user games:', error);
    }
}

function createGame(login, password) {}

function enterGame(login, password, gameID) {}

function logout(login, password) {
    loadMain();
}
