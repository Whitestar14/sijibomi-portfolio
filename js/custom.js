/** @format */

// Initialize pointer
initPointer({
  pointerColor: "--white",
  ringSize: 20,
});

// Tooltip Initialization Function
const tooltipInit = () => {
  const createElement = (elem, classnames, attr) => {
    const e = document.createElement(elem);
    if (Array.isArray(classnames)) {
      classnames.forEach((classname) => e.classList.add(classname));
    } else {
      e.classList.add(classnames);
    }
    if (attr) {
      Object.entries(attr).forEach(([key, value]) =>
        e.setAttribute(key, value)
      );
    }
    return e;
  };

  const tooltipContainer = createElement("div", "absolute-bottom");
  const absoluteLink = createElement("a", "absolute-link", { href: "#" });
  const spanCircle = createElement("span", "circle");
  const omnicon = createElement("i", ["fa", "fa-arrow-up"]);
  spanCircle.append(omnicon);
  absoluteLink.append(spanCircle);
  tooltipContainer.append(absoluteLink);
  document.body.appendChild(tooltipContainer);
};

// Theme and Menu Control
document.addEventListener("DOMContentLoaded", () => {
  tooltipInit();

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;
  const themes = ["themeA", "themeB"];
  let currentThemeIndex = 0;

  const toggleTheme = () => {
    body.className = themes[currentThemeIndex];
    document.cookie = `selectedTheme=${themes[currentThemeIndex]}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  };

  // Mobile menu toggle
  menuBtn.onclick = () => {
    setTimeout(() => {
      menuBtn.classList.toggle("change");
      nav.classList.toggle("display");
    }, 200);
  };

  // Theme toggle button click event
  themeToggleBtn.onclick = toggleTheme;

  // Apply the theme based on the cookie value
  const themeCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("selectedTheme="));

  if (themeCookie) {
    const selectedTheme = themeCookie.split("=")[1];
    if (themes.includes(selectedTheme)) {
      body.className = selectedTheme;
      currentThemeIndex = themes.indexOf(selectedTheme) + 1;
    }
  }

  // Gallery Tiles Hover Effects
  Array.from(document.getElementsByClassName("tile")).forEach((tile) => {
    tile.onmouseover = () => (tile.style.filter = "blur(0px)");
    tile.onmouseout = () => (tile.style.filter = "blur(5px)");
  });

  // Intersection Observer for Grid Wrapper Items
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: [0.1, 0.2, 0.3, 0.4],
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  }, observerOptions);

  document
    .querySelectorAll(".grid-wrapper")
    .forEach((item) => observer.observe(item));

  // Typewriting Effect
  const text = "whoami?";
  const target = document.getElementById("cli-command");
  let index = 0;

  const typeText = () => {
    if (index < text.length) {
      target.textContent += text.charAt(index);
      index++;
      setTimeout(typeText, 150);
    } else {
      target.style.borderRight = "none";
    }
  };

  const observerText = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      typeText();
      observerText.disconnect();
    }
  });
  observerText.observe(target);

  // Background Animation on Mouse Move
  const patternArea = document.getElementById("whoami-section");
  patternArea.onmousemove = (e) => {
    const { clientX, clientY } = e;
    patternArea.animate(
      {
        backgroundPosition: `${clientX / 50}% ${clientY / 50}%`,
      },
      {
        duration: 3000,
        fill: "forwards",
      }
    );
  };

  // Magic Stars Animation
  const animateStar = (star) => {
    const random = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);
    star.style.setProperty("--star-left", `${random(-10, 100)}%`);
    star.style.setProperty("--star-top", `${random(-40, 80)}%`);
    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";
  };

  const interval = 1000;
  Array.from(document.getElementsByClassName("magic-star")).forEach((star) => {
    setTimeout(() => {
      animateStar(star);
      setInterval(() => animateStar(star), 1000);
    }, index++ * (interval / 3));
  });
});

// Developer Info
const developer = {
  username: "O.S David",
  age() {
    return new Date().getFullYear() - 2008;
  },
  isProgrammer: true,
};
console.log(developer.username); // 'O.S David'
