let boxes = document.querySelectorAll(".box ");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector('#msg');


let turn0 = true;

let count = 0;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turn0 =true;
    enableBoxes();
    msgContainer.classList.add("hide")
    count = 0;
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {//player O
            box.innerText= "O";
            turn0=false;
        } else{//player x
            box.innerText="X";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if( count === 9 && !isWinner){
            matchDdraw();
        }
        
    });
});


const disableBoxes = () => {
    for(box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText="";
    }
};

const matchDdraw = () => {
      
    msg.innerText = `This Match is DRAW`;
    msgContainer.classList.remove("hide");
    box.disabled = true;
    count = 0;
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide")
    count = 0;
};

const checkWinner = () => {
    for(let pattern of winPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos2Val != "" && pos2Val != "" && pos2Val != "" ){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner", pos1Val);
                disableBoxes();
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
