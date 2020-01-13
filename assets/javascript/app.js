// 1. Create a start button to kick-off the game
// 2. Create an on click event to click the button
// 3. Set the max remaining time to 28 seconds
// 4. Come up with the questions and answer options
// 5. Store 5 questions + possible answers + right answer into an array
// 6. Make it so that they can only choose one answer per question
// 7. Write a count down function to count down to 0, then reset
// 8. Check the possible answers that the user clicked with the right answer
// 9. Keep track of the right answers, wrong answers, and unanswered according to the users click
// 10. Show the score with right answers, wrong answers, and unanswered

$("#startButton").show()
$("#scoreBoard").hide()
$("#questions").hide()

// Object is a container that groups all variables together. We need to group bc the variables have a relationship. We have to have right answers, possible, and unanswered - all related to one task.
// if you have two []'s, you'll need two for loops, one to display the first one and another for the second
var arrayDataBase = [{
    question: "Who was Miley Cyrus married to?",

    choices: ["Zac Efron", "Liam Hemsworth", "Caitlin Carter", "Cody Simpson"],

    //  no array bc theres only one value
    rightAnswer: "Liam Hemsworth"
}, {
    question: "What is Kylie Jenner's daugher's name?",

    choices: ["True", "Stormi", "Dream", "Saint"],

    rightAnswer: "Stormi"
}]
// array is [], object is {}. Array access's content starting from index 0, for the obj, you access content through . operator. ex. "objectname.propertyname"

var rightAnswer = 0
var wrongAnswer = 0
var unanswered = 0

var remainingTime = 28

function initializeTrivia() {
    rightAnswer = 0
    wrongAnswer = 0
    unanswered = 0

    remainingTime = 28

    $("#startButton").show()
    $("#scoreBoard").hide()
    $("#questions").hide()


}

initializeTrivia()

$("#startButton").on("click", function () {
    $("#startButton").hide()
    $("#questions").show()
    $("#scoreBoard").hide()

    setInterval(countDown, 1000)
})

function countDown() {
    remainingTime--
    // .empty resets the whole div to blank
    $("#questions").empty()
    var div = $("<div>")
    div.html("Remaining Time: " + remainingTime)
    $("#questions").append(div)

    // index = itterator, < = ending condition, index++ = incriment (by 1 in this case)
    for (let index = 0; index < arrayDataBase.length; index++) {
        // creating a dynamic H2
        var h2 = $("<h2>")
        h2.html(arrayDataBase[index].question)
        $("#questions").append(h2)

        // second for loop is to display the choices
        for (let indexChoices = 0; indexChoices < arrayDataBase[index].choices.length; indexChoices++) {

            var choice = arrayDataBase[index].choices[indexChoices]
            var input = $("<input type='radio'>")
            console.log(choice)
            // attr is anything before the = sign
            input.attr("value", choice)

            // input is button, choice is text
            $("#questions").append(input, choice)
        }

    }


}