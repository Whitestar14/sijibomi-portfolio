const menuBtn = document.getElementById("menuBtn");
const logo = document.getElementById("header-logo");
const navHeader = document.getElementById("header-menu");
const navbar = document.getElementById("header");
const sunIcon = document.getElementById("theme-icon");

window.onload = () => {
  // Handle sun icon rotation
  const handleSunRotation = () => {
    // Get the current rotation angle from the data attribute
    let currentRotation = parseInt(sunIcon.getAttribute("data-rotation")) || 0;

    // Increment the rotation by 180 degrees
    let newRotation = currentRotation + 180;

    // Create the anime.js animation
    anime({
      targets: sunIcon,
      rotate: newRotation,
      duration: 2000, // Duration in milliseconds
      easing: "easeInOutCubic", // Smooth easing function
      complete: function () {
        // Update the data-rotation attribute when the animation completes
        sunIcon.setAttribute("data-rotation", newRotation);
      },
    });
  };

  // Handles menu button click events
  menuBtn.onclick = () => {
    menuBtn.classList.toggle("active");
    navHeader.classList.toggle("active");
  };

  sunIcon.onmouseenter = () => handleSunRotation();

  window.onscroll = () => handleScroll();
  shiftUp(logo);

  // Initial scroll check in case the user reloads at a scrolled position

  handleScroll();
};

window.onscroll = () => debounce(handleScroll, debounceDelay);

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;

    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Initial scroll tracking variables
let hasScrolledOnce = false;
let preventHide = false;
let lastScrollPos = 0;
const threshold = 80;
const debounceDelay = 100;

// Handle scroll to add/remove floating navbar
const handleScroll = () => {
  const currentScrollPos = window.pageYOffset;

  if (!hasScrolledOnce && currentScrollPos >= threshold) {
    navbar.classList.add("navbar-float");
    hasScrolledOnce = true;
    preventHide = true;
  }

  let hideTimeout = setTimeout(() => {
    preventHide = false;
  }, 1000);

  // Logic for subseqent scrolls after first reveal
  if (hasScrolledOnce && !preventHide) {
    if (currentScrollPos > lastScrollPos && currentScrollPos >= 350) {
      // User is scrolling down
      navbar.classList.add("navbar-hide");
    } else if (
      currentScrollPos < lastScrollPos ||
      currentScrollPos <= threshold
    ) {
      // User is scrolling up or scroll is at threshold
      navbar.classList.remove("navbar-hide");
    }
  }

  if (menuBtn.classList.contains("active")) {
    preventHide = true;
    clearTimeout(hideTimeout);
  } else {
    hideTimeout = setTimeout(() => {
      preventHide = false;
    }, 1000);
  }

  // Fix issue: reset the navbbar when back to top (scrollTop = 0)
  if (currentScrollPos === 0) {
    preventHide = true;
    hasScrolledOnce = false;
    navbar.classList.remove("navbar-float");
    navbar.classList.remove("navbar-hide");
  }

  lastScrollPos = currentScrollPos;
};

function shiftUp(el) {
  anime({
    targets: el,
    translateY: { value: ["300%", "0%"], duration: 800 },
    rotate: { value: ["30deg", "0deg"], duration: 800 },
    delay: 200,
    easing: "easeInOutCubic",
  });
}

let shiftup = setInterval(() => {
  shiftUp(logo);
}, 8000);
