const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
// Theme switcher
if (prefersDarkScheme.matches) {
  // User has dark mode set (either OS or browser-level setting)
  console.log('Dark mode is preferred by the system.');

  // Set the theme to dark
  document
    .getElementsByTagName('html')[0]
    .setAttribute('data-bs-theme', 'dark');

  // Change the theme icon
  document.getElementById('theme-icon').classList.remove('fa-moon');
  document.getElementById('theme-icon').classList.add('fa-sun');

  // Change the button theme
  document.getElementById('redirect-button').classList.remove('btn-dark');
  document.getElementById('redirect-button').classList.add('btn-light');

  // Save theme preference
  if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'dark');
} else {
  // Light mode or no preference
  console.log('Light mode is preferred by the system.');

  // Set the theme to light
  document
    .getElementsByTagName('html')[0]
    .setAttribute('data-bs-theme', 'light');

  // Change the theme icon
  document.getElementById('theme-icon').classList.remove('fa-sun');
  document.getElementById('theme-icon').classList.add('fa-moon');

  // Change the button theme
  document.getElementById('redirect-button').classList.remove('btn-light');
  document.getElementById('redirect-button').classList.add('btn-dark');

  // Save theme preference
  if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'dark');
}

// Optional: Load previously saved theme from localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  console.log('Dark mode is loaded from local storage.');

  document
    .getElementsByTagName('html')[0]
    .setAttribute('data-bs-theme', 'dark');

  document.getElementById('theme-icon').classList.remove('fa-moon');
  document.getElementById('theme-icon').classList.add('fa-sun');

  document.getElementById('redirect-button').classList.remove('btn-dark');
  document.getElementById('redirect-button').classList.add('btn-light');
  // Save theme preference
  localStorage.setItem('theme', 'dark');
} else {
  console.log('Light mode is loaded from local storage.');

  document
    .getElementsByTagName('html')[0]
    .setAttribute('data-bs-theme', 'light');

  document.getElementById('theme-icon').classList.remove('fa-sun');
  document.getElementById('theme-icon').classList.add('fa-moon');

  document.getElementById('redirect-button').classList.remove('btn-light');
  document.getElementById('redirect-button').classList.add('btn-dark');

  // Save theme preference
  localStorage.setItem('theme', 'light');
}

// Listen for toggle button clicks
document.getElementById('theme-toggle-btn').addEventListener('click', () => {
  // Toggle theme classes
  if (
    document.getElementsByTagName('html')[0].getAttribute('data-bs-theme') ===
    'light'
  ) {
    console.log('Switching to dark mode.');

    document
      .getElementsByTagName('html')[0]
      .setAttribute('data-bs-theme', 'dark');

    document.getElementById('theme-icon').classList.remove('fa-moon');
    document.getElementById('theme-icon').classList.add('fa-sun');

    document.getElementById('redirect-button').classList.remove('btn-dark');
    document.getElementById('redirect-button').classList.add('btn-light');
    // Save theme preference
    localStorage.setItem('theme', 'dark');
  } else {
    console.log('Switching to light mode.');

    document
      .getElementsByTagName('html')[0]
      .setAttribute('data-bs-theme', 'light');

    document.getElementById('theme-icon').classList.remove('fa-sun');
    document.getElementById('theme-icon').classList.add('fa-moon');

    document.getElementById('redirect-button').classList.remove('btn-light');
    document.getElementById('redirect-button').classList.add('btn-dark');
    // Save theme preference
    localStorage.setItem('theme', 'light');
  }
});

//Carousel
// Grab references
const carousel = document.getElementById('carousel3d');
const cards = document.querySelectorAll('.card3d');

let angle = 0; // Current rotation angle around Y-axis
let autoRotateInterval = null;
let stopRotateTimeout = null;

/*
let isDragging = false; // Track mouse/touch drag
let startX = 0; // Starting x-position of mouse/touch

let startX0 = 0; // Starting x-position of mouse/touch
let startY0 = 0; // Starting y-position of mouse/touch

let currentX = 0; // Current x-position of mouse/touch
let currentY = 0; // Current y-position of mouse/touch
*/

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
  if (stopRotateTimeout) return;
  //console.log('Started rotation');
  // Rotate every X ms
  autoRotateInterval = setInterval(() => {
    // Decrease angle to rotate clockwise,
    // Increase angle to rotate counterclockwise
    angle -= 0.5; // adjust speed as needed
    setCarouselRotation(angle);
  }, 100); // 100 ms intervals -> slower or faster
}

/**
 * Stop auto-rotation.
 */
function stopAutoRotate(timeout) {
  //console.log('Stopped rotation');
  clearInterval(autoRotateInterval);
  autoRotateInterval = null;

  stopRotateTimeout = setTimeout(() => {
    clearTimeout(stopRotateTimeout);
    stopRotateTimeout = null;
  }, timeout);
}

// Start rotating automatically on load
startAutoRotate();

// -------------------------------------------------------------
// 3) Implement dragging with mouse or touch to slide the carousel
// -------------------------------------------------------------

// MOUSE EVENTS
/*
carousel.addEventListener('mousedown', (e) => {
  //console.log("Carousel - Mouse down");
  stopAutoRotate(); // stop auto-rotating while user drags
  disableScroll(); // prevent scrolling while dragging
  startX = e.clientX;
  isDragging = true;
});

carousel.addEventListener('mousemove', (e) => {
  //console.log("Carousel - Mouse move");
  if (!isDragging) return;
  currentX = e.clientX;
  let delta = currentX - startX;
  angle += delta * 0.5; // adjust sensitivity
  setCarouselRotation(angle);
  startX = currentX;
});

carousel.addEventListener('mouseup', () => {
  //console.log("Carousel - Mouse up");
  isDragging = false;
  enableScroll(); // enable scrolling after dragging
  stopRotateTimeout = setTimeout(() => {
    // Resume auto-rotate if user stops dragging
    stopRotateTimeout = null;
    startAutoRotate();
  }, 5000); // slight delay to prevent sudden resume
});
*/
// TOUCH EVENTS
/*
carousel.addEventListener('touchstart', (e) => {
  console.log('Carousel - Touch start');
  startX = e.clientX;
  disableScroll(); // prevent scrolling while dragging
  stopAutoRotate(); // stop auto-rotating while user drags
  isDragging = true;
});

carousel.addEventListener('touchmove', (e) => {
  //console.log("Carousel - Touch move");
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  let delta = currentX - startX;
  angle += delta * 0.5; // adjust sensitivity
  setCarouselRotation(angle);
  startX = currentX;
});

carousel.addEventListener('touchend', () => {
  //console.log("Carousel - Touch end");
  isDragging = false;
  enableScroll(); // enable scrolling after dragging
  stopRotateTimeout = setTimeout(() => {
    // Resume auto-rotate if user stops dragging
    stopRotateTimeout = null;
    startAutoRotate();
  }, 5000); // slight delay to prevent sudden resume
});
*/

cards.forEach((card, index) => {
  // Touch/Mouse movements
  let touchStartX = 0;
  let touchStartY = 0;
  let touchCurrentX = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  let deltaX = 0;

  let isDraggingCard = false;

  const carouselRotate = (delta) => {
    angle += delta * 0.5; // adjust sensitivity
    setCarouselRotation(angle);
  };

  const mouseDown = (e) => {
    //console.log('Card - Mouse start');
    stopAutoRotate(5000); // stop auto-rotating while user drags
    disableScroll(); // prevent scrolling while dragging
    touchStartX = touchCurrentX = touchEndX = e.clientX;
    touchStartY = touchEndY = e.clientY;

    isDraggingCard = true; // Reset dragging status

    card.addEventListener('mousemove', mouseMove);
  };
  const mouseMove = (e) => {
    if (!isDraggingCard) return;
    //console.log('Card - Mouse move');
    deltaX = e.clientX - touchCurrentX;
    carouselRotate(deltaX);

    touchCurrentX = e.clientX;
    touchEndX = e.clientX;
    touchEndY = e.clientY;
  };
  const mouseUp = () => {
    //console.log('Mouse end');
    card.removeEventListener('mousemove', mouseMove);
    isDraggingCard = false;
    enableScroll(); // enable scrolling after dragging
    // Calculate distance moved
    const deltaX = Math.abs(touchEndX - touchStartX);
    const deltaY = Math.abs(touchEndY - touchStartY);

    //console.log('Delta X', deltaX, 'Delta Y', deltaY);
    // If movement is small, treat as a tap (click)
    if (deltaX < 10 && deltaY < 10) {
      centerCard(index);
    }
  };

  const touchStart = (e) => {
    //console.log('Card - Touch start');
    stopAutoRotate(5000); // stop auto-rotating while user drags
    disableScroll(); // prevent scrolling while dragging
    touchStartX = touchCurrentX = touchEndX = e.touches[0].clientX;
    touchStartY = touchEndY = e.touches[0].clientY;

    isDraggingCard = true; // Reset dragging status

    card.addEventListener('touchmove', touchMove);
  };

  const touchMove = (e) => {
    if (!isDraggingCard) return;
    //console.log('Card - Touch move');
    deltaX = e.touches[0].clientX - touchCurrentX;
    /*console.log(
      'Touch X: ',
      e.touches[0].clientX,
      ', Started X: ',
      touchCurrentX,
      ', delta = ',
      deltaX
    );
    */
    carouselRotate(deltaX);

    touchCurrentX = e.touches[0].clientX;

    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
  };

  const touchEnd = () => {
    //console.log('Card - Touch end');
    card.removeEventListener('touchmove', touchMove);
    isDraggingCard = false;
    enableScroll(); // enable scrolling after dragging
    // Calculate distance moved
    const deltaX = Math.abs(touchEndX - touchStartX);
    const deltaY = Math.abs(touchEndY - touchStartY);

    //console.log('Delta X', deltaX, 'Delta Y', deltaY);
    // If movement is small, treat as a tap (click)
    if (deltaX < 10 && deltaY < 10) {
      centerCard(index);
    }
  };

  card.addEventListener('touchstart', touchStart);
  card.addEventListener('touchend', touchEnd);

  card.addEventListener('mousedown', mouseDown);
  card.addEventListener('mouseup', mouseUp);

  card.addEventListener('mouseenter', () => {
    stopAutoRotate(Infinity);
    cards.forEach((card) => {
      card.removeEventListener('mousemove', mouseMove);
      card.removeEventListener('touchmove', touchMove);
    });
  });

  card.addEventListener('mouseleave', () => {
    // Only resume auto-rotate if user is not dragging
    if (!isDraggingCard) {
      clearTimeout(stopRotateTimeout);
      startAutoRotate();
    }
  });
});

function centerCard(cardIndex) {
  //console.log('Centering card', cardIndex);
  stopAutoRotate(); // Stop auto-rotation while centering

  //console.log('Current carousel angle', angle);
  // Calculate the target angle for the clicked card
  const totalCards = cards.length;
  const angleStep = 360 / totalCards; // Angle difference between each card
  const targetAngle = -cardIndex * angleStep;
  //console.log('Card', cardIndex, 'Target angle', targetAngle);

  // Find the nearest equivalent center angle
  const modAngle = angle % -360; // Normalize angle within -360-0 range
  const baseAngle = angle - modAngle; // Base full rotation
  //console.log('Card', cardIndex, 'Normalized angle', modAngle);
  //console.log('Card', cardIndex, 'Base angle', baseAngle);

  let closestAngle = baseAngle + targetAngle; // Default closest
  //console.log('Card', cardIndex, 'Closest angle', closestAngle);

  // Determine shortest rotation direction
  const rotateClockwise = Math.abs(closestAngle - angle);
  //console.log('Clockwise angle', rotateClockwise);
  const rotateCounterClockwise = Math.abs(closestAngle + 360 - angle);
  //console.log('Counter clockwise angle', rotateCounterClockwise);
  if (rotateCounterClockwise < rotateClockwise) {
    closestAngle += 360;
  }

  //console.log('Card', cardIndex, 'Closest angle final', closestAngle);
  // Smooth rotation to the centered position
  smoothRotateCarousel(closestAngle);
}

function smoothRotateCarousel(targetAngle) {
  const step = 5; // Rotation step per frame
  const interval = 10; // Interval in ms

  const rotateInterval = setInterval(() => {
    if (Math.abs(targetAngle - angle) <= step) {
      angle = targetAngle;
      setCarouselRotation(angle);
      clearInterval(rotateInterval);
      setTimeout(() => startAutoRotate(), 5000); // Resume auto-rotation after a delay
      return;
    }

    angle += targetAngle > angle ? step : -step;
    setCarouselRotation(angle);
  }, interval);
}

// Resize carousel width based on container width
const container = document.querySelector('.carousel-container');
function setCarouselWidth() {
  const rect = container.getBoundingClientRect();

  // Ensure it's capped at 500
  const pxVal = Math.min(rect.width, 500);
  //console.log(pxVal);
  container.style.setProperty('--carousel-width', pxVal + 'px');
}
window.addEventListener('resize', setCarouselWidth, true);
setCarouselWidth();

// -------------------------------------------------------------
// Real Loading Bar
const loadingBar = document.getElementById('loading-bar');
const loadingOverlay = document.getElementById('loading-overlay');

let totalResources = 0;
let loadedResources = 0;

function updateProgress() {
  const progress = (loadedResources / totalResources) * 100;
  loadingBar.style.width = progress + '%';

  if (progress === 100) {
    // Hide loading bar and overlay when done
    setTimeout(() => {
      loadingBar.style.display = 'none';
      loadingOverlay.style.display = 'none';
    }, 500); // Smooth fade out
  }
}

// Track resource loading
window.addEventListener('load', () => {
  totalResources = document.images.length + 1; // Count images and page load
  loadedResources++; // Page itself is loaded
  updateProgress();

  // Track individual image loading
  const images = document.images;
  for (const img of images) {
    if (img.complete) {
      loadedResources++;
      updateProgress();
    } else {
      img.addEventListener('load', () => {
        loadedResources++;
        updateProgress();
      });
      img.addEventListener('error', () => {
        loadedResources++;
        updateProgress();
      });
    }
  }
});

// Disable scrolling
function disableScroll() {
  //console.log('Disabling scroll');
  window.addEventListener('scroll', preventScroll, { passive: false });
  window.addEventListener('wheel', preventScroll, { passive: false });
  window.addEventListener('touchmove', preventScroll, { passive: false });
  window.addEventListener('keydown', preventArrowKeys, { passive: false });
}

// Enable scrolling
function enableScroll() {
  //console.log('Enabling scroll');
  window.removeEventListener('scroll', preventScroll);
  window.removeEventListener('wheel', preventScroll);
  window.removeEventListener('touchmove', preventScroll);
  window.removeEventListener('keydown', preventArrowKeys);
}

function preventScroll(event) {
  event.preventDefault();
}

function preventArrowKeys(event) {
  const keys = [37, 38, 39, 40]; // Arrow keys
  if (keys.includes(event.keyCode)) {
    event.preventDefault();
  }
}
