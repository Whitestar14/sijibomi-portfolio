/** @format */

initPointer({
  pointerColor: "--white",
  ringSize: 20,
});
/**
 * S-Note: Code block below controls the themes and the logic to ensure
 * preference persistence in the browser
 */
document.addEventListener("DOMContentLoaded", () => {
  tooltipInit();
  let menuBtn = document.getElementById("menuBtn"),
    nav = document.getElementById("nav");

  menuBtn.onclick = () => {
    // Logic to control the menu for mobile screens

    if (menuBtn.classList.contains("change")) {
      setTimeout(() => {
        menuBtn.classList.remove("change");
        nav.classList.remove("display");
      }, 200);
    } else {
      setTimeout(() => {
        menuBtn.classList.add("change");
        nav.classList.add("display");
      }, 200);
    }
  };

  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;
  const themes = ["themeA", "themeB"];
  let currentThemeIndex = 0;

  // Function to toggle between themes
  let i = 0;
  const toggleTheme = () => {
    body.className = themes[currentThemeIndex];
    document.cookie = `selectedTheme=${themes[currentThemeIndex]}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    if (i >= 10) console.log(logMessage);
    console.log(`Here ${i}`);
    i++;
  };

  // Event listener for theme button
  themeToggleBtn.onclick = () => {
    toggleTheme();
  };

  // Checking for existing cookies...
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
});

const tooltipInit = () => {
  tooltipContainer = createElement("div", "absolute-bottom");
  absoluteLink = createElement("a", "absolute-link", { href: "#" });
  spanCircle = createElement("span", "circle");
  omnicon = createElement("i", ["fa", "fa-arrow-up"]);
  spanCircle.append(omnicon);
  absoluteLink.append(spanCircle);
  tooltipContainer.append(absoluteLink);

  // Created a helper function for the sole purpose of elegance.
  function createElement(elem, classnames, attr) {
    e = document.createElement(elem);
    if (typeof classnames == "object")
      for (classname of classnames) {
        e.classList.add(classname);
      }
    else {
      e.classList.add(classnames);
    }

    if (attr) {
      const a = Object.keys(attr);
      const value = attr[a];
      e.setAttribute(a, value);
    }
    return e;
  }

  document.body.appendChild(tooltipContainer);
};
let logMessage = `Stop pushing the f***ing button!`;

let index = 0,
  interval = 1000;

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const animate = (star) => {
  star.style.setProperty("--star-left", `${random(-10, 100)}%`);
  star.style.setProperty("--star-top", `${random(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
};

for (const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3));
}

// Gallery styles
// const gallery = document.getElementById("gallery");

// Are you fucking kidding me?! The fact that I used a different named listener `onpointermove` instead of `onmousemove` which is implemented somewhere else but both still reference the same global action makes this code work?!!!
// window.onpointermove = (e) => {
//   galleryPan(e);
// };
// function galleryPan(e) {
//   const mX = e.clientX,
//     mY = e.clientY;

//   const xDecimal = mX / window.innerWidth,
//     yDecimal = mY / window.innerHeight;

//   const maxX = gallery.offsetWidth - window.innerWidth,
//     maxY = gallery.offsetHeight - window.innerHeight;

//   const panX = maxX * xDecimal * -1,
//     panY = maxY * yDecimal * -1;

//   gallery.animate(
//     {
//       transform: `translate(${panX}px, ${panY}px)`,
//     },
//     {
//       duration: 4000,
//       fill: "forwards",
//       easing: "ease",
//     }
//   );
// }

const galleryTiles = Array.from(document.getElementsByClassName("tile"));

for (let tile of galleryTiles) {
  tile.onmouseover = () => {
    tile.style.filter = `blur(0px)`;
  };
  tile.onmouseout = () => {
    tile.style.filter = `blur(5px)`; // or whatever the initial blur value is
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: [0.1, 0.2, 0.3, 0.4],
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        // observer.unobserve(entry.target);
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, observerOptions);

  const infoItems = document.querySelectorAll(".grid-wrapper");
  infoItems.forEach((item) => observer.observe(item));

  const text = "whoami?",
    target = document.getElementById("cli-command");
  let index = 0;

  function typeText() {
    if (index < text.length) {
      target.textContent += text.charAt(index);
      index++;
      setTimeout(typeText, 150);
    } else {
      target.style.borderRight = "none";
    }
  }

  const observerText = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      typeText();
      observerText.disconnect();
    }
  });
  observerText.observe(target);
});

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

// script.js
// document.addEventListener("DOMContentLoaded", () => {
//   const cards = document.querySelectorAll(".card");

//   const observerOptions = {
//     root: null,
//     rootMargin: "0px",
//     threshold: 0.1
//   };

//   let lastVisibleCard = null;

//   const observer = new IntersectionObserver((entries, _observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible");
//         entry.target.classList.remove("hidden");
//         if (lastVisibleCard && lastVisibleCard !== entry.target) {
//           lastVisibleCard.classList.remove("visible");
//           lastVisibleCard.classList.add("hidden");
//         }
//         lastVisibleCard = entry.target;
//       }
//     });
//   }, observerOptions);

//   cards.forEach(card => {
//     observer.observe(card);
//   });
// });

const developer = {
  username: "O.S David",
  age: function () {
    const birthYear = 2008;
    let currentDate = new Date(),
      presentAge;
    presentAge = currentDate.getFullYear() - birthYear;
    return presentAge;
  },
  isProgrammer: true,
};
const { username } = developer;
console.log(username); // 'O.S David'
