$(document).ready(function() {

  //controls the animation to show or hide the tweet form
  const toggleTweetForm = function() {

    const $tweetForm = $("#new-tweet-form-container");

    if ($tweetForm.is(":hidden")) {
      $tweetForm.slideDown();
      $("#tweet-input").focus();

    } else {
      $tweetForm.slideUp();
    }
  };

  //modifies pulldown icon to allow user to toggle form
  $("#pullicon").click(function() {
    toggleTweetForm();
  });

  //modifies jump button to allow user to click and return to top with form toggled
  $(".jump-button").click(function() {
    const $tweetForm = $("#new-tweet-form-container");
    if (!$tweetForm.is(":visible")) toggleTweetForm();
    $("window").scrollTop(0);
  });

  //sets behaviour of submit button for new tweets
  $("#form-tweet-submit").on("submit", function(event) {

    event.preventDefault();
    
    const text = $("#tweet-input").val();
        
    if (tweetChecker(text)) {  //verifies tweet meets submission guidelines
  
      const tweet = $(this).serialize();
      submitTweet(tweet);
  
      $(this).trigger("reset"); //resets form after submission
      $("#tweet-input").keyup(); //forces a keyup event to reset the tweet character counter
    }
  });

  //recursively checks time since tweet to determine how to display timestamp to user
  const relativeTimeFetcher = function(tweetTime) {
    const today = new Date();
    const timeArray = [1000, 60, 60, 24, 365, 100];
    const timeStrings = ["seconds", "minutes", "hours", "days", "years", "centuries"];
    let timeCount = 0;

    const time = (today - tweetTime);

    const timeRefiner = function(duration) {
      if ((duration / timeArray[timeCount]) < timeArray[timeCount + 1]) {
        const timeRemaining = Math.round(duration / timeArray[timeCount]);
        const timeString = `${timeRemaining} ${timeStrings[timeCount]} ago`;
        return timeString;
      } else {
        let newDuration = duration / timeArray[timeCount];
        timeCount++;
        return timeRefiner(newDuration);
      }
    };
    return timeRefiner(time);
  };

  //Generates the markup for a tweet given a tweet object
  const createTweetElement = function(tweet) {
    const user = tweet.user;
    const timeSinceTweet = relativeTimeFetcher(tweet.created_at);
    const $tweetText = $("<p>").text(tweet.content.text);

    const tweetMarkup = `
      <article class="tweet">
        <header>
        <img class="tweet-avatar" src="${user.avatars}">
        <div class="tweet-user-info">
          <span>${user.name}</span>
          <span class="handle">${user.handle}</span>
        </div>
        </header>
        <p class="tweet-text">${$tweetText.html()}</p>
        <hr>
        <footer>
          <div>
            <span>${timeSinceTweet}</span>
          </div>
          <div class="interaction-div">
            <svg class="tweet-interaction-button int-flag" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
            <svg class="tweet-interaction-button int-repeat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
            <svg class="tweet-interaction-button int-heart" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </div>
        </footer>
      </article>
    `;
  
    return tweetMarkup;
  };
  
  //Empties the current tweets and redraws them from database gven the  results of an ajax retrieval
  const renderTweets = function(tweets) {
    const container = $('#tweets-container');
    container.empty();
    for (const tweet of tweets) {
      container.prepend(createTweetElement(tweet));
    }
  };

  //triggers an error with custom message in the designated spot on the tweet form
  const triggerError = function(msg) {
    const $msgWindow = $("#error-msg");

    $msgWindow.children().text(msg);
    $msgWindow.slideDown();

    //error message disappears after a certain amount of time
    const timeOut = 4000; //set timeout in milliseconds

    setTimeout(function() {
      $msgWindow.slideUp();
      $msgWindow.children().text("");
    }, timeOut);
  };

  //checks a tweet submission for minimum and maximum lengths
  //returns true or false
  const tweetChecker = function(tweetText) {

    if (!tweetText) {
      triggerError("Please enter some text!");
      return false;
    } else if (tweetText.length > 140) {
      triggerError("Your tweet is too long! Have fewer thoughts.");
      return false;
    } else {
      return true;
    }
  };

  //Ajax call to submit a new tweet
  //callback redraws the feed to reflect new data
  const submitTweet = function(tweet) {
    $.post("tweets", tweet, function(data) {
      return data;
    })
      .done(function() {
        loadTweets();
      });
  };

  //Ajax call to get tweet data for feed and draw them
  const loadTweets = function() {
    $.get("tweets", function(data) {
      return data;
    })
      .done(function(data) {
        renderTweets(data);
      });
  };
  
  //initially draws tweets from data on page load.
  loadTweets();
});
