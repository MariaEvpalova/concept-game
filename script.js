function loadMain() {
    document.body.innerHTML = '';
    document.body.id = 'index';
    const newHTMLContent = `
          <h1>Концепт</h1>
          <div class="buttons">
              <button id="rules">Правила</button>
              <button id="enter">Играть</button>
          </div>
        `;

    document.body.innerHTML = newHTMLContent;

    document.getElementById('rules').onclick = function () {
        loadRules();
    };
    document.getElementById('enter').onclick = function () {
        loadAuth();
    };
}

function loadRules() {
    document.body.innerHTML = '';
    document.body.id = 'rules';

    const newHTMLContent = `
          <a href="index.html">
              <button class="back">
                  <img src="images/back.svg" alt="back arrow" />
              </button>
          </a>
          <div>
              <h1>Правила</h1>
              <p>
                  Цель игры — правильно угадывать слова, используя универсальные
                  иконки и связанные с ними ассоциации. Каждый игрок выбирает
                  слово (или фразу) и загадывает его другим игрокам. Для этого
                  ведущий игрок размещает маркеры на определённых иконках игрового
                  поля. Первый игрок, отгадавший задуманное слово (или фразу),
                  получает 2 победных очка, а игрок, загадывающий слово получает 1
                  балл. Тот, кто к концу игры наберёт их больше всех, станет
                  победителем.
              </p>
          </div>
        `;

    document.body.innerHTML = newHTMLContent;

    const backButton = document.querySelector('.back');
    backButton.onclick = function () {
        loadMain();
    };
}

loadMain();
