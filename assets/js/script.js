const section = document.querySelector("section")
const button = document.querySelector("#get-started");
const time = document.querySelector("#time")
let timeLeft = 300
const questions = ["what stores key value pairs in js?", "what starts a countdown timer in JS?", "what tag is used to link js in html?"]



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
        }
    }, 1000);
}

function startQuiz() {
    var div = document.createElement("div")
    var para = document.createElement("p")
    div.appendChild(para)
    para.innerText = questions[Math.floor(Math.random() * questions.length)]
    section.appendChild(div)
}