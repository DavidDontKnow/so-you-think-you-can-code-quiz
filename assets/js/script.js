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
    section.removeChild(h1)
    section.removeChild(pTag)
    section.removeChild(button)

    var div = document.createElement("div")
    var para = document.createElement("p")
    div.appendChild(para)
    var answerList = document.createElement("ul")
    div.appendChild(answerList)
    section.appendChild(div)

    var index = 0
    questionGen(index)

    function questionGen(index) {
        para.innerText = questions[index]
        var answers = answerChoices[index]
        for (
            var i = 0; i < 4; i++) {
            var answerItem = document.createElement("li")
            answerItem.innerText = answers[i];
            answerItem.setAttribute("id", i)
            answerList.appendChild(answerItem);
        }


        var option1 = document.getElementById("0")
        var option2 = document.getElementById("1")
        var option3 = document.getElementById("2")
        var option4 = document.getElementById("3")

        function removeQuestion() {
            answerList.removeChild(option1)
            answerList.removeChild(option2)
            answerList.removeChild(option3)
            answerList.removeChild(option4)
        }

        answerList.addEventListener("click", (e) => {
            console.log(e.target)
            checkAnswer(e.target)

            function checkAnswer() {
                if (
                    index == 0 && e.target == option1 ||
                    index == 1 && e.target == option4 ||
                    index == 2 && e.target == option2
                )
                    score = score + 100
                console.log(score)
                index++
                removeQuestion()
                questionGen(index)

            }

        })

    }
}

