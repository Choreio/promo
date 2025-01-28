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
