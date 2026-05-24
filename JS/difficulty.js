const difficulty = document.getElementById("difficulty");


let questions = [];
let difficulties = [];

async function fetchData() {
  const qRes = await fetch("./JSON/questions.json");
  questions = await qRes.json();

  const dRes = await fetch("./JSON/options.json");
  difficulties = await dRes.json();
  
  createDifficultyButtons();
}

const createDifficultyButtons = () => {
  
  difficulties.forEach(diff => {
    const btn = document.createElement("button")
    btn.textContent=diff
    btn.classList.add("button")
    difficulty.appendChild(btn)
    
    btn.addEventListener("click", () =>selectDiff(diff))
  })
  
}

const selectDiff = (options) => {
  const filteredQuestions = questions.filter(q =>
    q.difficulty === options
  )
  localStorage.setItem("difficulty", options)

 console.log("سطح انتخاب شده:", options);
  console.log("سوالات فیلتر شده:", filteredQuestions);
  
}



fetchData();



