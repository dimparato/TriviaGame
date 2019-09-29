function retrieve(level) {
    var queryURL = "https://opentdb.com/api.php?amount=10&difficulty=" + level + "&type=multiple";

    $.ajax({
        url: queryURL, method: "GET"
        }).then(function(response) {
            answer(response);
    });
}
function answer(trivia) {
    var correct = 0;
    var incorrect = 0;
    var answers = [];

    for (let i=0; i<10; i++)
    {
        setInterval (function () {
            answers = trivia.results[i].incorrect_answers;
            answers.push(trivia.results[i].correct_answer);
            answers=shuffle(answers);

            $("#question").text(trivia.results[i].question);

            $("#answer1").text(answers[0]);
            $("#answer2").text(answers[1]);
            $("#answer3").text(answers[2]);
            $("#answer4").text(answers[3]);

            $(".guess").on("click",function() {
                if (this.text === trivia.results[i].correct_answer) {
                    correct++;
                    $("<div>").text("Right!");
                }
                else {
                    incorrect++;
                    $("<div>").text("Wrong!");
                }
            });
        }, 10000);
    }

    $("<div>").text("Correct = " + correct);
    $("<div>").text("Incorrect = " + incorrect);
    //$("#answerPrompt").hide();
    //$("#diffSelect").show();
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