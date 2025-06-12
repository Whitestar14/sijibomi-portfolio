// class Stylus {
//   constructor(selector, styles, options = {}) {
//     this.styles = styles;
//     this.options = options;
//     this.elements = document.querySelectorAll(selector);
//   }

//   applyStyles = (el, stylesToApply) => {
//     for (const property in stylesToApply) {
//       el.style[property] = stylesToApply[property];
//     }
//   };
// }

const stylus = (selector, styles, options = {}) => {
  const elements = document.querySelectorAll(selector);

  const applyStyles = (el, stylesToApply) => {
    for (const property in stylesToApply) {
      el.style[property] = stylesToApply[property];
    }
  };

  // Function to apply default and responsive styles
  const applyResponsiveStyles = (stylesToApply) => {
    elements.forEach((el) => applyStyles(el, stylesToApply));
  };

  // Initial application of default styles
  if (styles.default) {
    applyResponsiveStyles(styles.default);
  }

  // Handle responsive styles
  const checkResponsiveStyles = () => {
    const width = window.innerWidth;
    for (const breakpoint in styles) {
      if (breakpoint !== "default" && width >= breakpoint) {
        applyResponsiveStyles(styles[breakpoint]);
      }
    }
  };

  // Listen for window resize to adjust responsive styles
  window.addEventListener("resize", checkResponsiveStyles);
  checkResponsiveStyles();

  // Event-driven styling
  if (options.event) {
    elements.forEach((el) => {
      el.addEventListener(options.event.type, () => {
        applyStyles(el, options.event.styles);
      });
    });
  }

  // Animations using anime.js (if provided in the options)
  if (options.animation) {
    anime({
      targets: selector,
      ...options.animation,
    });
  }

  // Handling hover (pseudo-class)
  if (styles.hover) {
    elements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        applyStyles(el, styles.hover);
      });
      el.addEventListener("mouseleave", () => {
        applyStyles(el, styles.default); // Reset to default on mouse leave
      });
    });
  }

  // Theme toggling (light and dark mode)
  if (options.themeToggle) {
    const toggleBtn = document.getElementById(options.themeToggle.buttonId);
    toggleBtn.addEventListener("click", () => {
      const currentTheme = document.body.dataset.theme || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      document.body.dataset.theme = newTheme;
      applyStyles(document.body, styles[newTheme]);
    });
  }

  // Applying styles from data attributes
  if (options.dataAttributes) {
    elements.forEach((el) => {
      for (const [attr, value] of Object.entries(el.dataset)) {
        el.style[attr] = value;
      }
    });
  }
};

// Usage Example

// Applying general styles, responsive styles, hover effects, animations, and theme toggling.
stylus(
  ".box",
  {
    default: {
      backgroundColor: "blue",
      padding: "20px",
      color: "white",
      transition: "all 0.3s ease",
    },
    768: {
      backgroundColor: "green",
      padding: "30px",
    },
    1024: {
      backgroundColor: "purple",
      padding: "40px",
    },
    hover: {
      backgroundColor: "red",
      transform: "scale(1.05)",
    },
    dark: {
      backgroundColor: "#121212",
      color: "#ffffff",
    },
    light: {
      backgroundColor: "#ffffff",
      color: "#000000",
    },
  },
  {
    event: {
      type: "click",
      styles: {
        transform: "scale(1.1)",
      },
    },
    animation: {
      translateX: 250,
      duration: 1000,
      easing: "easeInOutQuad",
    },
    themeToggle: {
      buttonId: "theme-toggle",
    },
    dataAttributes: true,
  }
);

// For data attributes, assuming elements have attributes like data-bgcolor="red", data-padding="10px"
