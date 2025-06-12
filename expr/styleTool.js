class StyleTool {
  constructor(elements) {
    this.elements = elements;
  }

  // Apply common styles to all elements
  applyCommonStyle(styles) {
    this.elements.forEach((el) => {
      Object.keys(styles).forEach((style) => {
        el.style[style] = styles[style];
      });
    });
  }

  // Apply specific styles to individual elements

  applySpecificStyle(id, styles) {
    const element = this.elements.find((el) => el.id === id);
    if (element) {
      Object.keys(styles).forEach((style) => {
        element.style[style] = styles[style];
      });
    } else {
      console.error(`Element with id ${id} not found.`);
    }
  }
}

// Collect elements by their IDs
const elements = ["box1", "box2", "box3"].map((id) =>
  document.getElementById(id)
);

// Instantiate the style tool
const styleTool = new StyleTool(elements);

// Apply a common style to all elements
styleTool.applyCommonStyle({
  opacity: "0.5",
  transition: "opacity 1s ease, transform 1s ease",
});

// Apply a specific style to box2
styleTool.applySpecificStyle("box2", {
  transform: "scale(1.5)",
  backgroundColor: "tomato",
  opacity: "1", // Overriding the common opacity for this specific element
});
