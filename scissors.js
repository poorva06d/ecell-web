let userScore=0;
let compScore=0;

const choices= document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let userScorePara = document.querySelector("#user-score");
let compScorePara = document.querySelector("#comp-score");
const genCompChoice = () =>{
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random()*3);    // *3 generates a no between 0-3
    return options[randIdx];
}

const drawGame = () => {
    //console.log("Game was drawn"); 
   msg.innerText = "Game was drawn";
   msg.style.backgroundColor="rgb(3, 3, 55)";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin){
        // console.log("User won !!!");
        userScore++;
        userScorePara.innerText=userScore;
        msg.innerText = `${userChoice} beats ${compChoice} You won!!!`;
        msg.style.backgroundColor = "green";        
    }
    else {
        // console.log("Computer won !!!");
        compScore++;
        compScorePara.innerText=compScore;
        msg.innerText = `${compChoice} beats ${userChoice} You Lost !`;
        msg.style.backgroundColor = "red";        
    }
};

const playGame = (userChoice) => {
    // console.log("user choice was", userChoice);
    const compChoice = genCompChoice();
    // console.log("comp choice was", compChoice);
    if (userChoice === compChoice){
        drawGame();
    }
    else{
        let userWin = true;
        if (userChoice === rock){
            userWin = compChoice === "paper" ? false : true;
        }
        else if (userChoice===paper){
            userWin = compChoice === "scissors" ? false : true;
        }
        else{
            userWin = compChoice === "rock" ? false : true; 
        }
        showWinner(userWin, userChoice, compChoice);
    }
};
choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice =choice.getAttribute("id");
        playGame(userChoice); 
    });
});
