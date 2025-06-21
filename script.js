// DOM elements
const entryPage = document.getElementById('entry-page');
const questionPage = document.getElementById('question-page');
const finalPage = document.getElementById('final-page');
const connectionPage = document.getElementById('connection-page'); // NEW
const enterButton = document.getElementById('enter-button');
const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const feedbackMessage = document.getElementById('feedback-message');
const confettiContainer = document.getElementById('confetti-container');
const connectionTitle = document.getElementById('connection-title'); // NEW
const connectionImage = document.getElementById('connection-image'); // NEW
const nextQuestionButton = document.getElementById('next-question-button'); // NEW

// Questions and Answers data
const questions = [
    {
        question: "Día de nuestro first kiss",
        answer: "16/07/2020",
        connectionTitle: "Hemos empezado muy flojo, vamos a ponerlo más difícil",
        connectionImage: "retiro.jpg" // Your local image filename
    },
    {
        question: "¿Qué canción te puse en la primera historia romanticona juntos que subí?",
        answer: "Una foto en blanco y negro",
        connectionTitle: "¡uuuuu buena memoria!",
        connectionImage: "foto blanco y negro.jpg" // Your local image filename
    },
    {
        question: "¿De qué grupo es una de las canciones que te dediqué como indirecta en una  historia de instagram después de uno de los días que quedamos?",
        answer: "Oasis",
        connectionTitle: "¡Nuestro grupo!",
        connectionImage: "oasis.png" // Your local image filename
    },
    {
        question: "Fecha de la primera carta",
        answer: "14/02/2020",
        connectionTitle: "La primera de muchas",
        connectionImage: "carta.jpeg" // Your local image filename
    },
    {
        question: "¿Cuál es la canción que tengo en el llavero que me regalaste?",
        answer: "You and I",
        connectionTitle: "¡Más te valía saberla!",
        connectionImage: "you and i.jpeg" // Your local image filename
    },
    {
        question: "¿A qué restaurante fuimos en nuestra primera cita?",
        answer: "Massart",
        connectionTitle: "¡Nuestra canción!",
        connectionImage: "massart.jpg" // Your local image filename
    },
];

let currentQuestionIndex = 0;

// Function to display the current question
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionText.textContent = questions[currentQuestionIndex].question;
        answerInput.value = ''; // Clear previous answer
        feedbackMessage.classList.add('hidden'); // Hide feedback
        answerInput.classList.remove('border-red-500', 'border-green-500'); // Remove feedback borders
        questionPage.classList.remove('hidden'); // Make sure question page is visible
        connectionPage.classList.add('hidden'); // Hide connection page
    } else {
        // All questions answered, show final page
        questionPage.classList.add('hidden');
        finalPage.classList.remove('hidden');
        connectionPage.classList.add('hidden'); // Hide connection page
    }
}

// Function to display the connection page
function displayConnectionPage() {
    if (currentQuestionIndex < questions.length) { // Check if there's a next question to connect to
        const currentConnectionData = questions[currentQuestionIndex -1]; // Get data from the *just answered* question
        connectionTitle.textContent = currentConnectionData.connectionTitle;
        connectionImage.src = currentConnectionData.connectionImage;
        questionPage.classList.add('hidden');
        connectionPage.classList.remove('hidden');
    } else {
        // If all questions are done, go straight to final page after confetti
        questionPage.classList.add('hidden');
        connectionPage.classList.add('hidden');
        finalPage.classList.remove('hidden');
    }
}

// Confetti effect function
function createConfetti() {
    // Paleta de colores para el confeti: azules, grises, y un acento sutil
    const colors = ['#007bff', '#28a745', '#6c757d', '#f8f9fa', '#6610f2', '#17a2b8'];
    for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');
        confettiPiece.style.left = `${Math.random() * 100}vw`;
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.animationDuration = `${Math.random() * 2 + 2}s`;
        confettiPiece.style.animationDelay = `${Math.random() * 0.5}s`;
        confettiPiece.style.opacity = 1;
        confettiPiece.style.transform = `translateY(${Math.random() * -100}px) rotateZ(${Math.random() * 360}deg)`;
        // Aumentado el rango de tamaño para el confeti
        confettiPiece.style.width = `${Math.random() * 15 + 10}px`; // Ajuste aquí
        confettiPiece.style.height = `${Math.random() * 15 + 10}px`; // Ajuste aquí
        confettiPiece.style.borderRadius = `${Math.random() > 0.5 ? '50%' : '0'}`;
        confettiContainer.appendChild(confettiPiece);

        confettiPiece.addEventListener('animationend', () => {
            confettiPiece.remove();
        });
    }
}

// Event Listeners
enterButton.addEventListener('click', () => {
    entryPage.classList.add('hidden');
    // Instead of directly showing questionPage, show the first connection page if applicable, or the first question
    if (currentQuestionIndex < questions.length) {
        displayQuestion(); // Display the first question
    } else {
        // This case handles if there are no questions or all are completed
        finalPage.classList.remove('hidden');
    }
});

submitButton.addEventListener('click', () => {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

    feedbackMessage.classList.remove('hidden');
    if (userAnswer === correctAnswer) {
        feedbackMessage.textContent = "¡Correcto!"; // Mensaje simplificado
        feedbackMessage.classList.remove('text-red-500');
        feedbackMessage.classList.add('text-green-500');
        answerInput.classList.remove('border-red-500');
        answerInput.classList.add('border-green-500');

        createConfetti(); // Trigger confetti
        setTimeout(() => {
            currentQuestionIndex++; // Increment index for the next question
            confettiContainer.innerHTML = ''; // Clear confetti
            displayConnectionPage(); // Show the connection page
        }, 3000); // 3 seconds delay for confetti and then show connection page
    } else {
        feedbackMessage.textContent = "¡Fallaste!"; // Mensaje simplificado
        feedbackMessage.classList.remove('text-green-500');
        feedbackMessage.classList.add('text-red-500');
        answerInput.classList.remove('border-green-500');
        answerInput.classList.add('border-red-500');
    }
});

nextQuestionButton.addEventListener('click', () => { // NEW Event Listener
    displayQuestion(); // Move to the next question
});


// Optional: Allow pressing Enter to submit the answer
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitButton.click();
    }
});