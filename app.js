// DEFINING GLOBAL VARIABLES
let user_answers = ["", "", "", "", "", "", "", "", "", ""];
let printed_questions = "";
let is_a_new_quiz = true; 
let questions = ""; // GET A LIST OF THE CHOOSEN MOTHER TONGUE AND TARGET LANGUAGE

// TO HIGHLIGHT THE PRESSED ANSWER BUTTON AND STORE ITS INDEX
function set_user_answer(button_id, index) {

    // TO CHECK IF THE USER HAS CREATED A NEW QUIZ BEFORE CHECKING ANSWERS
    if (is_a_new_quiz) {
        let recently_pressed_button = document.getElementById(button_id);

        // DIMINISH THE LAST BUTTON PRESSED
        if (user_answers[index] != "") {
            let last_pressed_button = document.getElementById(user_answers[index]);
            last_pressed_button.style.background = "transparent";
            last_pressed_button.style.color = "white";
        }

        // STORES THE BUTTON ID AND HIGHLIGHT IT
        if (user_answers[index] != button_id) {
            user_answers[index] = button_id;
            recently_pressed_button.style.background = "white";
            recently_pressed_button.style.color = "#3d064b";
        } else {
            user_answers[index] = "";
        }
    };
}

function reajust_target_language_options() {
    let mother_tongue_combobox = document.getElementById("mother-tongue");
    let target_language_combobox = document.getElementById("target-language");

    options = mother_tongue_combobox.options;
    target_language_combobox.innerHTML = "";

    for (option of options) {
        if (option.value !== mother_tongue_combobox.value) {
            target_language_combobox.innerHTML += `<option value="${option.value}">${option.label}</option>`;
        } 
    }
}

// SHUFFLE AN ARRAY OF ITEM
function shuffle(array, times) {
    length = array.length;
    for (let i = 0; i < times; i++) {
        for (let j = 0; j < length; j++) {
            let first_index = Math.floor(Math.random()*length);
            let second_index = Math.floor(Math.random()*length);
            let aux = array[first_index];
            array[first_index] = array[second_index];
            array[second_index] = aux;
        }
    }
}

// CONVERT LETTER TO INDEX OF ANSWERS
function letter_to_index(letter) {
    if (letter == "a") {
        return 0;
    } else if (letter == "b") {
        return 1;
    } else if (letter == "c") {
        return 2;
    } else if (letter == "d") {
        return 3;
    } else if (letter == "e") {
        return 4;
    } else {
        return -1;
    }
}

// CONVERT INDEX TO LETTER OF ANSWERS
function index_to_letter(index) {
    if (index == 0) {
        return "a";
    } else if (index == 1) {
        return "b";
    } else if (index == 2) {
        return "c";
    } else if (index == 3) {
        return "d";
    } else if (index == 4) {
        return "e";
    } else {
        return "";
    }
}

function check_answers() {
    // CHECK IF A NEW QUIZ WAS CRTEATED
    if (is_a_new_quiz) {
        is_a_new_quiz = false;

        let panel = document.getElementById("panel");

        let score = 0;
        
        // COMPUTES THE SCORE
        for (let i = 0; i < 10; i++) {
            if (letter_to_index(user_answers[i][0]) == questions[i].rightAnswer) {
                score ++;
            }        
        }

        // TO SHOW AN IMAGE THAT IS INDIRECTLY WITH THE USER'S SCORE
        let image = "";
        let message = "";
        if (score > 8) {
            image = `<img src="./images/bear2.png" alt="A bear holding a basketball near to a basketball hoop" width="330px">`;
            message = `<p class="message">Your score was ${score}</p> <p class="message">You rock!</p>`;
        } else if (5 <= score && score <= 8) {
            image = `<img src="./images/bear3.png" alt="A bear holding a basketball near to a basketball hoop" width="330px">`;
            message = `<p class="message">Your score was ${score}</p> <p class="message">You can do it better; I believe in you!</p>`;
        } else if (score < 5) {
            image = `<img src="./images/bear4.png" alt="A bear holding a basketball near to a basketball hoop" width="330px">`;
            message = `<p class="message">Your score was ${score}</p> <p class="message">It's okay to make mistakes; they are part of the learning process.</p>`;
        }

        // PUTTING THE ELEMENTS INTO THE WEBPAGE
        panel.innerHTML = image + message + printed_questions;


        // ADDING RIGHT ANSWERS AND WRONG IF THE USER HAS TYPED SOMETHING WRONG
        for (let i = 0; i < 10; i++) {
            // RIGHT ANSWER      
            let button_of_right_answer = document.getElementById(index_to_letter(questions[i].rightAnswer) + `${i}`);
            if (letter_to_index(user_answers[i][0]) == questions[i].rightAnswer) {
                button_of_right_answer.style.background = "green";
                button_of_right_answer.style.color = "white";
            } else {
                // BAD ANSWER
                // RED
                if (user_answers[i] != "") {
                    let button_pressed_by_user = document.getElementById(user_answers[i]);
                    button_pressed_by_user.style.background = "red";
                    button_pressed_by_user.style.color = "white";
                }
                // RIGHT ANSWER
                button_of_right_answer.style.background = "green";
                button_of_right_answer.style.color = "white";
            }
        }

        // SCROLLING PAGE UP
        panel.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
}

function get_questions() {

    // GETTING MOTHER TONGUE AND TARGET LANGUAGE HTML ELEMENTS
    let mother_tongue_combobox = document.getElementById("mother-tongue");
    let target_language_combobox = document.getElementById("target-language");

    // GETTING THE QUESTIONS ACORDING TO MOTHER TONGUE AND TARGET LANGUAGE
    if (mother_tongue_combobox.value == "english" && target_language_combobox.value == "portuguese") {
        questions = english_portuguese;
    } else if (mother_tongue_combobox.value == "english" && target_language_combobox.value == "spanish") {
        questions = english_spanish;
    } else if (mother_tongue_combobox.value == "english" && target_language_combobox.value == "french") {
        questions = english_french;
    } else if (mother_tongue_combobox.value == "english" && target_language_combobox.value == "german") {
        questions = english_german;
    } else if (mother_tongue_combobox.value == "english" && target_language_combobox.value == "italian") {
        questions = english_italian;
    } else if (mother_tongue_combobox.value == "portuguese" && target_language_combobox.value == "english") {
        questions = portuguese_english;
    } else if (mother_tongue_combobox.value == "portuguese" && target_language_combobox.value == "spanish") {
        questions = portuguese_spanish;
    } else if (mother_tongue_combobox.value == "portuguese" && target_language_combobox.value == "french") {
        questions = portuguese_french;
    } else if (mother_tongue_combobox.value == "portuguese" && target_language_combobox.value == "german") {
        questions = portuguese_german;
    } else if (mother_tongue_combobox.value == "portuguese" && target_language_combobox.value == "italian") {
        questions = portuguese_italian;
    } else if (mother_tongue_combobox.value == "spanish" && target_language_combobox.value == "english") {
        questions = spanish_english;
    } else if (mother_tongue_combobox.value == "spanish" && target_language_combobox.value == "portuguese") {
        questions = spanish_portuguese;
    } else if (mother_tongue_combobox.value == "spanish" && target_language_combobox.value == "french") {
        questions = spanish_french;
    } else if (mother_tongue_combobox.value == "spanish" && target_language_combobox.value == "german") {
        questions = spanish_german;
    } else if (mother_tongue_combobox.value == "spanish" && target_language_combobox.value == "italian") {
        questions = spanish_italian;
    } else if (mother_tongue_combobox.value == "french" && target_language_combobox.value == "english") {
        questions = french_english;
    } else if (mother_tongue_combobox.value == "french" && target_language_combobox.value == "portuguese") {
        questions = french_portuguese;
    } else if (mother_tongue_combobox.value == "french" && target_language_combobox.value == "spanish") {
        questions = french_spanish;
    } else if (mother_tongue_combobox.value == "french" && target_language_combobox.value == "german") {
        questions = french_german;
    } else if (mother_tongue_combobox.value == "french" && target_language_combobox.value == "italian") {
        questions = french_italian;
    } else if (mother_tongue_combobox.value == "german" && target_language_combobox.value == "english") {
        questions = german_english;
    } else if (mother_tongue_combobox.value == "german" && target_language_combobox.value == "portuguese") {
        questions = german_portuguese;
    } else if (mother_tongue_combobox.value == "german" && target_language_combobox.value == "spanish") {
        questions = german_spanish;
    } else if (mother_tongue_combobox.value == "german" && target_language_combobox.value == "french") {
        questions = german_french;
    } else if (mother_tongue_combobox.value == "german" && target_language_combobox.value == "italian") {
        questions = german_italian;
    } else if (mother_tongue_combobox.value == "italian" && target_language_combobox.value == "english") {
        questions = italian_english;
    } else if (mother_tongue_combobox.value == "italian" && target_language_combobox.value == "portuguese") {
        questions = italian_portuguese;
    } else if (mother_tongue_combobox.value == "italian" && target_language_combobox.value == "spanish") {
        questions = italian_spanish;
    } else if (mother_tongue_combobox.value == "italian" && target_language_combobox.value == "french") {
        questions = italian_french;
    } else if (mother_tongue_combobox.value == "italian" && target_language_combobox.value == "german") {
        questions = italian_german;
    }
    
    // SET A NEW QUIZ
    is_a_new_quiz = true;
    let choosed_questions = "";
    user_answers = ["", "", "", "", "", "", "", "", "", ""];

    shuffle(questions, 5);

    // QUESTIONS MODEL
    for (let i = 0; i < 10; i++) {
        choosed_questions += `<div class="question">
                                  <h2 class="question-title">Question ${i + 1}</h2>
                                  <p class="question-content">${questions[i].content}</p>
                                  <p class="question-level">${questions[i].difficulty}</p>
                                  <div class="answers">
                                      <button class="answer" id="a${i}" onclick="set_user_answer('a${i}', ${i})">${questions[i].answers[0]}</button>
                                      <button class="answer" id="b${i}" onclick="set_user_answer('b${i}', ${i})">${questions[i].answers[1]}</button>
                                      <button class="answer" id="c${i}" onclick="set_user_answer('c${i}', ${i})">${questions[i].answers[2]}</button>
                                      <button class="answer" id="d${i}" onclick="set_user_answer('d${i}', ${i})">${questions[i].answers[3]}</button>
                                      <button class="answer" id="e${i}" onclick="set_user_answer('e${i}', ${i})">${questions[i].answers[4]}</button>
                                  </div>
                              </div>`;
    }

    // CHECK ANSWER BURRON
    let check_answers_button = `<button class="check_answers" onclick="check_answers()">
                                    Check answers
                                </button>`;
    
    // GETTING THE PANEL WIDGET
    let panel = document.getElementById("panel");
    
    // PREPARING THE SCREEN
    panel.innerHTML = choosed_questions + check_answers_button;
    printed_questions = panel.innerHTML;

    // TO SCROLL UP
    panel.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}