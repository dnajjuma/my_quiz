// Sample quiz questions
const quizQuestions = [
    {
        question: "What is the capital of Uganda?",
        options: ["Paris", "Kigali", "Tokyo", "Kampala"],
        correctAnswer: "Kampala"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "H2SO4"],
        correctAnswer: "H2O"
    },
    {
        question: "Which of these is an odd number?",
        options: ["8", "2", "4", "7"],
        correctAnswer: "7"
    },
    {
        question: "Who here wasn't a founder of Apple?",
        options: ["Steve Jobs", "Steve Wozniak", "Tim Cook", "Ronald Wayne"],
        correctAnswer: "Tim Cook"
    }

];

// Get references to HTML elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitBtn = document.getElementById('submitBtn');
const nextBtn = document.getElementById('nextBtn');
const feedbackElement = document.getElementById('feedback');
const quizContainer = document.getElementById('quizContainer');

let currentQuestionIndex = 0;
let correctAnswers = 0;
let questionsAnswered = 0;

// Function to load the current question
function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('input');
        optionElement.type = 'radio';
        optionElement.name = 'option';
        optionElement.value = option;
        optionsElement.appendChild(optionElement);

        const labelElement = document.createElement('label');
        labelElement.textContent = option;
        optionsElement.appendChild(labelElement);

        optionsElement.appendChild(document.createElement('br'));
    });

    submitBtn.disabled = false;
    nextBtn.disabled = true;
}

// Event listener for submit button
submitBtn.addEventListener('click', submitAnswer);

// Function to submit the answer
function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const userAnswer = selectedOption.value;
        const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;
        if (userAnswer === correctAnswer) {
            feedbackElement.textContent = 'Correct!';
            correctAnswers++;
        } else {
            feedbackElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
        }
        submitBtn.disabled = true;
        nextBtn.disabled = false;
        questionsAnswered++;

        if (questionsAnswered === 5) {
            endQuiz();
        }
    } else {
        feedbackElement.textContent = 'Please select an answer.';
    }
}

// Function to load the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length && questionsAnswered < 5) {
        loadQuestion();
        feedbackElement.textContent = '';
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    quizContainer.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You have completed the quiz.</p>
        <p>Your grade: ${Math.round((correctAnswers / 5) * 100)}%</p>
        <p>Yay! Well done 🎉</p>
        <p>Refresh the page to restart the quiz.</p>
    `;
}

// Event listener for next button
nextBtn.addEventListener('click', nextQuestion);

// Load the first question when the page is loaded
loadQuestion();
