
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Quiz Game</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #141e30, #243b55);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }

        .quiz-box {
            background: #1e293b;
            padding: 30px;
            border-radius: 15px;
            width: 90%;
            max-width: 450px;
            text-align: center;
            box-shadow: 0 0 20px #0005;
        }

        h1 {
            color: #38bdf8;
        }

        #question {
            margin: 25px 0;
        }

        button {
            display: block;
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: none;
            border-radius: 8px;
            background: #334155;
            color: white;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background: #0284c7;
        }

        #next {
            background: #38bdf8;
            color: #0f172a;
            font-weight: bold;
        }

        #result {
            color: #4ade80;
            font-size: 22px;
        }
    </style>
</head>

<body>

<div class="quiz-box">
    <h1>⚡ Quiz Challenge</h1>
    <p id="progress">Question 1</p>
    <h3 id="question">Question appears here</h3>

    <div id="answers"></div>

    <p id="feedback"></p>
    <button id="next" onclick="nextQuestion()" hidden>
        Next Question →
    </button>

    <h2 id="result"></h2>
    <button id="restart" onclick="restartQuiz()" hidden>
        Play Again 🔄
    </button>
</div>

<script>
const quiz = [
    {
        question: "1. Which language structures a web page?",
        answers: ["Python", "HTML", "Java", "C++"],
        correct: 1
    },
    {
        question: "2. Which language adds interactivity to websites?",
        answers: ["CSS", "SQL", "JavaScript", "HTML"],
        correct: 2
    },
    {
        question: "3. What does CSS control?",
        answers: ["Website styling", "Database", "Server hardware", "Passwords"],
        correct: 0
    },
    {
        question: "4. Which symbol starts a JavaScript comment?",
        answers: ["##", "//", "<!--", "**"],
        correct: 1
    },
    {
        question: "5. Which keyword declares a variable?",
        answers: ["var", "print", "style", "heading"],
        correct: 0
    }
];

let current = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next");

function showQuestion() {
    answered = false;
    feedbackEl.textContent = "";
    nextBtn.hidden = true;

    document.getElementById("result").textContent = "";
    document.getElementById("progress").textContent =
        `Question ${current + 1} of ${quiz.length}`;

    questionEl.textContent = quiz[current].question;
    answersEl.innerHTML = "";

    quiz[current].answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(index, button);
        answersEl.appendChild(button);
    });
}

function checkAnswer(index, button) {
    if (answered) return;
    answered = true;

    const correct = quiz[current].correct;

    if (index === correct) {
        score++;
        feedbackEl.textContent = "✅ Correct answer!";
        button.style.background = "#16a34a";
    } else {
        feedbackEl.textContent = "❌ Wrong! Try the next one.";
        button.style.background = "#dc2626";
        answersEl.children[correct].style.background = "#16a34a";
    }

    nextBtn.hidden = false;

    if (current === quiz.length - 1) {
        nextBtn.textContent = "Show Result 🏆";
    }
}
function nextQuestion() {
    current++;
    if (current < quiz.length) {
        nextBtn.textContent = "Next Question →";
        showQuestion();
    } else {
        showResult();
    }
}
function showResult() {
    questionEl.textContent = "Quiz Completed!";
    answersEl.innerHTML = "";
    feedbackEl.textContent = "";
    nextBtn.hidden = true;
    document.getElementById("progress").textContent = "Final Score";
    document.getElementById("result").textContent =
        `${score} / ${quiz.length} 🎉`;
    document.getElementById("restart").hidden = false;
}
function restartQuiz() {
    current = 0;
    score = 0;
    document.getElementById("restart").hidden = true;
    nextBtn.textContent = "Next Question →";
    showQuestion();
}
showQuestion();
</script>
</body>
</html>
