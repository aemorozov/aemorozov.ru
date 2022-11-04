const startButton = document.querySelector('#startButton') // получаем кнопку start для использования при нажатии
const boardSize = Array.prototype.slice.call(document.querySelectorAll('.boardSize'), 0) // создаём массив из вариантов размера поля
const speedSelect = Array.prototype.slice.call(document.querySelectorAll('.speed'), 0) // создаём массив из вариантов скорости
const colors = ['#ADFF2F', '#20B2AA', '#FF69B4', '#FFFF00', '#FF0000'] // создаём массив цветов
let lines = 0 // выбираем стороны квадрата 10, 15 или 20
let board = document.querySelector('#board') // получаем поле "доска" из HTML
let squares = [] // создаём пустой массив для будущих квадратов
let motion = 0 // переменная для будущего движения
let snake = [0] // массив нашей змеи
let i = 1 // главная переменная для расчёта цветных квадратов
let e = 0 // переменная для конечного значения змейки, что бы квадрат стал серым
let speed = 0 // скорость в ms
let k = 39 // переменная для предотвращения "обратного" движения
let xmas = [0] // переменная для клонирования нашей змейки, нужна для функции столкновения змейки самой с собой
let score = 0
let scoreToWin = 0
let event = null

boardSize.forEach(function(bS, x) { // сокращенный вариант выбора размера поля
    bS.addEventListener('click', event => {
            for (let i = 0, length = boardSize.length; i < length; i++) {
                boardSize[i].style.color = '#fffffffd';
              }
            boardSize[x].style.color = '#56c5f8'
            lines = parseInt(boardSize[x].getAttribute('id'))
    });
}); 

speedSelect.forEach(function(sS, x) { // сокращенный вариант выбора скорости
    sS.addEventListener('click', event => {
            for (let i = 0, length = speedSelect.length; i < length; i++) { 
                speedSelect[i].style.color = '#fffffffd';
              }
            speedSelect[x].style.color = '#56c5f8'
            speed = parseInt(speedSelect[x].getAttribute('id'))
    });
});

startButton.addEventListener('click', event => { // кнопка старт
    if (speed === 0 || lines === 0){
    } else {
        document.getElementById('start_game').style.display = 'none'
        document.getElementById('startButton').style.display = 'none'
        document.getElementById('board').style.display = 'flex'
        game()
    }
})

function game(){

    let SQUARES_NUMBER = lines**2 // создаем максимальное значение квадратов

    if (SQUARES_NUMBER === 100) { // создаём таблицу квадратиков соответствующую размеру экрана и максимальному количеству квадратов
        board.style.maxWidth = '190px'
    } else if (SQUARES_NUMBER === 225) {
        board.style.maxWidth = '280px'
    } else if (SQUARES_NUMBER === 400) {
        board.style.maxWidth = '360px'
    }

    for (let i = 0; i < SQUARES_NUMBER; i++){ // создаём div'ы со стилями для каждого квадратика и выводим на экран 
        const square = document.createElement('div')
        square.classList.add('square')
        squares.push(square)
        board.append(square)
    }

    motion = setInterval(plusOneSquareRight, speed) // создаём стартовое движение змейки

    createRandomSquare() // создаём нашу первую цель

    window.addEventListener('keydown', (key) => {     // создаём управление с клавиатуры
        if (key.keyCode === 39 && k != 37){ // змейка "назад" пойти не может, "только вперёд"!
            motion = clearInterval(motion) // и выполняем эти функции для движения
            motion = setInterval(plusOneSquareRight, speed)
        } else if (key.keyCode === 40 && k != 38){
            motion = clearInterval(motion)
            motion = setInterval(plusOneSquareDown, speed)
        } else if (key.keyCode === 37 && k != 39){
            motion = clearInterval(motion)
            motion = setInterval(plusOneSquareLeft, speed)
        } else if (key.keyCode === 38 && k != 40){
            motion = clearInterval(motion)
            motion = setInterval(plusOneSquareUp, speed)
        }
    })

    window.addEventListener("touchstart", function (e) { // создаём управление с тачскрина
        event = e;
    });
    window.addEventListener("touchmove", function (e) {
        let moveDeltaY = e.touches[0].pageY - event.touches[0].pageY
        let moveDeltaX = e.touches[0].pageX - event.touches[0].pageX
        if (moveDeltaY > 40 && k != 38) {
            motion = clearInterval(motion)
            motion = setInterval(plusOneSquareDown, speed)
        } 
        else if (moveDeltaY < -40 && k != 40) {
           motion = clearInterval(motion)
           motion = setInterval(plusOneSquareUp, speed)
        }
        else if (moveDeltaX < 0 && k != 39) {
            motion = clearInterval(motion)
            motion = setInterval(plusOneSquareLeft, speed)
        } 
        else if (moveDeltaX > 0 && k != 37) {
           motion = clearInterval(motion)
           motion = setInterval(plusOneSquareRight, speed)
        }
    });
    window.addEventListener("touched", function (e) {
        event = null;
    });

    function plusOneSquareRight(){ // реализуем условие для движения вправо
        k = 39 // значение k для проверки направления движения функциями изменения направления движения
        collision() // сперва проверим не столкнулись ли мы с хвостом змейки
        e = snake[snake.length - 1] // переменная для обозначения окончания змейки
        if (squares[i] === squares[GRN - 1] && (i + 1)/ lines != Math.floor((i + 1) / lines)){ // чтобы новый квадратик "прилипал спереди"
            snake.unshift(i + 1)
            i++
            squares[i].style.backgroundColor = getRandomColor()
            squares[e].style.backgroundColor = '#1d1d1d'
            createRandomSquare()
        }
        if ((i + 1)/ lines === Math.floor((i + 1) / lines)){ // создаём поведение на правой границе
            if (squares[(i - lines + 1)] === squares[GRN]) { // а тут совсем редкое поведение на правой границе, когда мы ловим цель на левой границе
                snake.unshift(i) // добавляем в змейку новое значение
                i = i - lines + 1 // что бы квадратик приклеился спереди нашей змейки
                squares[i].style.backgroundColor = getRandomColor()
                squares[e].style.backgroundColor = '#1d1d1d'
                createRandomSquare()                      
            } else {
                i = i - lines + 1
                squares[e].style.backgroundColor = '#1d1d1d'
            }
        } else {        
            i = i + 1
        }
        snake.unshift(i) // добавляем в змейку новое значение
        snake.pop() // отбрасываем ненужное 
        squares[i].style.backgroundColor = getRandomColor() // а новому i даём цвет
        squares[e].style.backgroundColor = '#1d1d1d' // и гасим квадратик, который выпал из массива змейки
    }

    function plusOneSquareLeft(){ // реализуем движение влево, всё аналогично предыдущей функции движения вправо
        k = 37
        collision()
        e = snake[snake.length - 1]
        if (squares[i] === squares[GRN + 1] && i / lines != Math.floor(i / lines)){
            snake.unshift(i - 1)
            i--
            squares[i].style.backgroundColor = getRandomColor()
            squares[e].style.backgroundColor = '#1d1d1d'
            createRandomSquare()
        }
        if (i / lines === Math.floor(i / lines)){
            if (squares[i + lines - 1] === squares[GRN]){
                snake.unshift(i)
                i = i + lines - 1
                squares[i].style.backgroundColor = getRandomColor()
                squares[e].style.backgroundColor = '#1d1d1d'
                createRandomSquare()
            } else {
                i = i + lines - 1
            }
        } else {
            i = i - 1
        }
        snake.unshift(i) // добавляем в змейку новое значение
        snake.pop() // отбрасываем ненужное 
        squares[i].style.backgroundColor = getRandomColor() // а новому i даём цвет
        squares[e].style.backgroundColor = '#1d1d1d'
    }

    function plusOneSquareUp(){ // реализуем движение вверх
        k = 38
        collision()
        e = snake[snake.length - 1]
        if (squares[i] === squares[GRN + lines] && squares[i] != squares[GRN - lines**2 + lines]){
            snake.unshift(i - lines)
            i = i - lines
            squares[i].style.backgroundColor = getRandomColor()
            squares[e].style.backgroundColor = '#1d1d1d'
            createRandomSquare()
        }
        if (i < lines){ 
            if (squares[i + lines**2 - lines] === squares[GRN]){
                snake.unshift(i)
                i = i + lines**2 - lines
                squares[i].style.backgroundColor = getRandomColor()
                squares[e].style.backgroundColor = '#1d1d1d'
                createRandomSquare()
            } else {
                i = i + lines**2 - lines
            }
        } else {
            i = i - lines
        }
        snake.unshift(i)
        snake.pop()
        squares[i].style.backgroundColor = getRandomColor()
        squares[e].style.backgroundColor = '#1d1d1d'
    }

    function plusOneSquareDown(){ // реализуем движение вниз
        k = 40
        collision()
        e = snake[snake.length - 1]
        if (squares[i] === squares[GRN - lines] && squares[i] != squares[GRN + lines**2 - lines]){
            snake.unshift(i + lines)
            i = i + lines
            squares[i].style.backgroundColor = getRandomColor()
            squares[e].style.backgroundColor = '#1d1d1d'
            createRandomSquare()
        }
        if (i >= lines**2 - lines){ 
            if (squares[i - lines**2 + lines] === squares[GRN]){
                snake.unshift(i)
                i = i - lines**2 + lines
                squares[i].style.backgroundColor = getRandomColor()
                squares[e].style.backgroundColor = '#1d1d1d'
                createRandomSquare()
            } else {
                i = i - lines**2 + lines
            }
        } else {
            i = i + lines
        }
        snake.unshift(i)
        snake.pop()
        squares[i].style.backgroundColor = getRandomColor()
        squares[e].style.backgroundColor = '#1d1d1d'
    }

    function getRandomColor() { // реализуем рандомный цвет активного квадрата из массива цветов
        const index = Math.floor(Math.random() * colors.length)
        return colors[index]
    }

    function createRandomSquare(){ // делаем один из квадратов массива доски цветным (цель для змейки)
        squares[getRandomNumber(1, lines**2 - 1)].style.backgroundColor = getRandomColor()
        
    }

    function getRandomNumber(min, max){ // эту функцию используем для выбора случайного квадрата под цель для змейки
        GRN = Math.round(Math.random() * (max - min) + 1)
        for (var i = 0; i < snake.length; i++) {
            if (snake[i] === GRN || e === GRN || snake[i] + lines === GRN || snake[i] - lines === GRN || snake[i] + 1 === GRN || snake[i] - 1 === GRN) {
                getRandomNumber(1, lines**2 - 1)
            }
        }
        return GRN
    }

    function collision(){ // универсальная функция столкновения с хвостом змейки
        xmas = snake.slice() // каждый шаг клонируем массив нашей змейки
        xmas.shift() // удаляем из него значение первого элемента
        if (xmas.includes(snake[0]) || i === e) { // проверяем есть ли наша "голова" в значениях хвоста змейки
            gameOver() // если есть, то выполняем Game Over
        }
    }
}

function gameOver(){ // функция для появления текста и счёта после столкновения
    score = snake.length - 1
    motion = clearInterval(motion)
    board.remove()
    document.getElementById('game_over').style.display = 'block'
    document.getElementById('score').innerHTML = `${score}`
    document.getElementById('button').style.display = 'block'
}

function win(){ // а тут будет функция для определения количества набранных очков, и в змейке можно будет даже победить!
    scoreToWin = snake.length - 1
    motion = clearInterval(motion)
    board.remove()
    document.getElementById('text').innerHTML = `Поздравляю! Вы поймали ${score} целей!</p>`   
}