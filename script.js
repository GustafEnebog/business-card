document.addEventListener("DOMContentLoaded", function () {
  const topLinks = document.querySelectorAll('.top-links a');
  const bottomLinks = document.querySelectorAll('.bottom-links a');

  const isLandingPage = document.body.classList.contains('landing-page');
  const isSubpage = document.body.classList.contains('sub-page');

  const cameFromSubpage = sessionStorage.getItem('cameFromSubpage') === 'true';

  if (isSubpage) {
    // Set the flag when on a subpage
    sessionStorage.setItem('cameFromSubpage', 'true');
    topLinks.forEach(link => link.classList.add('show'));
    bottomLinks.forEach(link => link.classList.add('show'));
  }

  if (isLandingPage) {
    if (!cameFromSubpage) {
      // Fade-in ONLY if user is not coming from subpage
      setTimeout(() => {
        topLinks.forEach(link => link.classList.add('show'));
        bottomLinks.forEach(link => link.classList.add('show'));
      }, 2000);
    } else {
      // Show links instantly if coming from subpage
      topLinks.forEach(link => link.classList.add('show'));
      bottomLinks.forEach(link => link.classList.add('show'));
    }

    // Delay the reset of the flag until after we’ve checked it
    setTimeout(() => {
      sessionStorage.setItem('cameFromSubpage', 'false');
    }, 100);
  }
});
