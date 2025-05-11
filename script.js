document.addEventListener("DOMContentLoaded", function () {
  const topLinks = document.querySelectorAll('.top-links a');
  const bottomLinks = document.querySelectorAll('.bottom-links a');
  const isLandingPage = document.body.classList.contains('landing-page');
  const isSubpage = document.body.classList.contains('sub-page');
  const cameFromSubpage = sessionStorage.getItem('cameFromSubpage') === 'true';

  let linkClicked = sessionStorage.getItem('linkClicked') === 'true'; // Check if a link was clicked previously in the session

  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      linkClicked = true;
      sessionStorage.setItem('linkClicked', 'true'); // Store in sessionStorage
    });
  });

  // Subpage: show links and remember we came from here
  if (isSubpage) {
    sessionStorage.setItem('cameFromSubpage', 'true');
    topLinks.forEach(link => link.classList.add('show'));
    bottomLinks.forEach(link => link.classList.add('show'));

    // Show the "vanilla-ice-cone.png" after 3 seconds on the subpage
    setTimeout(() => {
      const imgWrapper = document.querySelector('.ml-wrapper');
      if (imgWrapper && !document.getElementById('ice-cone-img')) {
        const img = document.createElement('img');
        img.src = '../assets/images/vanilla-ice.png';
        img.alt = 'Vanilla Ice Cone';
        img.id = 'vanilla-ice-cone-img';
        img.style.opacity = '0'; // Initially hidden
        imgWrapper.appendChild(img);

        // Fade in the image after adding it
        setTimeout(() => {
          img.style.transition = 'opacity 1s';
          img.style.opacity = '1'; // Fade in effect
        }, 10);
      }
    }, 3000); // Delay for 3 seconds on the subpage
  }

  // Landing Page: handle fade-ins and image
  if (isLandingPage) {
    const showLinks = () => {
      topLinks.forEach(link => link.classList.add('show'));
      bottomLinks.forEach(link => link.classList.add('show'));
    };

    // Show links instantly if returning from a subpage
    if (cameFromSubpage) {
      showLinks();
    } else {
      // Otherwise, fade in after 2 seconds
      setTimeout(showLinks, 2000);
    }

    // Reset the flag *after* checking it
    setTimeout(() => {
      sessionStorage.setItem('cameFromSubpage', 'false');
    }, 100);

    // Show image (the "speech bubble") after 10s if no link was clicked
    setTimeout(() => {
      if (!linkClicked) { // Only show if no link was clicked
        const wrapper = document.querySelector('.main-title-wrapper');
        if (wrapper && !document.getElementById('ml-bubble-img')) {
          const img = document.createElement('img');
          img.src = 'assets/images/speech-bubble-landing-page.png'; // Ensure the image path is correct
          img.alt = 'Machine Learning Collage';
          img.id = 'ml-bubble-img';
          img.style.opacity = '0'; // Initially hidden
          wrapper.appendChild(img);

          // Fade in the image after adding it
          setTimeout(() => {
            img.style.transition = 'opacity 1s';
            img.style.opacity = '1'; // Fade in effect
          }, 10);
        }
      }
    }, 10000); // Delay for 10 seconds if no link is clicked
  }
});
