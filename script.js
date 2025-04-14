document.addEventListener("DOMContentLoaded", () => {
  console.log("Page content loaded");

  // 🔸 Fade in top and bottom links after 2 seconds
  setTimeout(() => {
    document.querySelectorAll('.top-links a, .bottom-links a').forEach(link => {
      link.classList.add('show');
    });
  }, 2000);

  // 🔸 Handle subpage links (on clicking one of the bottom links)
  const links = document.querySelectorAll(".bottom-links a");

  // Create the sliding overlay container only when a link is clicked
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();  // Prevent default link behavior

      // 🔸 Create the overlay container when a link is clicked
      const overlay = document.createElement("div");
      overlay.className = "page-overlay";
      document.body.appendChild(overlay);

      console.log(`Clicked on: ${link.href}`);  // Debugging log

      // Clean existing classes on overlay
      overlay.className = "page-overlay";

      // Determine which page to load
      const target = link.getAttribute("href").split("/")[1].split(".")[0];

      // Determine slide direction based on custom classes
      let directionClass = "from-right";  // Default slide direction
      if (link.classList.contains("slide-left")) {
        directionClass = "from-left";
      } else if (link.classList.contains("slide-bottom")) {
        directionClass = "from-bottom";
      }

      overlay.classList.add(directionClass);

      // Inject iframe with close button
      overlay.innerHTML = `
        <button class="close-overlay">✕</button>
        <iframe src="pages/${target}.html"></iframe>
      `;

      console.log(`Loading iframe with src: pages/${target}.html`);  // Debugging log

      // Force reflow to trigger animation
      void overlay.offsetWidth;

      // Activate slide-in animation
      overlay.classList.add("active");

      // 🔸 Handle close button
      overlay.addEventListener("click", e => {
        if (e.target.classList.contains("close-overlay")) {
          overlay.classList.remove("active");
          setTimeout(() => {
            overlay.remove();  // Remove overlay after animation
          }, 800);  // Delay to match the animation duration
        }
      });
    });
  });
});
