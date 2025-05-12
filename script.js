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
  
    // Determine the correct image based on the current page
    const path = window.location.pathname;
    let imageSrc = '';
    let imageAlt = '';
    let imageId = '';
  
    if (path.includes('ml.html')) {
      imageSrc = '../assets/images/robot.png';
      imageAlt = 'Robot';
      imageId = 'robot-img';
    } else if (path.includes('aero.html')) {
      imageSrc = '../assets/images/airplane-drawing.png';
      imageAlt = 'Airplane drawing';
      imageId = 'airplane-drawing-img';
    } else if (path.includes('fullstack.html')) {
      imageSrc = '../assets/images/vanilla-ice.png';
      imageAlt = 'Vanilla Ice Cone';
      imageId = 'vanilla-ice-cone-img';
    }
  
    if (imageSrc) {
      setTimeout(() => {
        const imgWrapper = document.querySelector('.ml-wrapper');
        if (imgWrapper && !document.getElementById(imageId)) {
          const img = document.createElement('img');
          img.src = imageSrc;
          img.alt = imageAlt;
          img.id = imageId;
          img.style.opacity = '0';
          imgWrapper.appendChild(img);
  
          setTimeout(() => {
            img.style.transition = 'opacity 1s';
            img.style.opacity = '1';
          }, 10);
        }
      }, 6000);
    }

    // === Logo marching animation ===
    const logos = document.querySelectorAll('.logo-container img');
    const initialDelay = 1000; // Delay before the first logo appears
    const logoDelay = 120;     // Delay between each logo

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
