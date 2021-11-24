const category_select = document.getElementById("category");
const difficulty_select = document.getElementById("difficulty");


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
}