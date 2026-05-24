const playerTable = JSON.parse(localStorage.getItem("players"))
console.log(playerTable);

const table = document.getElementById("table")

playerTable.sort((a,b) => b.PlayerScore - a.PlayerScore);

playerTable.forEach(player => {

  const li = document.createElement("li");
  li.classList.add("li")

  li.textContent = `${player.playerName} - ${player.PlayerScore}`;

  table.appendChild(li);

});