// clear high scores local storage
var clearHighscoresBtn = document.querySelector("#clear-button");
// take quiz again button
var repeatQuizBtn = document.querySelector("#repeat-quiz");
// high scores list element
var highScoreListEl = document.querySelector("#highscores-list");

function renderHighScores() {
  highScoreListEl.innerHTML = "";
  console.log("rendering high scores");
  var allHighScores = localStorage.getItem("storedHighScore");

  allHighScores = JSON.parse(allHighScores);
  console.log("Stored Scores: " + allHighScores);

  var highScoreList = document.createElement("ol");

  for (var i = 0; i < allHighScores.length; i++) {
    var scoreListItem = document.createElement("li");
    scoreListItem.setAttribute("class", "list-group-item text-center");

    scoreListItem.innerHTML =
      allHighScores[i].initials + " | " + allHighScores[i].score;

    highScoreList.appendChild(scoreListItem);
  }
  highScoreListEl.appendChild(highScoreList);
  return;
}

function clearScores() {
  localStorage.removeItem("storedHighScore");
  renderHighScores();
}

// if (repeatQuizBtn) {
//   repeatQuizBtn.addEventListener("click", init);
// }

// if (clearHighscoresBtn) {
//   clearHighscoresBtn.addEventListener("click", clearScores);
// }

window.onload = function () {
  //   repeatQuizBtn.addEventListener("click", init);
  clearHighscoresBtn.addEventListener("click", clearScores);
  renderHighScores();
};
