let firstCard, secondCard; // запоминание карт
let hasFlippedCard = false; // перевернута ли первая карта
let lockBoard = false; // блокировка остальных карт, пока активны! две другие карты
let unflipCard = false; // переворот карт, если не совпали
let counterRounds = 0; // счетчик раундов
let endGame = 0; // проверка на конец игры
const final = document.getElementById('final');
const memCardTest = document.getElementsByClassName('memoryCardName');

mainMenu(); // генерируется и появляется главное меню игры

function mainMenu() { // создание главного меню при запуске игры

    const div = document.createElement('div');
    const buttonGameOnTime = document.createElement('button');
    const buttonSendTime = document.createElement('button');
    const inputMinutes = document.createElement('input');
    const inputSeconds = document.createElement('input');
    const buttonTraining = document.createElement('button');

    document.body.appendChild(div);
    div.appendChild(buttonGameOnTime);
    div.appendChild(buttonSendTime);
    div.appendChild(inputMinutes);
    div.appendChild(inputSeconds);
    div.appendChild(buttonTraining);

    div.id = 'mainGameWindow';
    buttonGameOnTime.id = 'gameOnTime';
    buttonSendTime.id = 'sendTime';
    inputMinutes.id = 'minutes';
    inputSeconds.id = 'seconds';
    buttonTraining.id = 'training';

    inputMinutes.placeholder = 'Минуты';
    inputSeconds.placeholder = 'Секунды';

    inputMinutes.title = 'Введите минуты';
    inputSeconds.title = 'Введите секунды';
    buttonGameOnTime.title = 'Начать игру на время (2:00)';
    buttonSendTime.title = 'Играть на своё время (указать время ниже)';
    buttonTraining.title = 'Тренировка без времени';

    buttonGameOnTime.textContent = 'Игра на время!';
    buttonSendTime.textContent = 'Игра на своё время!';
    buttonTraining.textContent = 'Тренировка без времени!';

    div.scrollIntoView({ block: "center", behavior: "smooth" });

    buttonGameOnTime.addEventListener('click', function () { // кнопка игры на время (первая сверху)
        mainGameWindow.remove();
        buttonBackToMainMenu('create');
        randomizeGame();
        timer(2); // передается значение таймера
    });

    buttonSendTime.addEventListener('click', function () { // кнопка игры на своё время
        sendTimer(1); // 1 - создавать попутно кнопку "Главное меню" (которая сверху), 0 - наоборот
    });

    buttonTraining.addEventListener('click', function () { // кнопка тренировки
        buttonBackToMainMenu('create');
        mainGameWindow.remove();
        createTimer(1);
        randomizeGame();
    });
};

function randomizeGame() { // создание карт

    const memCard = document.createElement('div');
    document.body.appendChild(memCard);
    memCard.setAttribute('class', 'memoryCardName');
    let cardArr = ['img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png', 'img/6.png', 'img/7.png', 'img/8.png', 'img/9.png', 'img/10.png', 'img/11.png', 'img/12.png', 'img/13.png', 'img/14.png', 'img/15.png', 'img/16.png'];


    function addCards() {
        for (let i = 0; i < 16; i++) {

            for (let j = 0; j < 2; j++) {
                const div = document.createElement('div');
                div.addEventListener('click', flipCard);
                const img = document.createElement('img');
                const imgTwo = document.createElement('img');
                memCard.appendChild(div);
                div.setAttribute('class', 'card');
                div.setAttribute('name', i);
                div.appendChild(img);
                img.setAttribute('class', 'front-card');
                img.setAttribute('src', cardArr[i]);
                img.setAttribute('alt', i);
                div.appendChild(imgTwo);
                imgTwo.setAttribute('class', 'back-card');
                imgTwo.setAttribute('src', 'img/back-card.png');
                imgTwo.setAttribute('alt', 'back');

            };
        };
    };

    addCards();

    randomCardAddListener();

};

function disableCards() { // удаление карт, если они совпали
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    setTimeout(() => {
        firstCard.childNodes[1].remove();
        secondCard.childNodes[1].remove();
        firstCard.style.transition = 'all ease .3s'
        secondCard.style.transition = 'all ease .3s'
        firstCard.style.opacity = '0';
        secondCard.style.opacity = '0';
        firstCard.style.cursor = 'default';
        secondCard.style.cursor = 'default';

        if (endGame === 16) {
            checkEndGame();
            buttonBackToMainMenu('delete');
        }

        resetBoard();

    }, 600);

    endGame++;

};

function checkEndGame() { // проверка на конец игры + вывод результата (здесь же генерируется окно с результатами игры)

    let pText; // финальный текст в зависимости от исхода игры

    (endGame < 16) ? pText = 'Время вышло. Вы проиграли!' : pText = 'Поздравляем, все карты угаданы!';

    memCardTest[0].remove();

    let div = document.createElement('div');
    document.body.appendChild(div);
    div.id = 'final';

    let final = document.getElementById('final');
    let pFirst = document.createElement('p');
    let pSecond = document.createElement('p');
    let button = document.createElement('button');

    button.id = 'button';
    button.textContent = 'Главное меню!';
    final.appendChild(pFirst);
    final.appendChild(pSecond);
    final.appendChild(button);
    final.childNodes[0].textContent = pText;
    final.childNodes[1].textContent = `Раундов сыграно: ${counterRounds}`;
    final.scrollIntoView({ block: "center", behavior: "smooth" });
    final.setAttribute('class', 'finalWindow');
    button.setAttribute('class', 'active');
    final.scrollIntoView({ block: "center", behavior: "smooth" });

    button.addEventListener('click', function () { // кнопка "Главное меню" (появляется в конце игры)

        final.remove();
        time.remove();
        mainMenu();

    });
};

function flipCard() { // выбирает карты для сравнения

    if (unflipCard && (this !== firstCard && this !== secondCard)) { // переворачивает активные карты, если пользователь нажал на третью 
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard()
        unflipCard = false;
    };
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    };

    secondCard = this;
    lockBoard = true;

    checkForMatch();

};

function checkForMatch() { // сравнение карт

    if (firstCard.getAttribute('name') === secondCard.getAttribute('name')) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        disableCards();
        counterRounds++;
    } else {
        counterRounds++;
        return unflipCard = true;
    };
};

function resetBoard() { // сброс переменных после раунда
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

function randomCardAddListener() { // рандомайзер карт

    const cards = document.querySelectorAll('.card');
    let arrUsedNumber = [];

    for (let i = 0; arrUsedNumber.length !== 32;) {
        let randomPos = Math.floor(Math.random() * 32);
        if (arrUsedNumber.indexOf(randomPos) >= 0) {
            continue;
        } else {
            arrUsedNumber.push(randomPos);
            cards[i].style.order = randomPos;
            i++;
        };
    };

    endGame = 0;
    counterRounds = 0;
};

function timer(minutes = 0, seconds = 0) { // динамически настраиваемый таймер, можно выставить любое время в пределах часа

    createTimer(0); // создается div с таймером

    const time = document.getElementById('time');

    beautySeconds();

    let checkFunc = setInterval(() => {

        if (minutes == 0 && seconds == 0) { // когда время вышло
            setInterval(() => { clearInterval(timer); });
            setInterval(() => { clearInterval(checkFunc); });
            checkEndGame();
            buttonBackToMainMenu('delete');
            return;
        };

        if (endGame === 16) { // пользователь завершил игру раньше времени

            clearInterval(timer);
            setInterval(() => { clearInterval(checkFunc); });
            return;

        };

    }, 500);

    let timer = setInterval(() => {

        seconds--;

        if (seconds === -1) {
            minutes--;
            seconds = 59;
            time.textContent = `${minutes}:${seconds}`;
            return;
        };

        beautySeconds();

        if (minutes == 0 && seconds <= 10) { // когда остается 10 секунд, таймер мигает красным
            time.classList.toggle('red');
        };


    }, 1000);

    function beautySeconds() { // косметическая функция, добавляет секундам ноль если они меньше десяти (вместо 5:4 => 5:04)
        if (seconds < 10) {
            time.textContent = `${minutes}:0${seconds}`;
        } else {
            time.textContent = `${minutes}:${seconds}`;
        };
    };
};

function sendTimer(createButton) { // пользователь может сам установить для себя удобное время для тренировки (если не успевает выиграть за минуту, например)
    let sec = document.getElementById('seconds');
    let min = document.getElementById('minutes');
    let regex = /\D/;

    if (regex.test(sec.value) || regex.test(min.value)) { // проверки input value
        alert('Вводить разрешено только цифры!');
        return;
    } else if (min.value > 59 || sec.value > 59) {
        alert('Максимально возможное время для установки: 59:59');
        return;
    } else if (regex.test(min.value) || sec.value == 0 && min.value <= 0) {
        alert('Проверьте правильность ввода минут и/или секунд!');
        return;
    };

    if (min.value == '' || min.value.length > 2) {
        min.value = 0;
    };

    if (sec.value == '' || sec.value.length > 2) {
        sec.value = 0;
    };

    if (createButton) buttonBackToMainMenu('create');

    mainGameWindow.remove();

    randomizeGame();

    timer(min.value, sec.value);

};

function createTimer(runDateNow) { // создание diva таймера (значение передается для создания пустого div, либо вывода даты в div, если выбрана тренировка)
    const div = document.createElement('div');
    document.body.prepend(div);
    div.id = 'time';
    div.textContent = '00:00:00';
    div.style.fontSize = '20px';

    if (!runDateNow) setInterval(() => { clearInterval(dateNow); });

    let dateNow = setInterval(() => { // если выбрана тренировка, то выводится местное время вместо таймера
        let t = new Date();
        div.style.fontSize = '20px';
        hours = (t.getHours());
        minutes = (t.getMinutes());
        seconds = (t.getSeconds());
        (hours < 10) ? hours = `0${hours}` : hours;
        (minutes < 10) ? minutes = `0${minutes}` : minutes;
        (seconds < 10) ? seconds = `0${seconds}` : seconds;
        div.textContent = `${hours}:${minutes}:${seconds}`;

    }, 500);
};

function buttonBackToMainMenu(createOrDelete) { // кнопка "Главное меню", которая появляется при игре
    const button = document.createElement('button');
    if (createOrDelete === 'create') {
        document.body.prepend(button);
        button.id = 'backMainMenu';
        button.textContent = 'Главное меню';
        button.title = 'При выходе сбросится весь прогресс и время!'
    };

    if (createOrDelete === 'delete') {
        const buttonDelete = document.getElementById('backMainMenu');
        buttonDelete.remove();
    };

    button.addEventListener('click', function () {

        const time = document.getElementById('time');

        if (time) time.remove();
        buttonBackToMainMenu('delete');
        memCardTest[0].remove();
        mainMenu();
        endGame = 16;
    });
};