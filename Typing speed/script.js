const sentences = [
    "JavaScript makes the web interactive and dynamic.",
    "Typing speed depends on accuracy and consistency.",
    "Practice daily to improve your typing skills.",
    "The quick brown fox jumps over the lazy dog.",
    "Debugging is an essential skill for developers."
  ];
  
  let timer = 0;
  let interval = null;
  let currentSentence = "";
  let isRunning = false;
  
  const sentenceEl = document.getElementById("sentence");
  const inputEl = document.getElementById("input");
  const timerEl = document.getElementById("timer");
  const wpmEl = document.getElementById("wpm");
  
  function startTest() {
    resetTest();
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceEl.textContent = currentSentence;
    inputEl.disabled = false;
    inputEl.focus();
    isRunning = true;
  
    interval = setInterval(() => {
      timer++;
      timerEl.textContent = timer;
      calculateWPM();
    }, 1000);
  }
  
  function calculateWPM() {
    const wordsTyped = inputEl.value.trim().split(" ").length;
    const minutes = timer / 60;
    const wpm = Math.round(wordsTyped / minutes || 0);
    wpmEl.textContent = wpm;
  }
  
  function resetTest() {
    clearInterval(interval);
    timer = 0;
    timerEl.textContent = "0";
    wpmEl.textContent = "0";
    inputEl.value = "";
    inputEl.disabled = true;
    sentenceEl.textContent = "Click 'Start' to begin typing.";
    isRunning = false;
  }
  
  inputEl.addEventListener("input", () => {
    const inputText = inputEl.value;
    if (currentSentence.startsWith(inputText)) {
      inputEl.style.borderColor = "green";
    } else {
      inputEl.style.borderColor = "red";
    }
  
    if (inputText === currentSentence) {
      clearInterval(interval);
      isRunning = false;
      inputEl.disabled = true;
      inputEl.style.borderColor = "blue";
    }
  });
  