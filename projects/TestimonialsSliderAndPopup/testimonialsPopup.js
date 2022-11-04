testimonialsPopup()

function testimonialsPopup() {

    let cardsItems = document.querySelector('.testimonials-cards')
    let cardsItemsArray = document.querySelectorAll('.testimonials-card')
    let background = document.querySelector('.top-mobile-menu-background')
    let div = document.createElement('div');
    let content = ''
    let closeButton = ''

    cardsItems.addEventListener('click', popupOpen)
    background.addEventListener('click', popupClose)

    function popupOpen({ target: itemNumber }) {
        console.log('click')
        if ((itemNumber.closest('div')?.id) != '') {
            background.style.display = 'block'
            content = (cardsItemsArray[parseInt(itemNumber.closest('div')?.id)])
            div.classList.add('testimonials-duble')
            div.innerHTML = '<img src="icons/x_icon.svg" class="close-button-for-testimonials">' + content.innerHTML
            document.body.append(div)
            closeButton = document.querySelector('.close-button-for-testimonials')
            closeButton.addEventListener('click', popupClose)
        }
    }

    function popupClose({ target: itemNumber }) {
        div.remove()
        background.style.display = 'none'
    }
}