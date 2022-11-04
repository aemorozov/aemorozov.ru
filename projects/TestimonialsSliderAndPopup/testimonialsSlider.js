testimonials()

function testimonials() {

    let block = document.querySelector('.testimonials-block')
    let cardsItems = document.querySelector('.testimonials-cards')
    let grayLine = document.querySelector('.gray-line')
    let orangeLine = document.querySelector('.big-orange-line')
    let flexBlock = document.querySelector('.items')

    let percentsOrangeLine = 0
    let percentsCardsItems = 0
    let enabled = true
    let mouseDownX = 0
    let mouseXMotion = 0
    let deltaXMotion = 0
    let mouseDownXconst = grayLine.clientWidth
    let stepOfMotion = 0

    if (block.clientWidth == 1160) {
        stepOfMotion = 25
        start()
    } else if (block.clientWidth == 994) {
        stepOfMotion = 33.33
        start()
    }


    // Вызовы действий

    function start() {
        block.addEventListener("wheel", onWheel)            // прокрутка колесиком по блоку отзывов
        orangeLine.addEventListener('mousedown', swipe)     // перетаскивание ползунка по нажатию на него ЛКМ
        orangeLine.addEventListener('touchmove', swipe)     // перетаскивание ползунка по нажатию на него через тачсрином
        flexBlock.addEventListener('click', clickToItems)   // отслеживаем нажатие на серую линию ЛКМ
        flexBlock.addEventListener('touchend', clickToItems)// отслеживание клика по тачсрину на серую линию
    }



    // Главная функция, реализующая движение

    function motion(delta) {
        if (percentsOrangeLine >= 0.1 && delta < 0 && enabled == true) { // если дельта вправо, то запускаем анимацию влево
            enabled = false
            percentsOrangeLine -= 12.5
            percentsCardsItems -= stepOfMotion
            console.log(percentsOrangeLine)
        }
        if (percentsOrangeLine < 87.5 && delta > 0 && enabled == true) { // если дельта влево, то запускаем анимацию вправо
            enabled = false
            percentsOrangeLine += 12.5
            percentsCardsItems += stepOfMotion
            console.log(percentsOrangeLine)
        }
        orangeLine.style.marginLeft = `${percentsOrangeLine}%`      // предаём полученные данные
        cardsItems.style.marginLeft = `-${percentsCardsItems}%`
        block.addEventListener("transitionend", () => {             // пока анимация не кончится, новую не начинаем
            enabled = true
        })
    }




    // Функции для прокрутки колёсиком

    function onWheel(i) {                               // получаем кручение колёсика и координаты
        i.preventDefault()                              // отменяем стандартное поведение
        let delta = i.deltaY || i.wheelDelta            // получаем из координат дельту
        if (enabled && (delta > 25 || delta < -25)) {   // проверяем большая ли дельта 
            motion(delta)
        }
    }




    // Функции для перетаскивания оранжевого ползунка движением пальца по тачу и кликом мышки

    function swipe() {    // получем координату нажатия на кнопку мыши
        if (event.clientX != undefined) {
            mouseDownX = event.clientX
            event.preventDefault()                                  // отменяем любое стандартное поведение
            mouseMove()                                             // запускаем функцию отслеживания координаты X
            //        console.log(event.clientX)
        }
        else {
            if (mouseDownX == 0) {
                mouseDownX = Math.floor(event.targetTouches[0].pageX * 10) / 10
            }
            touchMoving()
        }
    }

    function mouseMove() {
        window.addEventListener('mousemove', mouseMoving)           // отслеживаем курсор по всему окну
        window.addEventListener('mouseup', () => {                  // слушаем отпускание кнопки мыши
            window.removeEventListener('mousemove', mouseMoving)    // удаляем слушателя, если отпустили кнопку
        })
    }

    function mouseMoving() {
        mouseXMotion = event.clientX
        moving()
    }

    function touchMoving() {
        mouseXMotion = Math.floor(event.targetTouches[0].pageX * 10) / 10
        moving()
    }

    function moving() {
        deltaXMotion = Math.floor(mouseXMotion - mouseDownX)    // считаем дельту между начальным и нынешним положением курсора
        //    console.log(mouseDownXconst, mouseXMotion, mouseDownX, deltaXMotion)
        if (deltaXMotion > (mouseDownXconst / 11.8) || deltaXMotion < - (mouseDownXconst / 11.8)) {        // если дельта достаточная и положительная
            mouseDownX += Math.floor(deltaXMotion * 1.5)        // перезаписывем стартовое положение
            motion(deltaXMotion)                                // двигаем
        }
    }




    // Функции для отслеживания кликов по серой линии

    function clickToItems({ target: itemNumber }) {              // получаем блок, по которому кликнули
        percentsOrangeLine = Math.floor((parseInt(itemNumber.closest('div')?.id) * 12.5) * 10) / 10
        percentsCardsItems = Math.floor((parseInt(itemNumber.closest('div')?.id) * stepOfMotion) * 10) / 10
        orangeLine.style.marginLeft = `${percentsOrangeLine}%`
        cardsItems.style.marginLeft = `-${percentsCardsItems}%`
    }
}