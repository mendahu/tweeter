$(document).ready(function() {

  //updates the counter for a tweet to show user how many characters they have left
  const updateCounter = function() {

    const $counter = $("#tweet-counter");

    //sets the value of the counter
    const setCounter = function() {
      const remainingChars = 140 - $("#tweet-input").val().length;
      $counter.html(remainingChars);
      return remainingChars;
    };

    //sets the colour of the counter
    const setCounterColour = function(remainingChars) {
      (remainingChars < 0)
        ? $counter.css("color", "red")
        : $counter.css("color", "inherit");
    };

    //draw the counter with new information
    const remainingChars = setCounter();
    setCounterColour(remainingChars);
  };

  //adjusts the counter whenever the user enters a keystroke
  $("#tweet-input").on("keyup", function() {
    updateCounter();
  });
  
});