let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice(){
    const choices = ['r', 'p', 's'];
    choice = Math.floor(Math.random()*3)
    choiceLetter = choices[choice];
    return choiceLetter;
}

function convertToWord(letter){
    switch(letter){
        case 'r':
            return 'Rock';
            break;
        case 'p':
            return 'Paper';
        case 's':
            return 'Scissors';
    }
}

function win(userChoice, computerChoice){
    userScore++;
    userScore_span.innerHTML = userScore;
    userChoice = convertToWord(userChoice)
    computerChoice = convertToWord(computerChoice)
    result_div.innerHTML = userChoice + " beats " + computerChoice + ". You win!"
}

function lose(userChoice, computerChoice){
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    userChoice = convertToWord(userChoice)
    computerChoice = convertToWord(computerChoice)
    result_div.innerHTML = computerChoice + " beats " + userChoice + ". Computer wins!"
}

function draw(userChoice, computerChoice){
    userChoice = convertToWord(userChoice)
    computerChoice = convertToWord(computerChoice)
    result_div.innerHTML = "Both picked " + userChoice + ". It's a draw!"
}

function game(userChoice){
    const computerChoice = getComputerChoice();
    console.log("user choice: " + userChoice);
    console.log("computer choice: " + computerChoice);
    switch(userChoice + computerChoice){
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;
        default:
            draw(userChoice, computerChoice);
            break;
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