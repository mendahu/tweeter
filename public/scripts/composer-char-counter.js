$(document).ready(function() {

  //counts characters in textbox and updates the counter for the user
  $("textarea[name='text']").on("keyup", function(event) {
    const remainingChars = 140 - $(this).val().length;
    const counter = $(this).next().next();
    counter.html(remainingChars);
    if (remainingChars < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "inherit");
    }
  });

});