document.addEventListener("DOMContentLoaded", function () {
  const topLinks = document.querySelectorAll('.top-links a');
  const bottomLinks = document.querySelectorAll('.bottom-links a');

  // Check if we're on the landing page or a subpage
  const isLandingPage = document.body.classList.contains('landing-page');
  const isSubpage = document.body.classList.contains('sub-page');

  // Use sessionStorage to track navigation
  const cameFromSubpage = sessionStorage.getItem('cameFromSubpage') === 'true';

  // If navigating to a subpage, set the sessionStorage flag
  if (isSubpage) {
    sessionStorage.setItem('cameFromSubpage', 'true');
  }

  // If on the landing page and not coming from a subpage, apply fade-in effect
  if (isLandingPage && !cameFromSubpage) {
    setTimeout(() => {
      topLinks.forEach(link => link.classList.add('show'));
      bottomLinks.forEach(link => link.classList.add('show'));
    }, 2000);
  }

  // If on the subpage, show the links immediately without fade-in
  if (isSubpage) {
    topLinks.forEach(link => link.classList.add('show')); // Ensure top links are visible immediately
    bottomLinks.forEach(link => link.classList.add('show')); // Optional, if you want bottom links visible too
  }

  // Reset sessionStorage flag after page load
  sessionStorage.setItem('cameFromSubpage', 'false');
});
