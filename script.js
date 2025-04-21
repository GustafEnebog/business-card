document.addEventListener("DOMContentLoaded", () => {
  console.log("Page content loaded");

  const backArrow = document.querySelector(".back-arrow");

  // Function to show/hide top links
  function showTopLinks() {
    document.querySelectorAll('.top-links a').forEach(link => {
      link.classList.add("show");
      link.style.display = "inline-block";
      console.log("Link shown:", link);
    });
  }

  // Subpage: show top links immediately
  if (document.body.classList.contains('sub-page')) {
    showTopLinks();
    if (backArrow) backArrow.style.display = "block";
    console.log("Subpage detected, showing top links and back arrow");
  } else {
    // Homepage: fade in top/bottom links
    setTimeout(() => {
      document.querySelectorAll('.top-links a, .bottom-links a').forEach(link => {
        link.classList.add("show");
      });
      console.log("Homepage: links faded in");
    }, 2000);
  }

  // Handle back arrow click
  if (backArrow) {
    backArrow.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Back arrow clicked, closing overlay");

      const overlay = document.querySelector(".page-overlay");
      if (overlay) {
        overlay.classList.remove("active");
        overlay.classList.add("from-right");

        setTimeout(() => {
          overlay.remove();
          backArrow.style.display = "none";
          console.log("Overlay removed, back arrow hidden");
          showTopLinks();
        }, 800);
      } else {
        console.warn("No overlay found when back arrow was clicked");
      }
    });
  }

  // Handle subpage link clicks
  document.querySelectorAll(".bottom-links a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      console.log("Subpage link clicked:", link);

      const overlay = document.createElement("div");
      overlay.className = "page-overlay";

      const loading = document.createElement("div");
      loading.className = "loading-indicator";
      loading.innerText = "Loading...";
      overlay.appendChild(loading);

      const directionClass =
        link.classList.contains("slide-left") ? "from-left" :
        link.classList.contains("slide-bottom") ? "from-bottom" :
        "from-right";
      overlay.classList.add(directionClass);

      const iframe = document.createElement("iframe");
      iframe.src = link.getAttribute("href");
      overlay.appendChild(iframe);

      iframe.onload = () => {
        loading.remove();
        console.log("Iframe loaded:", iframe.src);
      };
      iframe.onerror = () => {
        loading.innerText = "Failed to load content.";
      };

      document.body.appendChild(overlay);
      void overlay.offsetWidth;
      overlay.classList.add("active");

      if (backArrow) {
        backArrow.style.display = "block";
      }
    });
  });
});
