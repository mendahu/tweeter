$(document).ready(function() {

  //sets behaviour of submit button for new tweets
  $("#form-tweet-submit").on("submit", function(event) {
    event.preventDefault();
  
    const text = $(this).children().first().val();
      
    //verifies tweet meets submission guidelines
    if (tweetChecker(text)) {
      const tweet = $(this).serialize();
      submitTweet(tweet);
      $(this).trigger("reset"); //resets form after submission
      $("#tweet-input").keyup(); //forces a keyup event to reset the tweet character counter
    }
  });

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

  $("#pullicon").click(function() {
    toggleTweetForm();
  });

  $(".jump-button").click(function() {
    const $tweetForm = $("#new-tweet-form-container");
    if (!$tweetForm.is(":visible")) toggleTweetForm();
    $("window").scrollTop(0);
  });

  const createTweetElement = function(tweet) {
    const user = tweet.user;
    const today = new Date();
    const daysLeft = (today - tweet.created_at) / 1000 / 60 / 60 / 24;
  
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
            <span>${Math.round(daysLeft)} Days Ago</span>
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
  
  const renderTweets = function(tweets) {
    const container = $('#tweets-container');
    container.empty();
    for (const tweet of tweets) {
      container.prepend(createTweetElement(tweet));
    }
  };

  const triggerError = function(msg) {
    const $msgWindow = $("#error-msg");
    $msgWindow.children().text(msg);
    $msgWindow.slideDown();
    setTimeout(function() {
      $msgWindow.slideUp();
      $msgWindow.children().text("");
    }, 4000);
  };

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

  const submitTweet = function(tweet) {

    $.post("tweets", tweet, function(data) {
      return data;
    })
      .done(function() {
        loadTweets();
      });

  };

  const loadTweets = function() {
    $.get("tweets", function(data) {
      return data;
    })
      .done(function(data) {
        renderTweets(data);
      });
  };
  
  loadTweets();
});
