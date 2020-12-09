var questions = [{

        quizquestion: "Choose the appropiate datatype for this value: 5.5? ",
        quizchoices:["int", "double", "val","icecream"],
        answer: "double"
    },

    {
        quizquestion: "What is pseudocode?",
        quizchoices: ["iceacream", "teapot", "steve", "mixture of english and programming language"],
        answer: "mixture of english and programming language"
    },

    {
        quizquestion: "What does an object do?",
        quizchoices: ["performs actions and stores data", "it listens to your feelings", "dances", "tik tok famous"],
        quizanswer: "performs actions and stores data"
    },

    {
        quizquestion: "What do you put at the end of Java statement",
        quizchoices: ["semicolon", "icecream", "beats by dre", "shampoo"],
        quizanswer: "semicolon"
    },

    {
        quizquestion: "How do you spell java?",
        quizchoices: ["java", "som", "icecream", "javab"],
        quizanswer: "java"
    }
]

//set the vars equal to their values, current question has to start at -1 

var score = 0;
var currentQuestion = -1;
var timeRemaining = 0;
var timer;

//starts time

function start() {
//90 seconds to complete quiz

    timeRemaining = 90;
    document.getElementById("timeRemaining").innerHTML = timeRemaining;

    timer = setInterval(function() {
        timeRemaining--;
        //reduces the time by one second, than ends game when the timer hits 0
        document.getElementById("timeRemaining").innerHTML = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}

//stop the timer to end the game 
//Also allows the score to be saved

function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="saveScore()">Save Your Score Here</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function saveScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="resetScore()">Press to Reset Scores</button><button onclick="resetGame()">Press To Play Again</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//this button resets the score
function resetScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeRemaining = 0;
    timer = null;

    document.getElementById("timeRemaining").innerHTML = timeRemaining;

    var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//remove 0 points when question is wrong

function incorrect() {
    score -= 0; 
    next();
}

//add 0 points when question is right

function correct() {
    score += 20;
    next();
}

// function that runs through the questions
function next() {
    currentQuestion++;
//next question
    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].quizquestion + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].quizchoices.length; buttonLoop++) {

        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 

        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].quizchoices[buttonLoop]);

        if (questions[currentQuestion].quizchoices[buttonLoop] == questions[currentQuestion].quizanswer) {

            buttonCode = buttonCode.replace("[ANS]", "correct()");

        } else {

            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}