const userScore = 0;
const computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice(){
    const choices = ['r', 'p', 's'];
    choice = Math.floor(Math.random()*3)
    choiceLetter = choices[choice];
    return choiceLetter;
}

function game(userChoice){
    const computerChoice = getComputerChoice();
    console.log("user choice: " + userChoice);
    console.log("computer choice: " + computerChoice);
    switch(userChoice + computerChoice){
        case "rs":
        case "pr":
        case "sp":
            console.log("USER WINS.");
            break;
        case "rp":
        case "ps":
        case "sr":
            console.log("USER LOSES");
            break;
        default:
            console.log("DRAW");
    }
}

function main(){
    rock_div.addEventListener('click', function(){
        game("r");
    });

    paper_div.addEventListener('click', function(){
        game("p");
    });

    scissors_div.addEventListener('click', function(){
        game("s");
    });

}

main();