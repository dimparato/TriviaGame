var correct;
var incorrect;
var token;
var clock;
var timer = 10;
var queryURL = "https://opentdb.com/api_token.php?command=request";

$.ajax({
    url: queryURL, method: "GET"
    }).then(function(response) {
        token = response.token;
});

function gameReset() {
    correct = 0;
    incorrect = 0;
    $("#correct").empty();
    $("#incorrect").empty();
}
function retrieve(level) {
    queryURL = "https://opentdb.com/api.php?amount=01&difficulty=" + level + "&type=multiple&token=" + token;

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
    timer = 10;
    $("#guesses").empty();
    $("#timer").html(timer);
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
            clearTimeout(clock);
            timer = 10;
            retrieve(level);
        }
        else {
            incorrect++;
            $("#incorrect").text("Incorrect: " + incorrect);
            if (incorrect>9) {
                $("#answerPrompt").hide();
                $("#diffSelect").show();
            }
            clearTimeout(clock);
            timer = 10;
            retrieve(level);
        }
    });
    clock = setTimeout(countDown, 1000);
    function countDown() {
        timer--;
        $("#timer").html(timer);
        if (timer > 0) {
            setTimeout(countDown, 1000);
        }
        else {
            incorrect++;
            $("#incorrect").text("Incorrect: " + incorrect);
            if (incorrect>9) {
                $("#answerPrompt").hide();
                $("#diffSelect").show();
            }
            clearTimeout(clock);
            retrieve(level);
            //return;
        }
        //clearTimeout(clock);
        //retrieve(level);
        //return;
    }
    //clearTimeout(clock);
    //retrieve(level);
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