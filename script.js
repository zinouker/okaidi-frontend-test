const category_select = document.getElementById("category");
const difficulty_select = document.getElementById("difficulty");

const info_box = document.querySelector(".info_box");
const quiz_box = document.querySelector(".quiz_box");

let questions = [];
let selectedCategory = 'any';
let selectedDifficulty = 'any';

function categoryChanged() {
    selectedCategory = category_select.value;
}

function difficultyChanged() {
    selectedDifficulty = difficulty_select.value;
}

async function startQuiz() {
    console.log('start quiz', selectedCategory, selectedDifficulty);
    await getQuestionsFromTriviaDb();
    // hide info box and show quiz box after getting questions
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");

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