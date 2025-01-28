function rotateCard(event, card) {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--mouse-x', x);
    card.style.setProperty('--mouse-y', -y);
}

function resetCard(card) {
    card.style.setProperty('--mouse-x', 0);
    card.style.setProperty('--mouse-y', 0);
}

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
// Theme switcher
if (prefersDarkScheme.matches) {
  
  // User has dark mode set (either OS or browser-level setting)
  console.log("Dark mode is preferred by the system.");

  // Set the theme to dark
  document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "dark");

  // Change the theme icon
  document.getElementById("theme-icon").classList.remove("fa-moon");
  document.getElementById("theme-icon").classList.add("fa-sun");

  // Change the button theme
  document.getElementById("redirect-button").classList.remove("btn-dark");
  document.getElementById("redirect-button").classList.add("btn-light");

  // Save theme preference
  if(!localStorage.getItem("theme"))
    localStorage.setItem("theme", "dark");
} else {
  // Light mode or no preference
  console.log("Light mode is preferred by the system.");

  // Set the theme to light
  document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "light");

  // Change the theme icon
    document.getElementById("theme-icon").classList.remove("fa-sun");
    document.getElementById("theme-icon").classList.add("fa-moon");

    // Change the button theme
    document.getElementById("redirect-button").classList.remove("btn-light");
    document.getElementById("redirect-button").classList.add("btn-dark");

    // Save theme preference
    if(!localStorage.getItem("theme"))
        localStorage.setItem("theme", "dark");
}

// Optional: Load previously saved theme from localStorage
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  console.log("Dark mode is loaded from local storage.");

  document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "dark");

  document.getElementById("theme-icon").classList.remove("fa-moon");
  document.getElementById("theme-icon").classList.add("fa-sun");

  document.getElementById("redirect-button").classList.remove("btn-dark");
  document.getElementById("redirect-button").classList.add("btn-light");
  // Save theme preference
  localStorage.setItem("theme", "dark");
} else {
    console.log("Light mode is loaded from local storage.");
    
    document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "light");

    document.getElementById("theme-icon").classList.remove("fa-sun");
    document.getElementById("theme-icon").classList.add("fa-moon");

    document.getElementById("redirect-button").classList.remove("btn-light");
    document.getElementById("redirect-button").classList.add("btn-dark");

    // Save theme preference
    localStorage.setItem("theme", "light");
}

// Listen for toggle button clicks
document.getElementById("theme-toggle-btn").addEventListener("click", () => {
  // Toggle theme classes
  if (document.getElementsByTagName("html")[0].getAttribute("data-bs-theme") === "light") {
    console.log("Switching to dark mode.");
    
    document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "dark");

    document.getElementById("theme-icon").classList.remove("fa-moon");
    document.getElementById("theme-icon").classList.add("fa-sun");

    document.getElementById("redirect-button").classList.remove("btn-dark");
    document.getElementById("redirect-button").classList.add("btn-light");
    // Save theme preference
    localStorage.setItem("theme", "dark");
  } else {
    console.log("Switching to light mode.");

    document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", "light");

    document.getElementById("theme-icon").classList.remove("fa-sun");
    document.getElementById("theme-icon").classList.add("fa-moon");

    document.getElementById("redirect-button").classList.remove("btn-light");
    document.getElementById("redirect-button").classList.add("btn-dark");
    // Save theme preference
    localStorage.setItem("theme", "light");
  }
});



//Carousel
// Grab references
const carousel = document.getElementById('carousel3d');
const cards = document.querySelectorAll('.card3d');

let angle = 0;                // Current rotation angle around Y-axis
let autoRotateInterval = null;
let isDragging = false;       // Track mouse/touch drag
let startX = 0;               // Starting x-position of mouse/touch
let currentX = 0;             // Current x-position of mouse/touch

/**
 * Utility: Apply rotation to the carousel.
 */
function setCarouselRotation(newAngle) {
  // TranslateZ is negative if you want the "circle" effect from behind
  // but you can adjust it to your preference
  carousel.style.transform = `translateZ(-300px) rotateY(${newAngle}deg)`;
}

/**
 * Start auto-rotating the carousel at a slow speed.
 */
function startAutoRotate() {
  if (autoRotateInterval) return; // don't start twice

  // Rotate every X ms
  autoRotateInterval = setInterval(() => {
    // Decrease angle to rotate clockwise,
    // Increase angle to rotate counterclockwise
    angle -= 0.5; // adjust speed as needed
    setCarouselRotation(angle);
  }, 100);        // 100 ms intervals -> slower or faster
}

/**
 * Stop auto-rotation.
 */
function stopAutoRotate() {
  clearInterval(autoRotateInterval);
  autoRotateInterval = null;
}

// Start rotating automatically on load
startAutoRotate();

// -------------------------------------------------------------
// 2) Stop the rotation on HOVER over a card (not entire carousel).
//    Resume on MOUSE OUT.
// -------------------------------------------------------------
cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    stopAutoRotate();
  });
  card.addEventListener('mouseleave', () => {
    // Only resume auto-rotate if user is not dragging
    if (!isDragging) {
      startAutoRotate();
    }
  });
});

// -------------------------------------------------------------
// 3) Implement dragging with mouse or touch to slide the carousel
// -------------------------------------------------------------

// MOUSE EVENTS
carousel.addEventListener('mousedown', (e) => {
  isDragging = true;
  stopAutoRotate();  // stop auto-rotating while user drags
  startX = e.clientX;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  currentX = e.clientX;
  let delta = currentX - startX;
  angle -= delta * 0.5;  // adjust sensitivity
  setCarouselRotation(angle);
  startX = currentX;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  // Resume auto-rotate if user stops dragging
  startAutoRotate();
});

// TOUCH EVENTS
carousel.addEventListener('touchstart', (e) => {
  isDragging = true;
  stopAutoRotate();
  startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  let delta = currentX - startX;
  angle -= delta * 0.5; // adjust sensitivity
  setCarouselRotation(angle);
  startX = currentX;
});

document.addEventListener('touchend', () => {
  isDragging = false;
  startAutoRotate();
});