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

const html = document.getElementsByTagName("html")[0];
const button = document.getElementById("redirect-button");
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (prefersDarkScheme.matches) {
  // User has dark mode set (either OS or browser-level setting)
  console.log("Dark mode is preferred by the system.");
  html.setAttribute("data-bs-theme", "dark");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");

  button.classList.remove("btn-dark");
  button.classList.add("btn-light");

  if(!localStorage.getItem("theme"))
    localStorage.setItem("theme", "dark");
} else {
  // Light mode or no preference
  console.log("Light mode is preferred by the system.");
  html.setAttribute("data-bs-theme", "light");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    button.classList.remove("btn-dark");
    button.classList.add("btn-light");
    if(!localStorage.getItem("theme"))
        localStorage.setItem("theme", "dark");
}

// Optional: Load previously saved theme from localStorage
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  console.log("Dark mode is loaded from local storage.");
  html.setAttribute("data-bs-theme", "dark");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
  // Save theme preference
  localStorage.setItem("theme", "dark");
} else {
    console.log("Light mode is loaded from local storage.");
    html.setAttribute("data-bs-theme", "light");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    // Save theme preference
    localStorage.setItem("theme", "light");
}

// Listen for toggle button clicks
themeToggleBtn.addEventListener("click", () => {
  // Toggle theme classes
  if (html.getAttribute("data-bs-theme") === "light") {
    html.setAttribute("data-bs-theme", "dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    // Save theme preference
    localStorage.setItem("theme", "dark");
  } else {
    html.setAttribute("data-bs-theme", "light");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    // Save theme preference
    localStorage.setItem("theme", "light");
  }
});