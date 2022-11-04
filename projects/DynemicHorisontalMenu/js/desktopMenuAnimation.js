const menu = document.querySelector('.menu');
const yMass = [0, 1]

document.addEventListener('scroll', () => { 
    mass()
    moveMenu()
})

function mass() {
    yMass.unshift(window.pageYOffset)
    yMass.splice(2, 1)
}

function moveMenu() {
    if (window.pageYOffset >= 300 && yMass[0] > yMass[1]) {
        menu.style.transform = 'translateY(-100%)'
        menu.style.transition = '.3s ease'
        menu.style.transitionProperty = 'transform';
    
    }
    else menu.style.transform = 'translateY(0%)'
}