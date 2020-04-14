// GLOBAL VARIABLES

// timer display
var countdownEl = document.querySelector("#countdown");
// start quiz button
var startBtn = document.querySelector("#start-button");
// welcome container
var quizStartEl = document.querySelector("#start-quiz");
// quiz questions container
var quizQuestionsEl = document.querySelector("#quiz-questions");
// question text
var questionText = document.querySelector("#question-text");
// div for question choices buttons
var questionChoices = document.querySelector("#question-choices");
// choice buttons
var choiceBtns = document.querySelectorAll(".choice");
// answer feedback (correct vs incorrect)
var feedbackText = document.querySelector("#feedback-text");
// game over container
var quizCompleteEl = document.querySelector("#complete");
// display final score
var finalScoreEl = document.querySelector("#final-score");
// submit score button
var submitScoreBtn = document.querySelector("#submit-score");
// user-entered initials
var userInitialsInput = document.querySelector("#initials");
// clear high scores local storage
var clearHighscoresBtn = document.querySelector("#clear");
// take quiz again button
var repeatQuizBtn = document.querySelector("#repeat-quiz");
// high scores list element
var highScoreListEl = document.querySelector("#highscores-list");

// correct answer for current question
var correctAnswer;
// button selected by user
var userAnswer;
// index of questions
var index;
var timerInterval;
var finalScore;

// total time to complete quiz
var timeLeft;
// starting score
var score;
// added to score for correct answer
var correct = 15;
// subtracted from time for incorrect answer
var penalty = 15;
// possible options for each question (corresponds to button IDs)
var options = ["a", "b", "c", "d"];

// INITIALIZE
// when start button clicked, replace intro container with questions and start timer
function init() {
  index = 0;
  timeLeft = 75;
  score = 0;
  finalScore = 0;
  quizStartEl.classList.remove("d-none");
  quizQuestionsEl.classList.add("d-none");
}

function startQuiz() {
  init();
  console.log("start button clicked");
  quizStartEl.classList.add("d-none");
  quizQuestionsEl.classList.remove("d-none");
  displayQuestions();
  startTimer();
}

// TIMER COUNTDOWN
function startTimer() {
  // diplay time left
  countdownEl.textContent = timeLeft;
  // set interval to decrease each second
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
    displayChoices();
  } else {
    gameOver();
  }
}

function displayChoices() {
  console.log("displaying choices");
  for (j = 0; j < options.length; j++) {
    choiceBtns[j].textContent = myQuestions[index].choices[options[j]];
  }
}

function checkAnswer(correctAnswer, userAnswer) {
  console.log("checking answer");
  correctAnswer = myQuestions[index].answer;
  console.log("Correct Answer: " + correctAnswer);
  userAnswer = this.id;
  console.log("User Answer: " + userAnswer);
  if (userAnswer === correctAnswer) {
    answerCorrect();
  } else {
    answerIncorrect();
  }
  console.log(score);
  index++;
  displayQuestions();
}

// displays "correct" in green text and increases score
function answerCorrect() {
  console.log("correct!");
  feedbackText.setAttribute("style", "color: green");
  feedbackText.textContent = "Correct!";
  score = score + correct;
}

// displays "incorrect" in red text and subtracts time penalty from remaining time
function answerIncorrect() {
  console.log("incorrect!");
  feedbackText.setAttribute("style", "color: red");
  feedbackText.textContent = "Incorrect!";
  timeLeft = timeLeft - penalty;
}

// when timer runs out
function gameOver() {
  console.log("game over!");
  console.log("stop timer");
  clearInterval(timerInterval);
  quizQuestionsEl.classList.add("d-none");
  quizCompleteEl.classList.remove("d-none");
  calcFinalScore();
  finalScoreEl.textContent = finalScore;
}

function calcFinalScore() {
  finalScore = score + timeLeft;
  console.log("final score: " + finalScore);
}

function saveScore() {
  console.log("saving high score");
  var initials = userInitialsInput.value;

  var userScore = {
    initials: initials,
    score: finalScore,
  };

  console.log(userScore);

  var highScores = localStorage.getItem("highScoreList");
  console.log(highScores);

  if (highScores == null) {
    localStorage.setItem("highScoreList", JSON.stringify([userScore]));
    console.log(highScores);
  } else {
    highScoreList = JSON.parse(highScores);
    console.log(typeof highScoreList);
    highScoreList.push(userScore);
    localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
  }

  window.location.href = "highscores.html";

  window.onload.renderHighScores();
}

function renderHighScores() {
  console.log("rendering high scores");
  var localHighScores = localStorage.getItem("highScoreList");

  if (localHighScores == null) {
    document.getElementById("scoreList").remove();
    return;
  }

  localHighScores = JSON.parse(localHighScores);
  console.log("list", localHighScores);
  console.log(highScoreListEl);

  var scoreListItem = document.createElement("ol");
  scoreListItem.setAttribute("id", "scoreList");
  for (var i = 0; i < localHighScores.length; i++) {
    var highScoreList = document.createElement("li");
    highScoreList.setAttribute("class", "list-group-item text-center");

    highScoreList.innerHTML =
      localHighScores[i].initials + " | " + localHighScores[i].score;

    scoreListItem.appendChild(highScoreList);
  }
  highScoreListEl.appendChild(scoreListItem);
  return;
}

function clearScores() {
  localStorage.removeItem("highScoreList");
  renderHighScores();
}

// EVENT LISTENERS
// initialize on start
if (startBtn) {
  startBtn.addEventListener("click", startQuiz);
}

// any time an answer button is selected
for (var choiceBtn of choiceBtns) {
  choiceBtn.addEventListener("click", checkAnswer);
}

if (submitScoreBtn) {
  submitScoreBtn.addEventListener("click", saveScore);
}

if (repeatQuizBtn) {
  repeatQuizBtn.addEventListener("click", init);
}

if (clearHighscoresBtn) {
  clearHighscoresBtn.addEventListener("click", clearScores);
}
