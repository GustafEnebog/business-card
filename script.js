document.addEventListener("DOMContentLoaded", function () {
  const topLinks = document.querySelectorAll('.top-links a');
  const bottomLinks = document.querySelectorAll('.bottom-links a');
  const isLandingPage = document.body.classList.contains('landing-page');
  const isSubpage = document.body.classList.contains('sub-page');
  const cameFromSubpage = sessionStorage.getItem('cameFromSubpage') === 'true';

  let linkClicked = sessionStorage.getItem('linkClicked') === 'true';

  // Track clicks on all links
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      linkClicked = true;
      sessionStorage.setItem('linkClicked', 'true');
    });
  });

  // Function to preload images (improves smoothness of fades)
  function preloadImages(imageUrls) {
    imageUrls.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  if (isSubpage) {
    sessionStorage.setItem('cameFromSubpage', 'true');
    topLinks.forEach(link => link.classList.add('show'));
    bottomLinks.forEach(link => link.classList.add('show'));

    const path = window.location.pathname;

    if (path.includes('ml.html')) {
      // Preload images early
      preloadImages([
        '../assets/images/ml-robot-no-bubble.png',
        '../assets/images/robot.png'
      ]);

      setTimeout(() => {
        const imgWrapper = document.querySelector('.ml-wrapper');
        if (!imgWrapper) return;

        // First image (no bubble)
        const firstImg = document.createElement('img');
        firstImg.src = '../assets/images/ml-robot-no-bubble.png';
        firstImg.alt = 'Robot No Bubble';
        firstImg.classList.add('robot-img');
        firstImg.style.opacity = '0';
        firstImg.style.transition = 'opacity 1s ease';

        imgWrapper.appendChild(firstImg);

        setTimeout(() => {
          firstImg.style.opacity = '1';
        }, 10);

        // After 3 seconds, fade in second image (with bubble)
        setTimeout(() => {
          const secondImg = document.createElement('img');
          secondImg.src = '../assets/images/robot.png';
          secondImg.alt = 'Robot';
          secondImg.classList.add('robot-img');
          secondImg.style.opacity = '0';
          secondImg.style.transition = 'opacity 3s ease';

          imgWrapper.appendChild(secondImg);

          setTimeout(() => {
            secondImg.style.opacity = '1';
          }, 30);

          // Remove first image after second fully visible
          setTimeout(() => {
            if (firstImg.parentElement) {
              imgWrapper.removeChild(firstImg);
            }
          }, 3000);

        }, 3000);

      }, 6000); // Start sequence 6 seconds after page load
    }

    // Logo marching animation (reversed order as in your code)
    const logos = Array.from(document.querySelectorAll('.logo-container img')).reverse();
    const initialDelay = 1000;
    const logoDelay = 120;

    setTimeout(() => {
      logos.forEach((logo, index) => {
        setTimeout(() => {
          logo.classList.add('visible');
        }, index * logoDelay);
      });
    }, initialDelay);
  }

  if (isLandingPage) {
    // Preload speech bubble and logos for smooth appearance
    preloadImages([
      'assets/images/speech-bubble-landing-page.png',
      'assets/images/logo1.png',
      'assets/images/logo2.png',
      'assets/images/logo3.png',
      'assets/images/logo4.png',
      'assets/images/logo5.png',
      'assets/images/logo6.png',
      'assets/images/logo7.png',
      'assets/images/logo8.png',
      'assets/images/logo9.png',
      'assets/images/logo10.png'
    ]);

    const showLinks = () => {
      topLinks.forEach(link => link.classList.add('show'));
      bottomLinks.forEach(link => link.classList.add('show'));
    };

    if (cameFromSubpage) {
      showLinks();
    } else {
      setTimeout(showLinks, 2000);
    }

    // Reset cameFromSubpage flag soon after load
    setTimeout(() => {
      sessionStorage.setItem('cameFromSubpage', 'false');
    }, 100);

    // Show speech bubble 10 seconds after load, if no link clicked
    setTimeout(() => {
      if (!linkClicked) {
        const wrapper = document.querySelector('.main-title-wrapper');
        if (wrapper && !document.getElementById('bubble-img')) {
          const bubbleImg = document.createElement('img');
          bubbleImg.src = 'assets/images/speech-bubble-landing-page.png';
          bubbleImg.alt = 'Machine Learning Collage';
          bubbleImg.id = 'bubble-img';
          bubbleImg.style.opacity = '0';
          bubbleImg.style.transition = 'opacity 1s ease';
          wrapper.appendChild(bubbleImg);

          setTimeout(() => {
            bubbleImg.style.opacity = '1';
          }, 10);
        }
      }
    }, 10000);
  }
});
