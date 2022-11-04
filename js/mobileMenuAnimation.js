const closeButton = document.querySelector('.close')
const mobileMenu = document.querySelector('.menu')
const burgerMenu = document.querySelector('.burger')
const background = document.querySelector('.background')

burgerMenu.addEventListener('click', () => {
    mobileMenu.style.transform = 'translateX(0%)'
    mobileMenu.style.transition = '.3s ease'
    mobileMenu.style.transitionProperty = 'transform'
    background.style.display = 'block'
})

closeButton.addEventListener('click', () => {
    mobileMenu.style.transform = 'translateX(-100%)'
    background.style.zIndex = 'none'
})

background.addEventListener('click', () => {
    mobileMenu.style.transform = 'translateX(-100%)'
    background.style.display = 'none'
})