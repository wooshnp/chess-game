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

        // show number of correct answers out of total
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
                b: "Rainha"
            },
            correctAnswer: "b"
        },
        {
            question: "2. O seu movimento forma um L e pode saltar sobre a peça que a bloqueia.",
            answers: {
                a: "Cavalo",
                b: "Bispo"
            },
            correctAnswer: "a"
        },
        {
            question: "3. Avança um quadrado, exceto quando na posição inicial, onde pode mover dois quadrados para a frente.",
            answers: {
                a: "Rei",
                b: "Peão",
                c: "Torre"
            },
            correctAnswer: "b"
        },
        {
            question: "4. Quantos quadrados tem o tabuleiro de xadrez.",
            answers: {
                a: "50",
                b: "56",
                c: "64",
                d: "62"
            },
            correctAnswer: "c"
        }
    ];

    buildQuiz();

    submitButton.addEventListener("click", showResults);
})();