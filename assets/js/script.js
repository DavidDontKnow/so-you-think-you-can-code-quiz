// Look honestly I forgot this even existed and rushed to try to finish it. 
// Did that work? 
// ...no. 
// Did I learn that I really need stay on top of this stuff? 
// Thats a hard yes. 
// Will this ever happen again?
// probably
// I will finish this though and resubmit
// sorry for wasting your time 
// :(






const section = document.querySelector("section")
const h1 = document.querySelector("h1")
const pTag = document.querySelector("p")
let score = 0;
const button = document.querySelector("#get-started");
const time = document.querySelector("#time")
let timeLeft = 300
const questions = ["what stores key value pairs in js?", "what starts a countdown timer in JS?", "what tag is used to link js in html?"]
const q1Answer = ["objects", "arrays", "variables", "elements"]
const q2Answer = ["setTimer", "startInterval", "startTimer", "setInterval"]
const q3Answer = ["link", "script", "meta", "input"]
const answerChoices = [q1Answer, q2Answer, q3Answer]
var index = 0


button.addEventListener("click", function () {
    startTimer();
    startQuiz();
})

function startTimer() {
    var timerInterval = setInterval(function () {
        timeLeft--;
        time.innerText = timeLeft

        if (timeLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            gameOver()
        }
        if (timeLeft == -1) {
            clearInterval(timerInterval)
        }
    }, 1000);
}

function gameOver() {
    let div = document.querySelector("div");
    let ul = document.querySelector("ul");
    div.removeChild(ul);
    let para = document.querySelector("p");
    para.innerText = "Congratulations you finished!";
    saveHS = document.createElement("button");
    saveHS.setAttribute("id", "hs");
    saveHS.innerText = "Save Highscore";
    reset = document.createElement("button");
    reset.setAttribute("id", "reset")
    reset.innerText = "Restart";
    div.appendChild(saveHS);
    div.appendChild(reset);
    HighscoreOrReset()
}

function HighscoreOrReset() {
    let div = document.querySelector("div");
    let hs = document.getElementById("hs")
    let reset = document.getElementById("reset")
    div.addEventListener("click", (e) => {
        if (e.target == hs) {
            highscoreSave()
        } if (e.target == reset) {
            console.log("reset")
        }
    })
}

function highscoreSave() {
    let div = document.querySelector("div");
    let p = document.querySelector("p")
    p.innerText = "Please enter your initials"
    let hs = document.getElementById("hs")
    let reset = document.getElementById("reset")
    hs.innerText = "save"
    hs.removeAttribute("id")
    hs.setAttribute("id", "save-input")
    let form = document.createElement("input");
    div.appendChild(form)
}



function startQuiz() {
    section.removeChild(h1)
    section.removeChild(pTag)
    section.removeChild(button)

    var div = document.createElement("div")
    var para = document.createElement("p")
    div.appendChild(para)
    var answerList = document.createElement("ul")
    div.appendChild(answerList)
    section.appendChild(div)
    for (var i = 0; i < 4; i++) {
        var answerItem = document.createElement("li")
        answerItem.innerText = "";
        answerItem.setAttribute("id", i)
        answerList.appendChild(answerItem)
    }
    questionGiver(index)
    return div
}



function questionGiver(index) {
    div = document.querySelector("div")
    para = div.querySelector("p")
    if (index < 3) {
        para.innerText = questions[index]
        answerList = div.querySelector("ul")
        answerItem0 = document.getElementById("0")
        answerItem1 = document.getElementById("1")
        answerItem2 = document.getElementById("2")
        answerItem3 = document.getElementById("3")

        answerItem0.innerText = answerChoices[index][0]
        answerItem1.innerText = answerChoices[index][1]
        answerItem2.innerText = answerChoices[index][2]
        answerItem3.innerText = answerChoices[index][3]

        checkAnswer()
    } else {
        gameOver()
        timeLeft = 0
    }
}

function checkAnswer() {
    var div = document.querySelector("div")
    div.addEventListener("click", (e) => {
        console.log(e.target)
        if (
            index == 0 && e.target == answerItem0 ||
            index == 1 && e.target == answerItem3 ||
            index == 2 && e.target == answerItem1
        ) {
            score = score + 100
            console.log(score)
            index++
            questionGiver(index)
        } else {
            index++
            timeDec()
            questionGiver(index)

        }
    }, { once: true })
}



function timeDec() {
    if (timeLeft > 30) {
        timeLeft = timeLeft - 30
    } else {
        timeLeft = 2
    }
}


