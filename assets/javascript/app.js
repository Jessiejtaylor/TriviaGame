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

$("#startButton").show();
$("#scoreBoard").hide();
$("#questions").hide();

// Object is a container that groups all variables together. We need to group bc the variables have a relationship. We have to have right answers, possible, and unanswered - all related to one task.
// if you have two []'s, you'll need two for loops, one to display the first one and another for the second
var arrayDataBase = [
  {
    question: "Who was Miley Cyrus married to?",

    choices: ["Zac Efron", "Liam Hemsworth", "Caitlin Carter", "Cody Simpson"],

    //  no array bc theres only one value
    rightAnswer: "Liam Hemsworth"
  },
  {
    question: "What is Kylie Jenner's daugher's name?",

    choices: ["True", "Stormi", "Dream", "Saint"],

    rightAnswer: "Stormi"
  },
  {
    question: "Who is Justin Beiber's new song 'Yummy' about?",

    choices: ["Sofia Richie", "Kylie Jenner", "Selena Gomez", "Hailey Baldwin"],

    rightAnswer: "Hailey Baldwin"
  },
  {
    question: "Who is Sofia Richie dating?",

    choices: ["Drake", "Younes Benjima", "Scott Disick", "Travis Scott"],

    rightAnswer: "Scott Disick"
  }
];
// array is [], object is {}. Array access's content starting from index 0, for the obj, you access content through . operator. ex. "objectname.propertyname"

var rightAnswer = 0;
var wrongAnswer = 0;
var unanswered = 0;

var remainingTime = 30;
var timerInterval;

// start the trivia
function initializeTrivia() {
  rightAnswer = 0;
  wrongAnswer = 0;
  unanswered = 0;

  remainingTime = 30;

  $("#startButton").show();
  //   $("#scoreBoard").hide();
  $("#questions").hide();
}

initializeTrivia();

$("#startButton").on("click", function() {
  $("#startButton").hide();
  $("#questions").show();
  $("#scoreBoard").hide();
  setup();
  timerInterval = setInterval(countDown, 1000);
});

function setup() {
  $("#questions").empty();
  var div = $("<div>");
  //   try inline to get the timer and "remaining time" on the same line
  div.text("Remaining Time: ");
  div.append('<div id="time_count"></div>');
  $("#questions").append(div);

  for (let index = 0; index < arrayDataBase.length; index++) {
    // creating a dynamic H2
    var h2 = $("<h2>");
    h2.html(arrayDataBase[index].question);
    $("#questions").append(h2);

    // second for loop is to display the choices
    for (
      let indexChoices = 0;
      indexChoices < arrayDataBase[index].choices.length;
      indexChoices++
    ) {
      var choice = arrayDataBase[index].choices[indexChoices];
      var input = $("<input type='radio'>");
      input.attr("name", arrayDataBase[index].question);
      console.log(choice);
      // attr is anything before the = sign
      input.attr("value", choice);

      //   this is the section im working on 1/17/20
      input.attr("data-answer", arrayDataBase[index].rightAnswer);
      input.attr("class", "radioBtn");
      // input is button, choice is text
      $("#questions").append(input, choice); // removed , choice
    }
  }
}
$(".radioBtn").on("click", function() {
  var getCurrentClicked = $(this).val();
  var getStoredDataAnswer = $(this).attr("data-answer");
  console.log(getCurrentClicked);
  if (getCurrentClicked === getStoredDataAnswer) {
    // as a way to test for correct
    alert("correct");
  } else {
    alert("wrong");
  }
});

function onTimerEnd() {
  // if selected answer == right => Correct

  // else => Incorrect

  //console.log($("input"));
  var i_list = $("input");
  for (var i = 0; i < i_list.length; i++) {
    // console.log(i_list[i].checked);
    if (i_list[i].checked) {
      // change to be checking the value in the database, search by the name that i have bc all of the names have a reference to the question
      //   console.log(i_list[i].value);
      //   console.log(i_list[i].name);
      // loop thru all questions, match on each iteration
      // when found, compare rightAnswer to i_list[i].value
      for (var j = 0; j < arrayDataBase.length; j++) {
        if (arrayDataBase[j].question === i_list[i].name) {
          //   console.log(
          //     i_list[i].value +
          //       " " +
          //       (i_list[i].value === arrayDataBase[j].rightAnswer)
          //   );
          if (i_list[i].value === arrayDataBase[j].rightAnswer) {
            // correctness
            rightAnswer++;
          } else {
            wrongAnswer++;
          }
        }
      }
    }
  }
  unanswered = 4 - rightAnswer - wrongAnswer;
  updateScores();
  clearInterval(timerInterval);

  initializeTrivia();
}

function updateScores() {
  $("#scoreBoard").text(
    `Right: ${rightAnswer}
    Wrong: ${wrongAnswer}
    Unanswered: ${unanswered}`
  );
  $("#scoreBoard").show();
}

function countDown() {
  // update time dependent elements
  remainingTime--;
  // .empty resets the whole div to blank
  //   $("#questions").empty();
  //
  $("#time_count").text(remainingTime);
  if (remainingTime <= 0) {
    onTimerEnd();
  }
  //

  // index = itterator, < = ending condition, index++ = incriment (by 1 in this case)
}
