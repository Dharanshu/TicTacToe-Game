let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector(".reset-btn")
let play = document.querySelector("h2")
let hideBox = document.querySelector(".container")
let msg = document.querySelector(".msg")
let msg2 = document.querySelector(".msg2")
let msgContainer = document.querySelector(".hide")
let newGameBtn = document.querySelector(".new-btn")
let gamePanel = document.querySelector(".gamePannel")
let startGame = document.querySelector(".startGame")
let turn = document.querySelector(".turn")



let turnO = true;
let count = 0;

let winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]


let gameBegins = () => {
    gamePanel.classList.remove("gamePannel")
    turn.innerText = `Player O Turn`

}

let hide = () => {
    startGame.classList.remove("startGame")
    startGame.classList.add("hide2")
}

startGame.addEventListener("click", hide)
startGame.addEventListener("click", gameBegins)

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O"
            box.classList.add("o")
            turnO = false
            play.remove()
            turn.innerText = `Player X Turn`
        }
        else {
            box.innerText = "X"
            box.classList.add("x")
            turnO = true
            turn.innerText = `Player O Turn`
        }
        box.disabled = true;
        count++

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            drawMatch();
        }
    })
});

const resetGame = () => {
    for (let box of boxes) {
        turnO = true;
        count = 0;
        box.disabled = false
        box.innerText = ""
        box.classList.remove("x", "o")
        hideBox.prepend(play)
        msgContainer.classList.add("hide")
        hideBox.classList.remove("none")
        turn.innerText = `Player O Turn`

    }
}

resetBtn.addEventListener("click", resetGame)
newGameBtn.addEventListener("click", resetGame)

const checkWinner = () => {
    for (let pattern of winPattern) {
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if (position1 != "" && position2 != "" && position3 != "") {
            if (position1 === position2 && position2 === position3) {
                for (let box of boxes) {
                    box.disabled = true;
                }
                showWinner(position1)
            }
        }
    }
}

const showWinner = (winner) => {
    msg.innerText = `🏆 Well played, ${winner}! Victory is yours!`
    msg2.innerText = "Start New Game 👇"
    newGameBtn.innerText = "New Game"
    msgContainer.classList.remove("hide")
    hideBox.classList.add("none")
}

let drawMatch = () => {
    msg.innerText = "Match is Draw "
    msg2.innerText = "Start New Game 👇"
    newGameBtn.innerText = "New Game"
    msgContainer.classList.remove("hide")
    hideBox.classList.add("none")
}