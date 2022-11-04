const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
let time = 0
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let score = 0
const colors = ['#ADFF2F', '#20B2AA', '#FF69B4', '#FFFF00', '#FF0000']
const color = 0


startBtn.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')

})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
    
})

board.addEventListener('click', event => {
    if (event.target.classList.contains ('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
        console.log(score)
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)

}

function decreaseTime(){
    if (time === 0){
        finishGame()
    } else {
        let current = --time
        if (current < 10){
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`
}

function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счёт <span class="primary">${score}</span></h1>`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}


function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 30)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0 + size, width - size)
    const y = getRandomNumber(0 + size, height - size)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = getRandomColor()
    board.append(circle)

}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min)
}


