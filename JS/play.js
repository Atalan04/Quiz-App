localStorage.removeItem("scoreSaved");
const selectedDifficulty = localStorage.getItem("difficulty") || "easy";

const questionNumber = document.getElementById("question-number");
const questionBox = document.getElementById("question-box");
const answerBox = document.getElementById("answer-box");
const scoreNumber = document.getElementById("score-number");
const nextBtnContainer = document.getElementById("nextBtn");
const finishButton = document.getElementById("finish-button");


let data = [];
let currentQuestionIndex = 0;
let score = 0;
let totalScore = 0;

// fetch questions
async function play() {
  const response = await fetch("./JSON/questions.json");
  
  const questions = await response.json();

  data = questions.filter(q => q.difficulty === selectedDifficulty);
  
  showQuestion()
 
}

// show current question
function showQuestion() {
  // clear old question and answers
  questionBox.innerHTML = "";
  answerBox.innerHTML = "";
  
  const currentQuestion = data[currentQuestionIndex];
  
  // question text
  const p = document.createElement("p");
  p.textContent = currentQuestion.question;
  p.classList.add("question");
  
  questionBox.appendChild(p);
  
  const answer = currentQuestion.answer;
  
  // create option buttons
  currentQuestion.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    
    answerBox.appendChild(btn);
    
    btn.addEventListener("click", () => {
      localStorage.setItem("selectedAnswer", btn.textContent);
      
      const buttons = answerBox.querySelectorAll("button");
      
      // disable all buttons
      buttons.forEach((button) => {
        button.disabled = true;
      });
      
      // correct answer
      if (btn.textContent === answer) {
        totalScore += currentQuestion.score;
        
        const result = {
          selectedAnswer: btn.textContent,
          score: currentQuestion.score,
          totalScore,
        };
        
        localStorage.setItem("result", JSON.stringify(result));
        
        btn.style.backgroundColor = "green";
        btn.style.color = "white";
      } else {
        // wrong answer
        btn.style.backgroundColor = "red";
        btn.style.color = "white";
        
        // show correct answer
        buttons.forEach((button) => {
          if (button.textContent === answer) {
            button.style.backgroundColor = "green";
            button.style.color = "white";
          }
        });
      }
    });
  });
}

// next question
function nextBtnHandler() {
  currentQuestionIndex++;
  
  // stop if no more questions
  if (currentQuestionIndex >= data.length) {
    questionBox.innerHTML = "<h2>Quiz Finished</h2>";
    answerBox.innerHTML = "";
    return;
  }
  
  showQuestion();
}

// const finishHandler = () => {

// }


// create next button
const nxtBtn = document.createElement("button");
nxtBtn.textContent = "Next";
nxtBtn.classList.add("next-button");
nextBtnContainer.appendChild(nxtBtn);

//create finish button
const finButton = document.createElement("a");
finButton.textContent = "Finish";
finButton.href = "./endGame.html";
finButton.classList.add("finish-button");
finishButton.appendChild(finButton)

// next button event
nxtBtn.addEventListener("click", nextBtnHandler);
// finButton.addEventListener("click", finishHandler)
// start app
play();
