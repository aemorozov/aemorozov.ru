const h1_1 = document.querySelector('#h1_1')        // забираем из HTML тег H1 с id = h1_1
const h1_2 = document.querySelector('#h1_2')        // забираем из HTML тег H1 с id = h1_2

const h1_1Arr = h1_1.textContent.split('')          // превращаем вложеный текст в массив по символам
const h1_2Arr = h1_2.textContent.split('')

let i = 0                                           // с 0-го значения начинается отсчёт массива для поялвения символов
let time = 90                                       // задаём время между появлением символов в мс
let interval = 1.2                                  // задаём интервал между строками

let timeToSecondString = h1_1Arr.length * time * interval       // задаём время до появления второй строки используя длинну первой строки

firstLine()                                         // запускаем первую функцию (строку) сразу
setTimeout(secondLine, timeToSecondString)          // запускаем вторую строку через время, когда кончится первая

h1_1.innerHTML = ''                                 // опусташаем вложенный текст в документе
h1_2.innerHTML = ''                                 

function firstLine(){                               // создаём функцию для появления первой строки
    const intervalFirstLine = setInterval (() => {  // создаём переменную, в которую вкладываем функцию с интервалом
        if (h1_1Arr[i] !== undefined) {             // описываем условие, если в массиве под индексом i есть какие-то данные, то...
            h1_1.innerHTML += h1_1Arr[i]            // в тег H1 вкладываем символ из массива, сохраняя ранее вложенные данные
            i++                                     // увеличиваем номер индекса для следующей проверки
        } else {                                    // а если значение под индексом не определено, то...
            clearInterval(intervalFirstLine)        // останавливаем выполнение функции
            i = 0                                   // присваиваем i снова 0
            h1_1.style.border = '0px'
        }
    }, time)                                        // задаем время для каждой итерации
}

function secondLine() {                             // делаем тоже самое для второй строки
    let intervalSecondLine = setInterval (() => {
        if (h1_2Arr[i] !== undefined) {
            h1_2.innerHTML += h1_2Arr[i]
            i++
        } else {
            clearInterval(intervalSecondLine)
            h1_2.style.border = '0px'
        }
    }, time)
}