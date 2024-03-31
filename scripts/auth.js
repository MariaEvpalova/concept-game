async function fetchData(pname, params) {
    let url = `https://sql.lavro.ru/call.php?pname=${pname}&db=277446`;

    params.forEach((param, index) => {
        url += `&p${index + 1}=${param}`;
    });

    url += '&format=columns';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(
            'There has been a problem with your fetch operation:',
            error
        );
        throw error;
    }
}

async function handleFormSubmission(buttonId, pname, loginId, passwordId) {
    document
        .getElementById(buttonId)
        .addEventListener('click', async function (e) {
            e.preventDefault();
            const login = document.getElementById(loginId).value;
            const password = document.getElementById(passwordId).value;
            try {
                const data = await fetchData(pname, [login, password]);
                const firstKey = Object.keys(data['RESULTS'][0])[0];
                if (firstKey === 'ERROR_MESSAGE') {
                    displayError(data['RESULTS'][0][firstKey]);
                } else {
                    displayUserGames(login, password);
                }
            } catch (error) {
                console.error(`${pname} failed`, error);
                displayError(error.message);
            }
        });
}

function displayError(errorMessage) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = errorMessage;
}

function loadAuth() {
    document.body.innerHTML = '';
    document.body.id = 'enter';

    const newHTMLContent = `
        <div>
            <a href="index.html">
                <button id="back">
                    <img src="images/back.svg" alt="back arrow" />
                </button>
            </a>
            <div>
                <h1>Вход</h1>
                <form id="loginForm">
                    <div>
                        <label for="login">Имя пользователя:</label>
                        <input type="text" id="login" name="login" />
                    </div>
                    <div>
                        <label for="password">Пароль:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <div>
                        <button type="button" id="loginButton">Вход</button>
                    </div>
                </form>
            </div>

            <div>
                <h1>Регистрация</h1>
                <form id="registrationForm">
                    <div>
                        <label for="reg-login">Имя пользователя:</label>
                        <input type="text" id="reg-login" name="login" />
                    </div>
                    <div>
                        <label for="reg-password">Пароль:</label>
                        <input type="password" id="reg-password" name="password" />
                    </div>
                    <div>
                        <button type="button" id="registerButton">
                            Зарегистрироваться
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <p id="error-message"></p>
    `;

    document.body.innerHTML = newHTMLContent;

    const backButton = document.getElementById('back');
    backButton.onclick = function () {
        loadMain();
    };
    handleFormSubmission('loginButton', 'authorization', 'login', 'password');
    handleFormSubmission(
        'registerButton',
        'registration',
        'reg-login',
        'reg-password'
    );
}
