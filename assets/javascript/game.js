var correct;
var incorrect;

function gameReset() {
    correct = 0;
    incorrect = 0;
    $("#correct").empty();
    $("#incorrect").empty();
}
function retrieve(level) {
    var queryURL = "https://opentdb.com/api.php?amount=01&difficulty=" + level + "&type=multiple";

    $.ajax({
        url: queryURL, method: "GET"
        }).then(function(response) {
            processQuestion(response, level);
    });
}
function processQuestion(triviaData, level) {
    var next = triviaData.results[0];
    var answers = randomizeAnswers(next);
    var question = next.question;
    var correctAnswer = next.correct_answer;
    answerTime(question, answers, correctAnswer, level);
}
function answerTime (question, answers, correctAnswer, level) {
    $("#guesses").empty();
    $("#question").html(question);

        for (let i=0; i<answers.length; i++) {
            var answerBtn = $("<button>");
            answerBtn.addClass("guessBtn")
            answerBtn.html(answers[i]);
            $("#guesses").append(answerBtn);
        }

    $(".guessBtn").one("click",function(){
        var guess = $(event.target).html();
        if (guess === correctAnswer) {
            correct++;
            $("#correct").text("Correct: " + correct);
        }
        else {
            incorrect++;
            $("#incorrect").text("Incorrect: " + incorrect);
            if (incorrect>9) {
                $("#answerPrompt").hide();
                $("#diffSelect").show();
            }
        }
        setTimeout(retrieve(level), 10000);
    });
}
function randomizeAnswers (question) {
    var answers = question.incorrect_answers;
    answers.push(question.correct_answer);
    answers=shuffle(answers);
    return answers;
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}