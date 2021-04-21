const quizContainer = document.getElementById('quiz')
const resultsContainer = document.getElementById('results')
const submitButton = document.getElementById('submit')
let area = `\\(A = \\pi r^2\\)`

const myQuestions = [
	{
		question: `What is the area of the circle? ${area}`,
		answers: {
			a: `${area}`,
			b: `\(A = \pi r^2\)`,
			c: `\\(A = l \\times w\\)`,
		},
		correctAnswer: 'a',
	},
	{
		question: 'Which one of these is a JavaScript package manager?',
		answers: {
			a: 'Node.js',
			b: 'TypeScript',
			c: 'npm',
		},
		correctAnswer: 'c',
	},
	{
		question: 'Which tool can you use to ensure code quality?',
		answers: {
			a: 'Angular',
			b: 'jQuery',
			c: 'RequireJS',
			d: 'ESLint',
		},
		correctAnswer: 'd',
	},
]

const buildQuiz = () => {
	// variable to store the HTML output
	const output = []

	// for each question...
	myQuestions.forEach((currentQuestion, questionNumber) => {
		// variable to store the list of possible answers
		// we'll want to store the list of answer choices
		const answers = []
		// and for each available answer...
		for (letter in currentQuestion.answers) {
			// ...add an HTML radio button
			answers.push(
				`<label class="label">
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
			)
		}

		// add this question and its answers to the output
		output.push(
			`<div class="item">
      <div class="question"> ${currentQuestion.question} </div>
      <div class="answers"> ${answers.join('')} </div> </div>`
		)
	})

	// finally combine our output list into one string of HTML and put it on the page
	quizContainer.innerHTML = output.join('')
}

const showResults = () => {
	// gather answer containers from our quiz
	const answerContainers = quizContainer.querySelectorAll('.answers')

	// keep track of user's answers
	let numCorrect = 0

	// for each question...
	myQuestions.forEach((currentQuestion, questionNumber) => {
		// find selected answer
		const answerContainer = answerContainers[questionNumber]
		const selector = `input[name=question${questionNumber}]:checked`
		const userAnswer = (answerContainer.querySelector(selector) || {}).value

		// if answer is correct
		if (userAnswer === currentQuestion.correctAnswer) {
			// add to the number of correct answers
			numCorrect++

			// color the answers green
			answerContainers[questionNumber].style.color = 'lightgreen'
		}
		// if answer is wrong or blank
		else {
			// color the answers red
			answerContainers[questionNumber].style.color = 'red'
		}
	})

	// show number of correct answers out of total
	resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`
}

buildQuiz()

submitButton.addEventListener('click', showResults)
