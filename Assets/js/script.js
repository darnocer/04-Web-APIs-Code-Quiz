// GLOBAL VARIABLES

// timer display
var countdownEl = document.querySelector("#countdown");
// start quiz button
var startBtn = document.querySelector("#start-button");
// start quiz container
var quizStartEl = document.querySelector("#start-quiz");
// quiz questions container
var quizQuestionsEl = document.querySelector("#quiz-questions");
// question text
var questionText = document.querySelector("#question-text");
// code text container
var codeEl = document.querySelector("#code");
// to display formatted code in questions
var codeText = document.querySelector(".code");
// choice buttons
var choiceBtns = document.querySelectorAll(".choice");
// answer feedback (correct vs incorrect)
var feedbackText = document.querySelector("#feedback-text");
// game over container
var quizCompleteEl = document.querySelector("#complete");
// final score text
var finalScoreEl = document.querySelector("#final-score");
// submit score button
var submitScoreBtn = document.querySelector("#submit-score");
// user-entered initials
var userInitialsInput = document.querySelector("#initials");

// correct answer for current question
var correctAnswer;
// answer choice button selected by user
var userAnswer;
// index of questions
var index;
// timer interval
var timerInterval;
//calculated score
var finalScore;
// total time reamining to complete quiz
var timeLeft;
// starting score
var score;
// added to score for correct answer
var correct = 15;
// subtracted from time for incorrect answer
var penalty = 15;
// subtracted from score for incorrect answers
var incorrect = 15;
// possible options for each question (corresponds to button IDs)
var options = ["a", "b", "c", "d"];

// when start button clicked, initialize and hide intro container and display questions container
function startQuiz() {
  init();
  console.log("start button clicked");
  quizStartEl.classList.add("d-none");
  quizQuestionsEl.classList.remove("d-none");
  displayQuestions();
  startTimer();
}

// reset time and score
function init() {
  index = 0;
  timeLeft = 75;
  score = 0;
  finalScore = 0;
  penaltyCount = 0;
  quizStartEl.classList.remove("d-none");
  quizQuestionsEl.classList.add("d-none");
}

// Start counting down the timer each second
function startTimer() {
  countdownEl.textContent = timeLeft;
  timerInterval = setInterval(function () {
    timeLeft--;
    countdownEl.textContent = timeLeft;

    if (timeLeft === 0) {
      gameOver();
    }
  }, 1000);
}

// display questions
function displayQuestions() {
  if (index < myQuestions.length) {
    questionText.textContent = myQuestions[index].question;

    // to display code text if it is a part of the question
    if (myQuestions[index].code === "") {
      // hide the code div if code is not a part of the question
      codeEl.classList.add("d-none");
    }

    if (myQuestions[index].code !== "") {
      codeEl.classList.remove("d-none");
      codeText.innerHTML = myQuestions[index].code;
    }
    displayChoices();
  } else {
    gameOver();
  }
}

// populate buttons with question choices
function displayChoices() {
  console.log("displaying choices");
  for (j = 0; j < options.length; j++) {
    choiceBtns[j].textContent = myQuestions[index].choices[options[j]];
  }
}

// compare user answer to correct answer
function checkAnswer(correctAnswer, userAnswer) {
  correctAnswer = myQuestions[index].answer;
  userAnswer = this.id;
  if (userAnswer === correctAnswer) {
    answerCorrect();
  } else {
    answerIncorrect();
  }
  // go to next question
  index++;
  displayQuestions();
}

// displays green text and increases score
function answerCorrect() {
  feedbackText.setAttribute("style", "color: green");
  feedbackText.textContent = "Correct! Isn't that fantastic?";
  score = score + correct;
}

// displays red text and subtracts time and score penalty
function answerIncorrect() {
  feedbackText.setAttribute("style", "color: red");
  feedbackText.textContent = "Not all mistakes are happy accidents...";
  score = score - incorrect;
  timeLeft = timeLeft - penalty;
}

// when timer runs out or when last question is answered
function gameOver() {
  clearInterval(timerInterval);
  quizQuestionsEl.classList.add("d-none");
  quizCompleteEl.classList.remove("d-none");
  calcFinalScore();
  finalScoreEl.textContent = finalScore;
}

// 15 points for each correct, -15 points for incorrect; plus remaining time
function calcFinalScore() {
  finalScore = score + timeLeft;
}

// var allHighScores;

function saveScore() {
  var initials = userInitialsInput.value;

  var userScoreObj = {
    initials: initials,
    score: finalScore,
  };

  var allHighScores = localStorage.getItem("storedScoreKey");

  if (allHighScores == null) {
    localStorage.setItem("storedScoreKey", JSON.stringify([userScoreObj]));
  } else {
    storedScoreKey = JSON.parse(allHighScores);
    storedScoreKey.push(userScoreObj);
    localStorage.setItem("storedScoreKey", JSON.stringify(storedScoreKey));
  }

  // go to high scores page
  window.location.href = "highscores.html";
}

// EVENT LISTENERS
// initialize on start
startBtn.addEventListener("click", startQuiz);

// any time an answer button is selected
for (var choiceBtn of choiceBtns) {
  choiceBtn.addEventListener("click", checkAnswer);
}

// submit score button takes you to high score page
submitScoreBtn.addEventListener("click", saveScore);
