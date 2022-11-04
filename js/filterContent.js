const home = document.querySelector('.home')
const posts = document.querySelector('.posts')
const myMenu = document.querySelector('.menu')

posts.style.display = "none"

const panelEvents = [
    { type: 'home' },
    { type: 'posts' },
    { type: 'about' },
    { type: 'contacts' }
] 

myMenu.addEventListener('click', clickOnPanel) 

function clickOnPanel(event) {
    event.preventDefault()
    const data = event.target.dataset
    if (data.type === undefined) {
        return
    } else {
        for (let i = 0; i < (panelEvents.length); i++) {
            if (data.type === panelEvents[i].type) {
                document.querySelector('.' + `${panelEvents[i].type}`).style.display = ''
            } else {
                document.querySelector('.' + `${panelEvents[i].type}`).style.display = 'none'
            }
        }
    }
}