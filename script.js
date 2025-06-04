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
      preloadImages([
        '../assets/images/ml-robot-no-bubble.png',
        '../assets/images/robot.png'
      ]);

      setTimeout(() => {
        const imgWrapper = document.querySelector('.sub-page-wrapper');
        if (!imgWrapper) return;

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

          setTimeout(() => {
            if (firstImg.parentElement) {
              imgWrapper.removeChild(firstImg);
            }
          }, 3000);
        }, 3000);

      }, 6000); // ML robot animation start delay
    }

    // ✅ NEW: fullstack page logic
    if (path.includes('fullstack.html')) {
      preloadImages(['../assets/images/vanilla-ice.png']);

      setTimeout(() => {
        const imgWrapper = document.querySelector('.sub-page-wrapper');
        if (!imgWrapper) return;

        const iceImg = document.createElement('img');
        iceImg.src = '../assets/images/vanilla-ice.png';
        iceImg.alt = 'Vanilla Ice';
        iceImg.classList.add('vanilla-ice-img'); // You can change this class if needed
        iceImg.style.opacity = '0';
        iceImg.style.transition = 'opacity 1s ease';

        imgWrapper.appendChild(iceImg);

        setTimeout(() => {
          iceImg.style.opacity = '1';
        }, 10);
      }, 6000); // Delay before vanilla-ice appears
    }

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
    preloadImages([
      'assets/images/speech-bubble-landing-page.png'
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

    setTimeout(() => {
      sessionStorage.setItem('cameFromSubpage', 'false');
    }, 100);

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
