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

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  renderTweets(data);
});
