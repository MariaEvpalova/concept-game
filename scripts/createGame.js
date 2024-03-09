function displayCreateGamesPage(login, password) {
    document.body.id = 'createGame';
    document.body.innerHTML = `
        <body id="createGame">
            <header>
                <button id="back">
                    <img src="images/back.svg" alt="back arrow" />
                </button>
                <h1>Создать игру</h1>
            </header>

            <main>
                <form id="createGameForm">
                    <div>
                        <div>
                            <label for="difficulty">Сложность:</label>
                            <select id="difficulty" name="difficulty">
                                <option value="easy">Легко</option>
                                <option value="normal">Средне</option>
                                <option value="hard">Сложно</option>
                            </select>
                        </div>

                        <div>
                            <label for="gameTime">Время хода (мин):</label>
                            <input type="number" id="gameTime" name="gameTime" required />
                        </div>
                        <button type="submit">Создать игру</button>
                    </div>

                    <div>
                        <div>
                            <label for="attempts">Попытки:</label>
                            <input type="number" id="attempts" name="attempts" required />
                        </div>

                        <div>
                            <label for="players">Количество игроков:</label>
                            <input type="number" id="players" name="players" required />
                        </div>
                    </div>
                </form>
            </main>
        </body>
    `;

    document
        .getElementById('createGameForm')
        .addEventListener('submit', async (event) => {
            event.preventDefault();

            const difficulty = document.getElementById('difficulty').value;
            const gameTime = document.getElementById('gameTime').value;
            const attempts = document.getElementById('attempts').value;
            const players = document.getElementById('players').value;

            try {
                const result = await createGame(
                    login,
                    password,
                    difficulty,
                    gameTime,
                    players,
                    attempts
                );
                console.log('Game created successfully', result);
                displayUserGames(login, password);
            } catch (error) {
                console.error('Failed to create game:', error);
            }
        });
    document
        .getElementById('back')
        .addEventListener('click', () => displayUserGames(login, password));
}

async function createGame(
    login,
    password,
    difficulty,
    gameTime,
    players,
    attempts
) {
    const response = await fetchData('CreateGame', [
        login,
        password,
        difficulty,
        gameTime,
        players,
        attempts,
    ]);
    return response;
}
