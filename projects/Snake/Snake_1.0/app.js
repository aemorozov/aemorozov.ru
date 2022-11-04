let board = document.querySelector('#board') // получаем поле "доска" из HTML
const lines = 15 // выбираем стороны квадрата 10, 15 или 20
const colors = ['#ADFF2F', '#20B2AA', '#FF69B4', '#FFFF00', '#FF0000'] // создаём массив цветов
let SQUARES_NUMBER = lines**2 // создаем максимальное значение квадратов
let squares = [] // создаём пустой массив для будущих квадратов
let motion = 0 // переменная для будущего движения
let snake = [0] // массив нашей змеи
let i = 1 // главная переменная для расчёта цветных квадратов
let e = 0 // переменная для конечного значения змейки, что бы квадрат стал серым
let speed = 180 // скорость в ms
let k = 39 // переменная для предотвращения "обратного" движения
let xmas = [0] // переменная для клонирования нашей змейки, нужна для функции столкновения змейки самой с собой
let score = 0

// создаём таблицу квадратиков соответствующую размеру и максимальному количеству квадратов
if (SQUARES_NUMBER === 100) {
    board.style.maxWidth = '200px'
} else if (SQUARES_NUMBER === 225) {
    board.style.maxWidth = '300px'
} else if (SQUARES_NUMBER === 400) {
    board.style.maxWidth = '400px'
}

// создаём div'ы со стилями для каждого квадратика и выводим на экран 
for (let i = 0; i < SQUARES_NUMBER; i++){
    const square = document.createElement('div')
    square.classList.add('square')
    squares.push(square)
    board.append(square)
}

// создаём стартовое движение змейки
motion = setInterval(plusOneSquareRight, speed)

// создаём нашу первую цель
createRandomSquare()

// создаём управление с клавиатуры
window.addEventListener('keydown', (key) => {
    if (key.keyCode === 39 && k != 37){ // змейка "назад" пойти не может, "только вперёд"!
        console.log("key: ", key.keyCode)
        k = 39 // для этого используем k для обозначения направления движения
        motion = clearInterval(motion) // и выполняем эти функции для движения
        motion = setInterval(plusOneSquareRight, speed)
    } else if (key.keyCode === 40 && k != 38){
        console.log("key: ", key.keyCode)
        k = 40
        motion = clearInterval(motion)
        motion = setInterval(plusOneSquareDown, speed)
    } else if (key.keyCode === 37 && k != 39){
        console.log("key: ", key.keyCode)
        k = 37
        motion = clearInterval(motion)
        motion = setInterval(plusOneSquareLeft, speed)
    } else if (key.keyCode === 38 && k != 40){
        console.log("key: ", key.keyCode)
        k = 38
        motion = clearInterval(motion)
        motion = setInterval(plusOneSquareUp, speed)
    }
})

// реализуем условие для движения вправо
function plusOneSquareRight(){
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

// реализуем движение влево, всё аналогично предыдущей функции движения вправо
function plusOneSquareLeft(){
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

// реализуем движение вверх
function plusOneSquareUp(){
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

// реализуем движение вниз
function plusOneSquareDown(){
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

// реализуем рандомный цвет активного квадрата из массива цветов
function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

// делаем один из квадратов массива доски цветным (цель для змейки)
function createRandomSquare(){
    squares[getRandomNumber(1, lines**2 - 1)].style.backgroundColor = getRandomColor()
    
}

// эту функцию используем для выбора случайного квадрата под цель для змейки
function getRandomNumber(min, max){
    GRN = Math.round(Math.random() * (max - min) + 1)
    console.log("Old GRN: ", GRN)
    for (var i = 0; i < snake.length; i++) {
        if (snake[i] === GRN || e === GRN || snake[i] + lines === GRN || snake[i] - lines === GRN || snake[i] + 1 === GRN || snake[i] - 1 === GRN) {
            getRandomNumber(1, lines**2 - 1)
            console.log('New GRN: ', GRN)
        }
    }
    return GRN
}

// универсальная функция столкновения с хвостом змейки
function collision(){
    // console.log(snake.join(', '))
    // console.log('GRN: ', GRN)
    // console.log('i: ', i)
    // console.log('e:', e)
    // console.log('S.INCL: ', snake.includes(GRN))
    xmas = snake.slice() // каждый шаг клонируем массив нашей змейки
    xmas.shift() // удаляем из него значение первого элемента
    if (xmas.includes(snake[0]) || i === e) { // проверяем есть ли наша "голова" в значениях хвоста змейки
        gameOver() // если есть, то выполняем Game Over
    }
}

function gameOver(){ // функция для появления текста и счёта после столкновения
    score = snake.length - 1
    motion = clearInterval(motion)
    board.remove()
    document.getElementById('text').style.display = 'block'
    document.getElementById('score').innerHTML = `${score}`
    document.getElementById('button').style.display = 'block'
}

function win(){
    score = snake.length - 1
    motion = clearInterval(motion)
    board.remove()
    document.getElementById('text').innerHTML = `Поздравляю! Вы поймали ${score} целей!</p>`   

}

function startGame(){

}