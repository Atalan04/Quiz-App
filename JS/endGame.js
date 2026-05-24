const saved = localStorage.getItem("scoreSaved");

if (saved === "true") {
  inputName.disabled = true;
  save.disabled = true;
}

const totalScore = document.getElementById("total-score");
const inputName = document.getElementById("name");
const save = document.getElementById("save");

const result = JSON.parse(localStorage.getItem("result"));

const totalSc = document.createElement("span");
totalSc.textContent = result.totalScore;
totalSc.classList.add("total-score");
totalScore.appendChild(totalSc);

const saveHandler = () => {
  const playerTable = {
    playerName: inputName.value,
    PlayerScore: totalScore.textContent,
  };
  const players = JSON.parse(localStorage.getItem("players")) || [];
  players.push(playerTable);

  localStorage.setItem("players", JSON.stringify(players));

   localStorage.setItem("scoreSaved", "true");

  inputName.disabled = true;
  save.disabled = true;
 
};

save.addEventListener("click", saveHandler);
