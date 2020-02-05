// старый код



// const cards = document.querySelectorAll('.card');

// let hasFlippedCard = false;
// let lockBoard = false;
// let firstCard, secondCard;

// function flipCard() {
//     if (lockBoard) return;
//     if (this === firstCard) return;

//     this.classList.add('flip');

//     if (!hasFlippedCard) {
//         hasFlippedCard = true;
//         firstCard = this;
//         return;
//     }

//     secondCard = this;
//     lockBoard = true;

//     checkForMatch();
// }

// function checkForMatch() {
//     let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
//     isMatch ? disableCards() : unflipCards();
// }

// function disableCards() {
//     firstCard.removeEventListener('click', flipCard);
//     secondCard.removeEventListener('click', flipCard);

//     resetBoard();
// }

// function unflipCards() {
//     setTimeout(() => {
//         firstCard.classList.remove('flip');
//         secondCard.classList.remove('flip');

//         resetBoard();
//     }, 1500);
// }

// function resetBoard() {
//     [hasFlippedCard, lockBoard] = [false, false];
//     [firstCard, secondCard] = [null, null];
// }

// (function shuffle() {
//     cards.forEach(card => {
//         let randomPos = Math.floor(Math.random() * 32);
//         card.style.order = randomPos;
//     });
// })();

// cards.forEach(card => card.addEventListener('click', flipCard));


// новый код


// function randomizeGame() {
//     const memCard = document.createElement('div');
//     document.body.prepend(memCard);
//     memCard.setAttribute('class', 'memoryCardName');
//     let counter = 0;
//     for (let i = 0; i < 32; i++) {

//         if (counter < 16) {
//             nameCard = 'joker';
//             imgCard = 'img/joker.png';
//             counter++;
//         } else {
//             nameCard = 'batman';
//             imgCard = 'img/batman.png';
//         };

//         const div = document.createElement('div');
//         const img = document.createElement('img');
//         const imgTwo = document.createElement('img');
//         memCard.appendChild(div);
//         div.setAttribute('class', 'card');
//         div.setAttribute('name', nameCard);
//         div.appendChild(img);
//         img.setAttribute('class', 'front-card');
//         img.setAttribute('src', imgCard);
//         img.setAttribute('alt', nameCard);
//         div.appendChild(imgTwo);
//         imgTwo.setAttribute('class', 'back-card');
//         imgTwo.setAttribute('src', 'img/back-card.png');
//         imgTwo.setAttribute('alt', 'back');
//     };
// };

// randomizeGame();


// const cards = document.querySelectorAll('.card');
// let hasFlippedCard = false;
// let firstCard, secondCard;

// function flipCard() {
//     if (checkMatch) unflipCards();


//     this.classList.toggle('flip');





//     if (!hasFlippedCard) {
//         hasFlippedCard = true;
//         firstCard = this;
//         return;
//     };

//     secondCard = this;
//     hasFlippedCard = false;

//     checkForMatch();
// };


// let checkMatch = 0; // под вопросом
// let roundCounter = 0; // счетчик раундов

// function checkForMatch() {
//     checkMatch = 0;
//     if (firstCard.getAttribute('name') === secondCard.getAttribute('name')) {
//         disableCards();
//         roundCounter++;
//         // console.log(roundCounter);

//         return checkMatch = 1; // под вопросом
//     }

//     unflipCards();
// };

// function disableCards() {
//     firstCard.removeEventListener('click', flipCard);
//     secondCard.removeEventListener('click', flipCard);

//     setTimeout(() => {
//         firstCard.style.transition = 'all ease .3s'
//         secondCard.style.transition = 'all ease .3s'
//         firstCard.style.background = '#fff';
//         firstCard.style.boxShadow = 'none';
//         firstCard.style.cursor = 'default';
//         firstCard.classList.remove('flip');
//         firstCard.childNodes[0].remove();
//         firstCard.childNodes[0].remove();
//         secondCard.style.background = '#fff';
//         secondCard.style.boxShadow = 'none';
//         secondCard.style.cursor = 'default';
//         secondCard.classList.remove('flip');
//         secondCard.childNodes[0].remove();
//         secondCard.childNodes[0].remove();
//     }, 1000);

// };

// function unflipCards() {
//     setTimeout(() => {
//         firstCard.classList.remove('flip');
//         secondCard.classList.remove('flip');
//     }, 1500);
// };








// (function shuffle() {
//     cards.forEach(card => {
//         let randomPos = Math.floor(Math.random() * 32);
//         card.style.order = randomPos;
//     });
// })();

// // cards.forEach(card => card.addEventListener('click', flipCard));

// cards.forEach(function (card) {
//     card.addEventListener('click', flipCard);
//     // console.log(this)
// });





// новый переписанный код


let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let unflip = false; // перевернуты ли карточки
let counterRounds = 0; // проверка на кол-во раундов
let endGame = 0; // проверка на конец игры
const final = document.getElementById('final');
const button = document.getElementById('button');
const memCardTest = document.getElementsByClassName('memoryCardName');

button.addEventListener('click', function () {
    memCardTest[0].remove();
    randomizeGame();
});


function randomizeGame() {

    const memCard = document.createElement('div');
    document.body.prepend(memCard);
    memCard.setAttribute('class', 'memoryCardName');
    let counter = 0;
    for (let i = 0; i < 32; i++) {

        if (counter < 16) {
            nameCard = 'joker';
            imgCard = 'img/joker.png';
            counter++;
        } else {
            nameCard = 'batman';
            imgCard = 'img/batman.png';
        };

        const div = document.createElement('div');
        const img = document.createElement('img');
        const imgTwo = document.createElement('img');
        memCard.appendChild(div);
        div.setAttribute('class', 'card');
        div.setAttribute('name', nameCard);
        div.appendChild(img);
        img.setAttribute('class', 'front-card');
        img.setAttribute('src', imgCard);
        img.setAttribute('alt', nameCard);
        div.appendChild(imgTwo);
        imgTwo.setAttribute('class', 'back-card');
        imgTwo.setAttribute('src', 'img/back-card.png');
        imgTwo.setAttribute('alt', 'back');
    };

    randomCardAddListener();

    // временно 
    // final.setAttribute('class', 'finalWindow');
    // button.setAttribute('class', 'active');
    // final.childNodes[1].textContent = 'Ходов потребовалось, для завершения игры';
    // final.childNodes[3].textContent = '23';
    // button.style.display = 'block';
    // final.childNodes[1].style.display = 'block';
    // final.childNodes[3].style.display = 'block';


};

randomizeGame();

function disableCards() {
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

        // firstCard.style.background = '#fff';
        // firstCard.style.boxShadow = 'none';
        // firstCard.style.cursor = 'default';
        // firstCard.style.overflow = 'hidden';
        // firstCard.childNodes[1].remove();
        // secondCard.style.background = '#fff';
        // secondCard.style.boxShadow = 'none';
        // secondCard.style.cursor = 'default';
        // secondCard.style.overflow = 'hidden';
        // secondCard.childNodes[1].remove();

        // if (endGame === 16) { // проверка на конец игры + вывод результата
        //     final.childNodes[1].textContent = 'Ходов потребовалось, для завершения игры';
        //     final.childNodes[3].textContent = counterRounds;
        //     final.setAttribute('class', 'finalWindow');
        //     button.setAttribute('class', 'active');
        //     button.style.display = 'block';
        //     final.childNodes[1].style.display = 'block';
        //     final.childNodes[3].style.display = 'block';
        // };


        checkEndGame();

        resetBoard();

    }, 600);

    endGame++;

};

function checkEndGame() {
    if (endGame === 16) { // проверка на конец игры + вывод результата
        final.childNodes[1].textContent = 'Ходов потребовалось, для завершения игры';
        final.childNodes[3].textContent = counterRounds;
        final.setAttribute('class', 'finalWindow');
        button.setAttribute('class', 'active');
        button.style.display = 'block';
        final.childNodes[1].style.display = 'block';
        final.childNodes[3].style.display = 'block';
    };
}



function flipCard() {

    console.log('Зашел');

    if (unflip && (this !== firstCard && this !== secondCard)) {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard()
        unflip = false;
    };
    if (lockBoard) return;
    if (this === firstCard) return;

    console.log('Прошел')


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


function checkForMatch() {
    if (firstCard.getAttribute('name') === secondCard.getAttribute('name')) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        disableCards();
        counterRounds++; // проверка на кол-во раундов
    } else {
        counterRounds++;
        return unflip = true;
    };
};


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};


function randomCardAddListener() {

    const cards = document.querySelectorAll('.card');

    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 32);
            card.style.order = randomPos;
        });
    })();

    cards.forEach(function (card) {
        card.addEventListener('click', flipCard);
    });

    final.childNodes[1].style.display = 'none';
    final.childNodes[3].style.display = 'none';
    final.removeAttribute('class');
    button.style.display = 'none';
    button.removeAttribute('class');

    endGame = 0;
    counterRounds = 0;
};
