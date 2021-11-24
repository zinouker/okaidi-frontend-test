const category_select = document.getElementById("category");
const difficulty_select = document.getElementById("difficulty");

const info_box = document.querySelector(".info_box");
const quiz_box = document.querySelector(".quiz_box");
const question_title = document.querySelector(".quiz_box header .title");
const question_text = document.querySelector(".que_text");
const option_list = document.querySelector(".option_list");

let questions = [];
let selectedCategory = 'any';
let selectedDifficulty = 'any';

function categoryChanged() {
    selectedCategory = category_select.value;
}

function difficultyChanged() {
    selectedDifficulty = difficulty_select.value;
}

async function getQuestionsFromTriviaDb() {
    const category = selectedCategory != 'any' ? `&category=${selectedCategory}` : '';
    const difficulty = selectedDifficulty != 'any' ? `&difficulty=${selectedDifficulty}` : '';
    const url = `https://opentdb.com/api.php?amount=5${category}${difficulty}&type=multiple`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('data', data);
        data.results.forEach((element, index) => {
            let options = element.incorrect_answers;
            options.push(element.correct_answer);
            const question = {
                numb: index + 1,
                question: element.question,
                answer: element.correct_answer,
                options: options.slice().sort(() => Math.random() - 0.5)
            }
            questions.push(question);
        });
        console.log('questions', questions);
    } catch (error) {
        console.log('error', error);
    }
}

async function startQuiz() {
    console.log('start quiz', selectedCategory, selectedDifficulty);
    await getQuestionsFromTriviaDb();
    // hide info box and show quiz box after getting questions
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuetions(0);
}

function showQuetions(index) {
    let option_tag = '';
    
    const currentQuestion = questions[index];

    let question_tag = `<span>${currentQuestion.numb} .${currentQuestion.question}</span>`;
    currentQuestion.options.forEach((option) => {
        option_tag = option_tag + `<div class="option"><span>${option}</span></div>`;
    })

    question_title.innerHTML = `<p>Question ${currentQuestion.numb}</p>`;
    question_text.innerHTML = question_tag; 
    option_list.innerHTML = option_tag;

}