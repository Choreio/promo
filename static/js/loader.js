document.addEventListener('DOMContentLoaded', function () {
  let progressBar = document.getElementById('progress-bar');
  let progressText = document.getElementById('progress-text');
  let loadingScreen = document.getElementById('loading-screen');
  let mainContent = document.getElementById('main-content');

  // Get all resources: images, scripts, and stylesheets
  let resources = document.querySelectorAll(
    "img, script, link[rel='stylesheet']"
  );
  let totalResources = resources.length;
  let loadedResources = 0;

  function updateProgress() {
    let progressPercent = Math.floor((loadedResources / totalResources) * 100);
    progressBar.style.width = progressPercent + '%';
    progressText.textContent = progressPercent + '%';

    // If everything is loaded, fade out the loading screen
    if (progressPercent >= 100) {
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          mainContent.style.visibility = 'visible';
          window.scrollTo(0, 0);
        }, 500);
      }, 300);
    }
  }

  // Listen for when each resource loads
  resources.forEach((resource) => {
    if (resource.complete) {
      updateProgress(); // If already loaded
    } else {
      resource.onload = updateProgress;
      resource.onerror = updateProgress; // Count errors too
    }
  });

  // Ensure progress reaches 100% when window fully loads
  window.onload = function () {
    loadedResources = totalResources;
    updateProgress();
  };

  // Fallback in case some elements aren't counted
  setTimeout(() => {
    if (loadedResources < totalResources) {
      updateProgress();
    }
  }, 5000);
});
