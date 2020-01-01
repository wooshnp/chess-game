(function() {
    function buildQuiz() {
        const output = [];
        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];

            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
                );
            }
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
            );
        });

        quizContainer.innerHTML = output.join("");
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll(".answers");

        let numCorrect = 0;

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;

                answerContainers[questionNumber].style.color = "lightgreen";
            } else {
                answerContainers[questionNumber].style.color = "red";
            }
        });
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
    const myQuestions = [
        {
            question: "1. A sua movimentação é uma combinação da torre e do bispo.",
            answers: {
                a: "Rei",
                b: "Rainha",
                c: "Torre"
            },
            correctAnswer: "b"
        },
        {
            question: "2. O seu movimento é em L e pode saltar sobre outras peças.",
            answers: {
                a: "Cavalo",
                b: "Bispo",
                c: "Rainha"
            },
            correctAnswer: "a"
        },
        {
            question: "3. Avança um quadrado, exceto quando  está na posição inicial, onde pode mover dois quadrados para a frente.",
            answers: {
                a: "Rei",
                b: "Peão",
                c: "Bispo"
            },
            correctAnswer: "b"
        },
        {
            question: "4. Qual destas é a mais valiosa?",
            answers: {
                a: "Peão",
                b: "Torre",
                c: "Bispo",
                d: "Cavalo"
            },
            correctAnswer: "b"
        },
        {
            question: "5. Qual o numero minimo de jogadas em que é possivel ganhar com o xeque-mate pastor?",
            answers: {
                a: "4",
                b: "5",
                c: "6"
            },
            correctAnswer: "b"
        }
    ];

    buildQuiz();

    submitButton.addEventListener("click", showResults);
})();