document.addEventListener("DOMContentLoaded", function () {
  const topLinks = document.querySelectorAll('.top-links a');
  const bottomLinks = document.querySelectorAll('.bottom-links a');

  // Wait 2 seconds before showing the links
  setTimeout(() => {
    // Add "show" class to top links
    topLinks.forEach(link => {
      link.classList.add('show');
    });

    // Add "show" class to bottom links
    bottomLinks.forEach(link => {
      link.classList.add('show');
    });
  }, 2000);  // 2000 milliseconds = 2 seconds
});
