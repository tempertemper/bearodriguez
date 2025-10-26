// Adapted from @jonhurrel's code on this PR's comment thread: https://github.com/alphagov/govuk_elements/pull/272
(function () {
  'use strict';
  function buttonLinkSpace(link) {
    // If the space key is pressed on a focussed button, don't scroll the page down and click the button
    link.addEventListener('keydown', function(event) {
      const code = event.charCode || event.keyCode;
      if (code === 32) {
        event.preventDefault();
        link.click();
      }
    });
  }
  // Find all the links with a class of button
  for (const link of document.querySelectorAll('[data-button]')) {
    // Add the class of link for styling
    link.classList.add('button');
    // Add the relevant role
    link.setAttribute('role', 'button');
    // Stop the link being draggable
    link.setAttribute('draggable', 'false');
    // Apply altered the space key behaviour
    buttonLinkSpace(link);
  }
})();
