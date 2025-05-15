document.addEventListener("DOMContentLoaded", function () {
  const topLinks = document.querySelectorAll('.top-links a');
  const bottomLinks = document.querySelectorAll('.bottom-links a');
  const isLandingPage = document.body.classList.contains('landing-page');
  const isSubpage = document.body.classList.contains('sub-page');
  const cameFromSubpage = sessionStorage.getItem('cameFromSubpage') === 'true';

  let linkClicked = sessionStorage.getItem('linkClicked') === 'true';

  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      linkClicked = true;
      sessionStorage.setItem('linkClicked', 'true');
    });
  });

  if (isSubpage) {
    sessionStorage.setItem('cameFromSubpage', 'true');
    topLinks.forEach(link => link.classList.add('show'));
    bottomLinks.forEach(link => link.classList.add('show'));

    const path = window.location.pathname;

    if (path.includes('ml.html')) {
      setTimeout(() => {
        const imgWrapper = document.querySelector('.ml-wrapper');
        if (!imgWrapper) return;

        // Create and add the first image (no bubble)
        // Create and add the first image (no bubble)
        const firstImg = document.createElement('img');
        firstImg.src = '../assets/images/ml-robot-no-bubble.png';
        firstImg.alt = 'Robot No Bubble';
        firstImg.classList.add('robot-img');
        firstImg.style.opacity = '0';
        firstImg.style.transition = 'opacity 1s';

        imgWrapper.appendChild(firstImg);

        // Fade in the first image
        setTimeout(() => {
          firstImg.style.opacity = '1';
        }, 10);

        // After 1 second, replace with the second image (with bubble)
        setTimeout(() => {
          const secondImg = document.createElement('img');
          secondImg.src = '../assets/images/robot.png';
          secondImg.alt = 'Robot';
          secondImg.classList.add('robot-img');
          secondImg.style.opacity = '0';
          secondImg.style.transition = 'opacity 1s';

          imgWrapper.appendChild(secondImg);

          // Fade in second image
          setTimeout(() => {
            secondImg.style.opacity = '1';
          }, 10);

          // Remove first image after fade
          setTimeout(() => {
            if (firstImg.parentElement) {
              imgWrapper.removeChild(firstImg);
            }
          }, 1000);

        }, 1000);


      }, 6000); // Start 6 seconds after page load
    }








    // === Logo marching animation ===
    const logos = document.querySelectorAll('.logo-container img');
    const initialDelay = 1000; // Delay before the first logo appears
    const logoDelay = 120; // Delay between each logo

    setTimeout(() => {
      logos.forEach((logo, index) => {
        setTimeout(() => {
          logo.classList.add('visible');
        }, index * logoDelay);
      });
    }, initialDelay);
  }

  if (isLandingPage) {
    const showLinks = () => {
      topLinks.forEach(link => link.classList.add('show'));
      bottomLinks.forEach(link => link.classList.add('show'));
    };

    if (cameFromSubpage) {
      showLinks();
    } else {
      setTimeout(showLinks, 2000);
    }

    setTimeout(() => {
      sessionStorage.setItem('cameFromSubpage', 'false');
    }, 100);

    setTimeout(() => {
      if (!linkClicked) {
        const wrapper = document.querySelector('.main-title-wrapper');
        if (wrapper && !document.getElementById('ml-bubble-img')) {
          const img = document.createElement('img');
          img.src = 'assets/images/speech-bubble-landing-page.png';
          img.alt = 'Machine Learning Collage';
          img.id = 'ml-bubble-img';
          img.style.opacity = '0';
          wrapper.appendChild(img);

          setTimeout(() => {
            img.style.transition = 'opacity 1s';
            img.style.opacity = '1';
          }, 10);
        }
      }
    }, 10000);
  }
});