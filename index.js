let questions = []
let quizContainer = document.getElementById("quiz-container")
function getData() {
    fetch("https://the-trivia-api.com/v2/questions").then(res => res.json()).then((res) => {
        questions = res;
        document.getElementById("startQuiz").disabled = false;
    })
}
getData();
document.getElementById("startQuiz").disabled = true;
let currentQuestion = 0;
let score = 0;
let userAnswer = null;
let timeLeft = 20;
let timerInterval;

function showQuestion() {
    
    quizContainer.style.display = "block";

    
    let current = questions[currentQuestion];

    
    let questionElement = document.getElementById("question");
    let optionElement = document.getElementById("options");

    
    questionElement.textContent = current.question.text;

    
    let allOptions = [...current.incorrectAnswers, current.correctAnswer];

    
    optionElement.innerHTML = "";

    
    for (let i = 0; i < allOptions.length; i++) {
        optionElement.innerHTML += `
            <div onclick="saveAnswer(event)" class="option">${allOptions[i]}</div>
        `;
    }

    
    startTimer();
}

function saveAnswer(event) {
    let allOption = document.querySelectorAll(".option")
    allOption.forEach(option => option.classList.remove("active"))
    event.target.classList.add("active")
    userAnswer = event.target.innerText;
    document.getElementById("nextBtn").disabled = false;
   
}

function incrementQuestion() {
    if (userAnswer === questions[currentQuestion].correctAnswer) {
        score += 10;
    }
    clearInterval(timerInterval)
    currentQuestion++;
    userAnswer = null;

    document.getElementById("score").textContent = "Score: " + score;
    if (currentQuestion === questions.length - 1){
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("finishQuiz").style.display = "block";
    }
    if (currentQuestion < questions.length) {
        showQuestion();
    }

    document.getElementById("nextBtn").disabled = true;

}


function startTimer() {
    timeLeft = 20;
    document.getElementById("timer").textContent = `Time Left${timeLeft}s`;
    document.getElementById("timer").style.color = "black";
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time Left${timeLeft}s`
        if (timeLeft <= 5) {
            document.getElementById("timer").style.color = "red";
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval)
            incrementQuestion()
        }
    }, 1000);
}

function startQuiz() {

    currentQuestion = 0;
    score = 0;
    userAnswer = null;

    document.getElementById("startQuiz").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("nextBtn").style.display = "block";
    document.getElementById("finishQuiz").style.display = "none";
    document.getElementById("score").textContent = "Score: 0";
    document.getElementById("timer").style.display = "block";
    document.getElementById("result-container").style.display = "none";
    showQuestion()
}

function finishQuiz() {
    if (userAnswer && userAnswer === questions[currentQuestion].correctAnswer) {
        score += 10;
    }
    clearInterval(timerInterval);

    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("final-score").textContent = score;
    document.getElementById("restartQuiz").style.display = "block";
    document.getElementById("finishQuiz").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("score").textContent = "Score: " + score;
}

function restartQuiz() {

    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "none";
    document.getElementById("restartQuiz").style.display = "none";
    document.getElementById("startQuiz").style.display = "block";
    document.getElementById("timer").style.display = "none";
    document.getElementById("nextBtn").disabled = true;

}

// let questions = [
//     {
//         question: "What is your age?",
//         option: [10, 21, 31, 50],
//         answer: 21
//     },
//     {
//         question: "Where do you live?",
//         option: ["Islamabad", "Peshawar", "Muree", "Karachi"],
//         answer: "Karachi"
//     },
//     {
//         question: "What do you play?",
//         option: ["football", "cricket", "baseball", "tennis"],
//         answer: "football"
//     }
// ];

// let currentQuestion = 0;
// let score = 0;
// let userAnswer = null;
// let timeLeft = 20;
// let timerInterval;

// function showQuestion() {
//     let questionElement = document.getElementById("question");
//     let optionElement = document.getElementById("options");

//     questionElement.textContent = questions[currentQuestion].question;
//     optionElement.innerHTML = "";

//     let options = questions[currentQuestion].option;
//     for (let i = 0; i < options.length; i++) {
//         optionElement.innerHTML += `
//             <div onclick="saveAnswer(event)" class="option">${options[i]}</div>`;
//     }

//     startTimer();
// }

// function saveAnswer(event) {
//     let options = document.querySelectorAll(".option");
//     for (let i = 0; i < options.length; i++) {
//         options[i].classList.remove("active");
//     }

//     event.target.classList.add("active");
//     userAnswer = event.target.innerText;
//     document.getElementById("nextBtn").disabled = false;
// }

// function incrementQuestion() {
//     if (userAnswer === questions[currentQuestion].answer) {
//         score += 10;
//     }

//     clearInterval(timerInterval);
//     currentQuestion++;
//     userAnswer = null;

//     document.getElementById("score").textContent = "Score: " + score;

//     if (currentQuestion === questions.length - 1) {
//         document.getElementById("nextBtn").style.display = "none";
//         document.getElementById("finishQuiz").style.display = "block";
//     }

//     if (currentQuestion < questions.length) {
//         showQuestion();
//     }

//     document.getElementById("nextBtn").disabled = true;
// }

// function startTimer() {
//     timeLeft = 20;
//     let timerText = document.getElementById("timer");
//     timerText.style.color = "black";
//     timerText.textContent = `Time Left: ${timeLeft}s`;

//     timerInterval = setInterval(function () {
//         timeLeft--;
//         timerText.textContent = `Time Left: ${timeLeft}s`;

//         if (timeLeft <= 5) {
//             timerText.style.color = "red";
//         }

//         if (timeLeft <= 0) {
//             clearInterval(timerInterval);
//             incrementQuestion();
//         }
//     }, 1000);
// }

// function startQuiz() {
//     currentQuestion = 0;
//     score = 0;
//     userAnswer = null;

//     document.getElementById("startQuiz").style.display = "none";
//     document.getElementById("quiz-container").style.display = "block";
//     document.getElementById("nextBtn").style.display = "block";
//     document.getElementById("finishQuiz").style.display = "none";
//     document.getElementById("score").textContent = "Score: 0";
//     document.getElementById("timer").style.display = "block";
//     document.getElementById("result-container").style.display = "none";

//     showQuestion();
// }

// function finishQuiz() {
//     if (userAnswer === questions[currentQuestion].answer) {
//         score += 10;
//     }

//     clearInterval(timerInterval);

//     document.getElementById("quiz-container").style.display = "none";
//     document.getElementById("result-container").style.display = "block";
//     document.getElementById("final-score").textContent = score;
//     document.getElementById("restartQuiz").style.display = "block";
//     document.getElementById("finishQuiz").style.display = "none";
//     document.getElementById("timer").style.display = "none";
//     document.getElementById("score").textContent = "Score: " + score;
// }

// function restartQuiz() {
//     document.getElementById("quiz-container").style.display = "none";
//     document.getElementById("result-container").style.display = "none";
//     document.getElementById("restartQuiz").style.display = "none";
//     document.getElementById("startQuiz").style.display = "block";
//     document.getElementById("timer").style.display = "none";
//     document.getElementById("nextBtn").disabled = true;
// }
