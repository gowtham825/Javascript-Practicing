const quizData = [
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
    },
    {
      question: "What does CSS stand for?",
      options: ["Central Style Sheets", "Cascading Style Sheets", "Coded Style Sheets", "Clean Style Sheet"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Hot Mail", "How to Make Links", "Home Tool Markup Language"],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "What year was JavaScript launched?",
      options: ["1996", "1995", "1994", "None of the above"],
      answer: "1995"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 30;
  let timer;
  
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("nextBtn");
  const timerEl = document.getElementById("time");
  const resultBox = document.getElementById("result");
  const quizBox = document.getElementById("quiz");
  const scoreEl = document.getElementById("score");
  
  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    loadQuestion();
    startTimer();
  }
  
  function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    optionsEl.innerHTML = "";
  
    current.options.forEach((opt) => {
      const button = document.createElement("button");
      button.textContent = opt;
      button.onclick = () => checkAnswer(opt);
      optionsEl.appendChild(button);
    });
  
    nextBtn.style.display = "none";
  }
  
  function checkAnswer(selected) {
    const correct = quizData[currentQuestion].answer;
    if (selected === correct) score++;
  
    Array.from(optionsEl.children).forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correct) {
        btn.style.backgroundColor = "lightgreen";
      } else if (btn.textContent === selected) {
        btn.style.backgroundColor = "salmon";
      }
    });
  
    nextBtn.style.display = "block";
  }
  
  nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      timeLeft = 30;
      loadQuestion();
    } else {
      endQuiz();
    }
  };
  
  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  }
  
  function endQuiz() {
    clearInterval(timer);
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreEl.textContent = `${score} / ${quizData.length}`;
  }
  
  // Initialize
  startQuiz();
  