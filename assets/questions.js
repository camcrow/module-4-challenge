const quizQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings","booleans","alerts","numbers"],
        correctChoice: 3
    },
    {
        question: "The condition in an if / else statement is enclosed within _____.",
        choices: ["quotes","curly brackets","parentheses","square brackets"],
        correctChoice: 3
    },
    {
        question: "Arrays in Javascript can be used to store _____.",
        choices: ["numbers and strings","other arrays","booleans","all of the above"],
        correctChoice: 4
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["commas","curly brackets","quotes","parenthesis"],
        correctChoice: 3
    },
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript","terminal/bash","for loops","console log"],
        correctChoice: 4
    },
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;
let score = 0;

const startBtn = document.querySelector("#start-btn");
const quizScreen = document.querySelector("#quiz-screen");
const questionNumberEl = document.querySelector("#question-number");
const questionEl = document.querySelector("#question");
const choicesEl = document.querySelector("#choices");
const feedbackEl = document.querySelector("#feedback");
const timeLeftEl = document.querySelector("#time-left");
const endScreen = document.querySelector("#end-screen");
const finalScoreEl = document.querySelector("#final-score");
const initialsInput = document.querySelector("#initials");
const submitBtn = document.querySelector("#submit-btn");

function quizStart() {
  document.querySelector("#start-screen").classList.add("hidden");
  quizScreen.classList.remove("hidden");

  timerStart();

  showQuestion();
}

function timerStart() {

  timeLeftEl.textContent = timeLeft;


  timerInterval = setInterval(() => {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;

    if (timeLeft === 0) {
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {

  const currentQuestion = quizQuestions[currentQuestionIndex];


  questionNumberEl.textContent = currentQuestionIndex + 1;
  questionEl.textContent = currentQuestion.question;


  choicesEl.innerHTML = "";
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    const choice = currentQuestion.choices[i];

    const choiceBtn = document.createElement("button");
    choiceBtn.classList.add("choice-btn");
    choiceBtn.textContent = choice;
    choiceBtn.dataset.answer = i === currentQuestion.correctChoice;

    choiceBtn.addEventListener("click", handleAnswer);

    choicesEl.appendChild(document.createElement("li").appendChild(choiceBtn));
  }
}

function handleAnswer(event) {

  const clickedBtn = event.target;

  const isCorrect = clickedBtn.dataset.answer === "true";
  if (isCorrect) {
    feedbackEl.textContent = "Correct";
    score++;
  } else {
    feedbackEl.textContent = "Incorrect";
    timeLeft -= 15;
  }

  
  currentQuestionIndex++;

  if (currentQuestionIndex === quizQuestions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

function endQuiz() {

  clearInterval(timerInterval);

  quizScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");

  finalScoreEl.textContent = score;
}

function saveScore(event) {
 
  event.preventDefault();

  const initials = initialsInput.value.trim();


  if (initials === "") {
    alert("Please enter your initials.");
    return;
  }

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ initials, score });
  localStorage.setItem("highScores", JSON.stringify(highScores));

  window.location.href = "high-scores.html";
}

startBtn.addEventListener("click", quizStart);
submitBtn.addEventListener("click", saveScore);