$(document).ready(function() {

  let windowHasScrolled = false;

  const jumpWatcher = new IntersectionObserver(function(entries) {
    const $button = $(".jump-button");
    if (entries[0].intersectionRatio > 0) {
      if (windowHasScrolled) {
        $button.fadeOut(500);
      } else {
        $button.hide();
      }
    } else {
      $button.fadeIn(500);
      windowHasScrolled = true;
    }
  });

  jumpWatcher.observe(document.querySelector(".profile"));
});