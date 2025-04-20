document.addEventListener("DOMContentLoaded", () => {
  console.log("Page content loaded");

  // 🔸 Ensure back arrow visibility and functionality on subpages
  const backArrow = document.querySelector(".back-arrow");
  if (backArrow) {
    // Show the back arrow only on subpages
    if (document.body.classList.contains('sub-page')) {
      backArrow.style.display = "block";
    } else {
      backArrow.style.display = "none";
    }

    // Handle the back arrow click to close the overlay and go back
    backArrow.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Back arrow clicked, closing overlay");

      const overlay = document.querySelector(".page-overlay");
      if (overlay) {
        // Add class to trigger the slide animation out (this could be 'from-right' or 'from-left' etc.)
        overlay.classList.remove("active");
        overlay.classList.add("from-right");  // Adjust direction based on your requirements

        // Wait for the animation to finish before removing the overlay and hiding the back arrow
        setTimeout(() => {
          overlay.remove();
          // Now hide the back arrow after the overlay is removed
          backArrow.style.display = "none";
          console.log("Overlay removed, back arrow hidden");
        }, 800);  // Match this with the duration of the overlay animation
      }
    });
  }

  // 🔸 Ensure top links (GitHub, LinkedIn) are visible on subpages
  const topLinks = document.querySelectorAll('.top-links a');
  if (document.body.classList.contains('sub-page')) {
    topLinks.forEach(link => {
      link.style.display = "inline-block";  // Make sure links are visible
      console.log("GitHub/LinkedIn link displayed:", link);
    });
  }

  // 🔸 Check if it's not a subpage before applying fade-in effect
  if (!document.body.classList.contains('sub-page')) {
    console.log("Not a subpage, fading in links...");
    setTimeout(() => {
      document.querySelectorAll('.top-links a, .bottom-links a').forEach(link => {
        link.classList.add('show');
        console.log("Link faded in:", link);
      });
    }, 2000);
  } else {
    console.log("On a subpage, no fade-in.");
  }

  // 🔸 Handle subpage links
  const links = document.querySelectorAll(".bottom-links a");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      console.log("Link clicked:", link);

      // 🔸 Create overlay
      const overlay = document.createElement("div");
      overlay.className = "page-overlay";

      // 🔸 Add loading indicator
      const loading = document.createElement("div");
      loading.className = "loading-indicator";
      loading.innerText = "Loading...";
      overlay.appendChild(loading);

      // 🔸 Determine target page
      const target = link.getAttribute("href").split("/")[1].split(".")[0];
      console.log("Target page:", target);

      // 🔸 Determine slide direction
      let directionClass = "from-right";
      if (link.classList.contains("slide-left")) {
        directionClass = "from-left";
      } else if (link.classList.contains("slide-bottom")) {
        directionClass = "from-bottom";
      }
      overlay.classList.add(directionClass);

      // 🔸 Inject iframe
      const iframe = document.createElement("iframe");
      iframe.src = link.getAttribute("href");  // Use the actual href here
      console.log("Iframe source set to:", iframe.src);
      overlay.appendChild(iframe);

      // 🔸 On iframe load, remove loading indicator
      iframe.onload = () => {
        console.log("Iframe loaded successfully");
        loading.remove();
      };

      // 🔸 On iframe error, show fallback message
      iframe.onerror = () => {
        console.log("Failed to load iframe");
        loading.innerText = "Failed to load content.";
      };

      // 🔸 Append overlay and trigger animation
      document.body.appendChild(overlay);
      void overlay.offsetWidth; // Force reflow
      overlay.classList.add("active");

      // 🔸 Show back arrow (make it visible)
      if (backArrow) {
        console.log("Back arrow found, displaying...");
        backArrow.style.display = "block";  // Show the back arrow
      }
    });
  });
});
