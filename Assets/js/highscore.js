// clear high scores local storage
var clearHighscoresBtn = document.querySelector("#clear-button");
// back to start buttons
var repeatQuizBtn = document.querySelector("#repeat-quiz");
// high scores list element
var highScoreListEl = document.querySelector("#highscores-list");

var allHighScores;

function renderHighScores() {
  // clear existing HTML and re-render
  highScoreListEl.innerHTML = "";
  console.log("rendering high scores");

  // retrieve all user scores from local storage
  allHighScores = JSON.parse(localStorage.getItem("storedScoreKey"));
  console.log("Stored Scores: " + allHighScores);

  // create an alert div for each user score stored in local storage
  for (var i = 0; i < allHighScores.length; i++) {
    var row = document.createElement("div");
    row.setAttribute("class", "row justify-content-center");

    var highscoreItem = document.createElement("div");
    highscoreItem.setAttribute(
      "class",
      "alert col-md-6 justify-content-center alert-dark text-center"
    );
    highscoreItem.innerHTML =
      allHighScores[i].initials + " | " + allHighScores[i].score;

    row.appendChild(highscoreItem);
    highScoreListEl.appendChild(row);
  }

  return;
}

// remove all stored user scores
function clearScores() {
  localStorage.removeItem("storedScoreKey");
  renderHighScores();
}

window.onload = function () {
  // continuation of saveScores, only render once highscores.html is loaded
  renderHighScores();
  clearHighscoresBtn.addEventListener("click", clearScores);
};
