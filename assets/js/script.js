const container = document.getElementsByClassName("container");
const startButton = document.getElementById("start");
const homeLink = document.getElementById("homeLink");
const HighScoreLink = document.getElementById("HighScoreLink");

// questions and answers for quiz
const questions = ["what stores key value pairs in js?", "what starts a countdown timer in JS?", "what tag is used to link js in html?", "what is the correct syntax for a function in js?", "what does DOM stand for?",]
const q1Answer = ["objects", "arrays", "variables", "elements"]
const q2Answer = ["setTimer", "startInterval", "startTimer", "setInterval"]
const q3Answer = ["link", "script", "meta", "input"]
const q4Answer = ["function = myFunction()", "function myFunction()", "functionmyFunction()", "function (myFunction)"]
const q5Answer = ["Document Object Model", "Document Object Method", "Domestic Object Model", "Document Objection Method"]


const answers = [q1Answer, q2Answer, q3Answer, q4Answer, q5Answer,]
let questionIndex = 0;
let score = 0;
timeLeft = 300;


// document event listeners for start button, home link, and high score link
document.addEventListener("click", function (event) {
    switch (event.target.id) {
        case "start":
            startQuiz();
            break;
        case "homeLink":
            this.location.reload();
            break;
        case "HighScoresLink":
            showHighScore();
            break;
    }
});

// start quiz logic
function startQuiz() {
    clearPage();
    startTimer();
    loadQuestion();
}

// timer logic
function startTimer() {
    let timerInterval = setInterval(function () {
        timeLeft--;
        document.getElementById("timeLeft").textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        } if (questionIndex === 5) {
            clearInterval(timerInterval);
            endGame();
        } if (timeLeft < 0) {
            clearInterval(timerInterval);
            timeLeft = 0;
            endGame();
        }
    }, 1000);
}


// show high score logic and render high score
function showHighScore() {
    clearPage();
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const highScoresDiv = document.createElement("div");
    highScoresDiv.setAttribute("id", "highScores");
    container[0].appendChild(highScoresDiv);
    const highScoresHeader = document.createElement("h2");
    highScoresHeader.textContent = "High Scores";
    highScoresDiv.appendChild(highScoresHeader);
    const highScoresList = document.createElement("ol");
    highScoresList.setAttribute("id", "highScoresList");
    highScoresDiv.appendChild(highScoresList);
    for (let i = 0; i < highScores.length; i++) {
        const highScore = document.createElement("li");
        highScore.textContent = highScores[i].initials + " - " + highScores[i].score;
        highScoresList.appendChild(highScore);
    }
    const goBackButton = document.createElement("button");
    goBackButton.setAttribute("id", "goBack");
    goBackButton.textContent = "Go Back";
    highScoresDiv.appendChild(goBackButton);
    const clearHighScoresButton = document.createElement("button");
    clearHighScoresButton.setAttribute("id", "clearHighScores");
    clearHighScoresButton.textContent = "Clear High Scores";
    highScoresDiv.appendChild(clearHighScoresButton);
    document.addEventListener("click", function (event) {
        switch (event.target.id) {
            case "goBack":
                this.location.reload();
                break;
            case "clearHighScores":
                resetScore();
                renderhighScores();
                break;
        }
    });
}
// clears container of all elements
function clearPage() {
    container[0].innerHTML = "";
}

// loads question and answers
function loadQuestion() {
    // create question element
    if (questionIndex < 5) {
        const questionDiv = document.createElement("div");
        questionDiv.setAttribute("id", "question");
        container[0].appendChild(questionDiv);
        const question = document.createElement("h2");
        question.textContent = questions[questionIndex];
        questionDiv.appendChild(question);
        // create answer elements
        for (let i = 0; i < answers[questionIndex].length; i++) {
            const answer = document.createElement("button");
            answer.textContent = answers[questionIndex][i];
            answer.setAttribute("id", "option" + i);
            questionDiv.appendChild(answer);
        }
        checkAnswer();
    } else {
        endGame();
    }
};

// checks answer
function checkAnswer() {
    const questionDiv = document.getElementById("question");
    questionDiv.addEventListener("click", function (event) {
        if ((questionIndex === 0 && event.target.id === "option0")
            || (questionIndex === 1 && event.target.id === "option3")
            || (questionIndex === 2 && event.target.id === "option1") ||
            (questionIndex === 3 && event.target.id === "option1") ||
            (questionIndex === 4 && event.target.id === "option0")
        ) {
            score = score + 100;
            refreshScoreCount();
            questionIndex++;
            clearPage();
            loadQuestion();
        } else {
            score = score - 50;
            timeLeft = timeLeft - 100;
            refreshScoreCount();
            questionIndex++;
            clearPage();
            loadQuestion();
        }
    })
}

function endGame() {
    clearPage();
    // set timer to 0
    timeLeft = 1;
    // create end game div
    const endGameDiv = document.createElement("div");
    endGameDiv.setAttribute("id", "endGame");
    container[0].appendChild(endGameDiv);
    const endGame = document.createElement("h2");
    endGame.textContent = "Game Over";
    endGameDiv.appendChild(endGame);
    const scoreDisplay = document.createElement("h3");
    scoreDisplay.textContent = "Your score is: " + score;
    endGameDiv.appendChild(scoreDisplay);
    const initials = document.createElement("input");
    initials.setAttribute("type", "text");
    initials.setAttribute("id", "initials");
    initials.setAttribute("placeholder", "Enter initials");
    endGameDiv.appendChild(initials);
    const saveScoreButton = document.createElement("button");
    saveScoreButton.setAttribute("id", "saveScore");
    saveScoreButton.textContent = "Save Score";
    endGameDiv.appendChild(saveScoreButton);
    const resetScoreButton = document.createElement("button");
    resetScoreButton.setAttribute("id", "resetScore");
    resetScoreButton.textContent = "Reset Scores";
    endGameDiv.appendChild(resetScoreButton);
    const ResetGameButton = document.createElement("button");
    ResetGameButton.setAttribute("id", "ResetGame");
    ResetGameButton.textContent = "Reset Game";
    endGameDiv.appendChild(ResetGameButton);
    const highScoresDiv = document.createElement("div");
    highScoresDiv.setAttribute("id", "highScores");
    endGameDiv.appendChild(highScoresDiv);
    const highScoresHeader = document.createElement("h2");
    highScoresHeader.textContent = "High Scores";
    highScoresDiv.appendChild(highScoresHeader);
    renderhighScores();
    resetTimer();



    endGameDiv.addEventListener("click", function (event) {
        switch (event.target.id) {
            case "saveScore":
                saveScore();
                break;
            case "resetScore":
                resetScore();
                break;
            case "ResetGame":
                location.reload();
                break;
        }
    })
}



function saveScore() {
    const initials = document.getElementById("initials").value.toUpperCase();
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    renderhighScores();
}

function resetScore() {
    localStorage.clear();
    renderhighScores();
}

function renderhighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const highScoresDiv = document.getElementById("highScores");
    const highScoresList = document.createElement("ul");
    highScoresDiv.appendChild(highScoresList);
    for (let i = 0; i < highScores.length; i++) {
        const highScore = document.createElement("li");
        highScore.textContent = highScores[i].initials + " - " + highScores[i].score;
        highScoresList.appendChild(highScore);
    }
}


function refreshScoreCount() {
    const currentScore = document.getElementById("currentScore");
    currentScore.textContent = score;
}

function resetTimer() {
    const timer = document.getElementById("timeLeft");
    timer.textContent = 0;
}

