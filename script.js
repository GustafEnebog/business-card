document.addEventListener("DOMContentLoaded", () => {
  console.log("Page content loaded");

  // 🔸 Fade in top and bottom links after 2 seconds
  setTimeout(() => {
    document.querySelectorAll('.top-links a, .bottom-links a').forEach(link => {
      link.classList.add('show');
    });
  }, 2000);

  // 🔸 Handle subpage links
  const links = document.querySelectorAll(".bottom-links a");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      // 🔸 Create overlay
      const overlay = document.createElement("div");
      overlay.className = "page-overlay";

      // 🔸 Add back arrow button (instead of ✕)
      const backArrow = document.createElement("div");
      backArrow.className = "back-arrow";
      backArrow.innerHTML = `<a href="#" id="closeOverlay">&#8592;</a>`;
      overlay.appendChild(backArrow);

      // 🔸 Add loading indicator
      const loading = document.createElement("div");
      loading.className = "loading-indicator";
      loading.innerText = "Loading...";
      overlay.appendChild(loading);

      // 🔸 Determine target page
      const target = link.getAttribute("href").split("/")[1].split(".")[0];

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
      iframe.src = `pages/${target}.html`;
      overlay.appendChild(iframe);

      // 🔸 On iframe load, remove loading indicator
      iframe.onload = () => {
        loading.remove();
      };

      // 🔸 On iframe error, show fallback message
      iframe.onerror = () => {
        loading.innerText = "Failed to load content.";
      };

      // 🔸 Append overlay and trigger animation
      document.body.appendChild(overlay);
      void overlay.offsetWidth; // Force reflow
      overlay.classList.add("active");

      // 🔸 Arrow-based close logic with slide-out
      backArrow.querySelector("#closeOverlay").addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.remove("active");
        setTimeout(() => {
          overlay.remove();
        }, 800);
      });
    });
  });
});
