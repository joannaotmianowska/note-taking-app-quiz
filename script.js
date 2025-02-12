// Quiz questions and options
const questions = [
  {
    question: "📝 How do you prefer to organize?",
    options: [
      { text: "Customizable Workspace", app: "Notion" },
      { text: "Linked Notes", app: "Obsidian" },
      { text: "Bullet Outlines", app: "Logseq" },
      { text: "Simple Lists", app: "Apple Notes" },
      { text: "Detailed Notebooks", app: "Evernote" },
    ],
  },
  {
    question: "⭐️ Top priority?",
    options: [
      { text: "Creativity & Flexibility", app: "Notion" },
      { text: "Deep Linking", app: "Obsidian" },
      { text: "Structured Outlines", app: "Logseq" },
      { text: "Ease of Use", app: "Apple Notes" },
      { text: "Robust Organization", app: "Evernote" },
    ],
  },
  {
    question: "💫 Preferred storage?",
    options: [
      { text: "Cloud-Based", app: "Notion" },
      { text: "Local Storage", app: "Obsidian" },
      { text: "Hybrid", app: "Logseq" },
      { text: "Native App", app: "Apple Notes" },
      { text: "Cross-Platform", app: "Evernote" },
    ],
  },
  {
    question: "🎨 Customization level?",
    options: [
      { text: "Very High", app: "Notion" },
      { text: "Moderate", app: "Obsidian" },
      { text: "Flexible", app: "Logseq" },
      { text: "Minimal", app: "Apple Notes" },
      { text: "Task-Dependent", app: "Evernote" },
    ],
  },
  {
    question: "✨ Desired vibe?",
    options: [
      { text: "Creative & Dynamic", app: "Notion" },
      { text: "Connected & Visual", app: "Obsidian" },
      { text: "Organized & Modular", app: "Logseq" },
      { text: "Clean & Simple", app: "Apple Notes" },
      { text: "Comprehensive & Detailed", app: "Evernote" },
    ],
  },
  {
    question: "🎯 What do you want to organize?",
    options: [
      { text: "Projects & Tasks", app: "Notion" },
      { text: "Tech & Code", app: "Obsidian" },
      { text: "Ideas & Outlines", app: "Logseq" },
      { text: "Quick Notes", app: "Apple Notes" },
      { text: "Research & Records", app: "Evernote" },
    ],
  },
];

// App features and descriptions
const appFeatures = {
  Notion: {
    title: "Notion",
    description: "All-in-one workspace for notes, projects, and collaboration",
    features: [
      "Customizable workspace with blocks and databases",
      "Rich text editing and media embedding",
      "Templates for any use case",
      "Real-time collaboration",
      "Cross-platform sync",
    ],
  },
  Obsidian: {
    title: "Obsidian",
    description:
      "A powerful knowledge base that works on top of your local folder of plain text Markdown files",
    features: [
      "Markdown-based note-taking",
      "Powerful linking between notes",
      "Local-first storage",
      "Community plugins",
      "Graph view visualization",
    ],
  },
  Logseq: {
    title: "Logseq",
    description: "Privacy-first, open-source platform for knowledge management",
    features: [
      "Outliner-based structure",
      "Bi-directional linking",
      "Daily journaling",
      "Local-first approach",
      "Git-based sync",
    ],
  },
  "Apple Notes": {
    title: "Apple Notes",
    description: "Simple and integrated note-taking app for Apple users",
    features: [
      "Clean, minimal interface",
      "Seamless Apple ecosystem integration",
      "Quick note capture",
      "iCloud sync",
      "Basic formatting options",
    ],
  },
  Evernote: {
    title: "Evernote",
    description: "Comprehensive note-taking and organization tool",
    features: [
      "Rich document formatting",
      "Web clipper for saving content",
      "Cross-platform availability",
      "Document scanning",
      "Advanced search capabilities",
    ],
  },
};

let currentQuestion = 0;
let userAnswers = [];

// Initialize the quiz
function initQuiz() {
  currentQuestion = 0;
  userAnswers = [];
  showQuestion(currentQuestion);
  document.getElementById("results").classList.add("hidden");
  updateProgress();
}

// Display the current question
function showQuestion(questionIndex) {
  const quizContainer = document.getElementById("quiz-container");
  const question = questions[questionIndex];

  const questionHTML = `
        <div class="question">
            <h2>${question.question}</h2>
            <div class="options">
                ${question.options
                  .map(
                    (option, index) => `
                    <button 
                        class="option" 
                        onclick="selectOption(${index})"
                        data-index="${index}"
                        role="radio"
                        aria-checked="false"
                    >
                        ${option.text}
                    </button>
                `
                  )
                  .join("")}
            </div>
        </div>
    `;

  quizContainer.innerHTML = questionHTML;
  updateProgress();
}

// Handle option selection
function selectOption(optionIndex) {
  const options = document.querySelectorAll(".option");
  options.forEach((opt) => {
    opt.classList.remove("selected");
    opt.setAttribute("aria-checked", "false");
  });

  const selectedOption = options[optionIndex];
  selectedOption.classList.add("selected");
  selectedOption.setAttribute("aria-checked", "true");

  // Store the answer
  userAnswers[currentQuestion] =
    questions[currentQuestion].options[optionIndex].app;

  // Move to next question after a short delay
  setTimeout(() => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion(currentQuestion);
    } else {
      showResults();
    }
  }, 500);
}

// Calculate and display results
function showResults() {
  const results = {};
  userAnswers.forEach((app) => {
    results[app] = (results[app] || 0) + 1;
  });

  // Find the app with the most votes
  let recommendedApp = Object.entries(results).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];

  // Calculate percentages for all apps
  const totalAnswers = userAnswers.length;
  const appPercentages = Object.entries(results).sort((a, b) => b[1] - a[1]);

  const resultContent = `
    <h3>Based on your answers, we recommend:</h3>
    <h2 style="font-size: 2.2rem; margin: 1rem 0;">${recommendedApp}! 🎉</h2>
    <p class="app-description">${appFeatures[recommendedApp].description}</p>
    
    <div class="key-features">
      <h4>Key Features:</h4>
      <ul>
        ${appFeatures[recommendedApp].features
          .map((feature) => `<li>${feature}</li>`)
          .join("")}
      </ul>
    </div>

    <div class="match-breakdown">
      <h4>Match Breakdown:</h4>
      ${appPercentages
        .map(
          ([app, count]) => `
        <div class="match-item">
          <span class="app-name">${app}</span>
          <span class="match-percentage">${Math.round(
            (count / totalAnswers) * 100
          )}% match</span>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  document.getElementById("quiz-container").classList.add("hidden");
  const resultsSection = document.getElementById("results");
  resultsSection.classList.remove("hidden");
  resultsSection.querySelector(".result-content").innerHTML = resultContent;
}

// Update progress bar
function updateProgress() {
  const progress = (currentQuestion / questions.length) * 100;
  const progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = `${progress}%`;
  progressBar.setAttribute("aria-valuenow", progress);
}

// Restart quiz
function restartQuiz() {
  initQuiz();
  document.getElementById("quiz-container").classList.remove("hidden");
}

// Initialize the quiz when the page loads
document.addEventListener("DOMContentLoaded", initQuiz);
