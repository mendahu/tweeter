$(document).ready(function() {

  const updateCounter = function() {

    const $counter = $("#tweet-counter");

    const setCounter = function() {
      const remainingChars = 140 - $("#tweet-input").val().length;
      $counter.html(remainingChars);
      return remainingChars;
    };

    const setCounterColour = function(remainingChars) {
      (remainingChars < 0)
        ? $counter.css("color", "red")
        : $counter.css("color", "inherit");
    };

    const remainingChars = setCounter();
    setCounterColour(remainingChars);
  };

  //adjusts the counter whenever the user enters a keystroke
  $("#tweet-input").on("keyup", function() {
    updateCounter();
  });
  
});