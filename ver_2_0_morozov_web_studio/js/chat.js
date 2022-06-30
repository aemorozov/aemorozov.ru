const question = document.querySelector('.question')
const answer1 = document.querySelector('.answer1')
const answer2 = document.querySelector('.answer2')
const answer3 = document.querySelector('.answer3')
const answer4 = document.querySelector('.answer4')
const answer5 = document.querySelector('.answer5')
const answer6 = document.querySelector('.answer6')
const answer7 = document.querySelector('.answer7')
const answer8 = document.querySelector('.answer8')
const blocks = [question, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8]

function toUpAll () {
    question.classList.add('toUp')
    answer1.classList.add('toUp')
    answer2.classList.add('toUp')
    answer3.classList.add('toUp')
    answer4.classList.add('toUp')
    answer5.classList.add('toUp')
    answer6.classList.add('toUp')
    answer7.classList.add('toUp')
    answer8.classList.add('toUp')
}

// Нажатие на "Да!"

answer1.addEventListener("click", () => {
    toUpAll()
    setTimeout(() => {
        for (let i = 1; i <= blocks.length; i++) {
            document.querySelector('.chat').querySelector('p').remove()
        }
 
        question.insertAdjacentHTML('afterbegin', '<p>Какой сайт хотите?</p>');
        question.classList.remove('toUp')

        answer1.insertAdjacentHTML('afterbegin', '<p>Одностраничный (от 3 дней и 100$)</p>');
        answer1.classList.add('varAnswerOne')
        answer1.classList.remove('toUp')

        setTimeout(() => { 
            answer4.insertAdjacentHTML('afterbegin', '<p>Многостраничный (от 7 дней и 200$)</p>');
            answer4.classList.add('varAnswerTwo')
            document.querySelector('.varAnswerTwo').classList.add('answer1')
            document.querySelector('.varAnswerTwo').classList.remove('answer4')
            document.querySelector('.varAnswerTwo').classList.remove('toUp')
        }, 200)

        setTimeout(() => { 
            answer5.insertAdjacentHTML('afterbegin', '<p>Интернет-магазин (от 14 дней и 500$)</p>');
            answer5.classList.add('varAnswerThree')
            document.querySelector('.varAnswerThree').classList.add('answer1')
            document.querySelector('.varAnswerThree').classList.remove('answer5')
            document.querySelector('.varAnswerThree').classList.remove('toUp')
        }, 200)

        setTimeout(() => { 
            answer6.insertAdjacentHTML('afterbegin', '<p>Что-то индивидуальное!</p>');
            answer6.classList.add('varAnswerFour')
            document.querySelector('.varAnswerFour').classList.remove('answer6')
            document.querySelector('.varAnswerFour').classList.add('answer1')
            document.querySelector('.varAnswerFour').classList.remove('toUp')
        }, 200)
}, 300)
});

