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
    card.style.transform = 'rotateX(0) rotateY(0)';
}

const html = document.getElementsByTagName("html")[0];
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");

// Optional: Load previously saved theme from localStorage
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  html.setAttribute("data-bs-theme", "dark");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
} else {
    html.setAttribute("data-bs-theme", "light");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
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