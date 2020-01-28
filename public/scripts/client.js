$(document).ready(function() {

  const createTweetElement = function(tweet) {
    const user = tweet.user;
    const today = new Date();
    const daysLeft = (today - tweet.created_at) / 1000 / 60 / 60 / 24;
  
    const tweetMarkup = `
      <article>
        <header>
          <div>
            <img src="${user.avatars}">
            <span>${user.name}</span>
          </div>
          <div>
            <span class="handle">${user.handle}</span>
          </div>
        </header>
        <p>${tweet.content.text}</p>
        <hr>
        <footer>
          <div>
            <span>${Math.round(daysLeft)} Days Ago</span>
          </div>
          <div>
            <span>&#9872;&nbsp;</span>
            <span>&#10226;&nbsp;</span>
            <span>&#9829;</span>
          </div>
        </footer>
      </article>
    `;
  
    return tweetMarkup;
  };
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
  };

  const tweetChecker = function(tweetText) {
    if (!tweetText) {
      alert("Please enter text in to your tweet before submitting!");
      return false;
    } else if (tweetText.length > 140) {
      alert("Your tweet is too long! Have fewer thoughts.");
      return false;
    } else {
      return true;
    }
  };

  $("#form-tweet-submit").on("submit", function(event) {
    event.preventDefault();

    const text = $(this).children().first().val();
    
    if (tweetChecker(text)) {
      const tweet = $(this).serialize();
      submitTweet(tweet);
    }
  });

  const submitTweet = function(tweet) {

    $.post("tweets", tweet, function(data) {
      return data;
    })
      .done(function(data) {
        console.log(data);
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
