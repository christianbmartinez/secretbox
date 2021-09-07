const game = document.getElementById('game')
let triesRemaining = document.getElementById('tries-remaining')
const randomBox = Math.floor(Math.random() * 36)
const winningBox = game.children[randomBox]
let numOfClicks = 0
const difficulty = document.getElementById("difficulty")
let person
const pop = new Audio('/audio/pop.mp3')
const win = new Audio('/audio/win.mp3')
const lose = new Audio('/audio/lose.mp3')

window.onload = () => {
    person = prompt('What is your name?', 'Jack')
    window.alert(`${person}, find the green box within ${sessionStorage.getItem('difficulty') ? `${sessionStorage.getItem('difficulty')} tries or you'll lose. Good luck!` : 
    '15 tries! Good Luck!'}`)
    triesRemaining.innerHTML = sessionStorage.getItem('difficulty') ? `Tries remaining: 0/${sessionStorage.getItem('difficulty')}` : 
    'Tries remaining: 0/15'
}

difficulty.onchange = e => {
    sessionStorage.setItem('difficulty', e.path[0].value)
    window.location.reload()
}

if (!sessionStorage.getItem('difficulty')) {
    sessionStorage.setItem('difficulty', difficulty.value)
} else {
    sessionStorage.getItem('difficulty')
    for (i = 0; i < difficulty.children.length; i++) {
        if (difficulty.children[i].attributes[0].nodeValue === sessionStorage.getItem('difficulty')) {
            difficulty.children[i].selected = 'selected'
        }
    }
}

game.onclick = e => {
    const userSelection = e.path[0]
    let userSelectionID = userSelection.id

    if (userSelectionID === 'game') {
        game.style.setProperty('background-color', 'white')  
    } 

    if (!userSelection.style.backgroundColor) {
        userSelection.style.setProperty('background-color', 'gray') 
        pop.play()
        numOfClicks++
        userSelection.style.setProperty('animation', 'PulseInOut .8s ease-in-out')
        triesRemaining.innerHTML = `Tries remaining: ${numOfClicks}/${difficulty.value}`
    } else if (userSelection.style.backgroundColor === 'gray') {
        numOfClicks = numOfClicks
    } 

    if (userSelectionID === winningBox.id && numOfClicks <= difficulty.value ) {
        winningBox.style.setProperty('background-color', 'green')
        win.play()
        setTimeout(() => {
            window.alert(`Congrats ${person}! You won!`)
            window.location.reload()
        }, 600)
    } else if (numOfClicks >= difficulty.value) {
        winningBox.style.setProperty('background-color', 'green')
        lose.play()
        window.alert(`You lose. Try again ${person}!`)
        setTimeout(() => {
            window.location.reload()
        }, 600)
    }

}



// They have to guess within 15 tries to find the winning box.
// Easy, Hard, Insane modes
// Winning box always changes
// A system to keep track of the wins
// An animation system every time they use a try, and when they lose/win



