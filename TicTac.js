let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let currentPlayer = "O";
const player_O = "O";
const player_X = "X";

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = currentPlayer === player_O;
    enableBoxes()
    msgContainer.classList.add("hide");
    msg.innerText = "";
};



const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("highlight");
    }
};

const highLightWinner = (pattern) =>{
    for (let p of pattern){
        boxes[p].classList.add("highlight");
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    currentPlayer = currentPlayer === player_O ? player_X : player_O;
};

const showTie = () =>{
    msg.innerText = `It's a Tie!`;
    msgContainer.classList.remove("hide");
    currentPlayer = currentPlayer === player_O ? player_X : player_O;
}

const checkWinner = () => {
    for(let pattern of winPatterns){

        let [pos1,pos2,pos3] = pattern;
        let box1 = boxes[pos1].innerText;
        let box2 = boxes[pos2].innerText;
        let box3 = boxes[pos3].innerText;

        if(box1 !== "" && box1 === box2 && box2 === box3){
            highLightWinner(pattern);
            showWinner(box1);
            return true;
        }
    }
    if ([...boxes].every(box => box.innerText !== "")) {
        showTie();
        return true;
    }

    return false;
};

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if(box.innerText === ""){//player O
            box.innerText = turnO ? player_O : player_X;
            turnO = !turnO;
            box.disabled = true;

            if(!checkWinner()){
                msg.innerText = `Turn: ${turnO ? player_O : player_X}`;
                msgContainer.classList.remove("hide");

            }
        }
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);