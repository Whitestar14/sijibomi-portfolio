/**
 * pointer.js was created by OwL for use on websites, modified by Whitestar Studios
 *      and can be found at https://seattleowl.com/pointer.
 *
 * contributions: @WhitestarStudios
 *
 */

// Add this check at the start of the file, right after the elementInit()
const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
};

const { pointer, ring, ptContainer } = elementInit();

// Only initialize the custom cursor if it's not a touch device
if (!isTouchDevice()) {
  pointer.id = "pointer-dot";
  ring.id = "pointer-ring";
  
  ptContainer.classList.add("ptContainer");
  
  ptContainer.appendChild(pointer);
  ptContainer.appendChild(ring);
  document.body.insertBefore(ptContainer, document.body.children[0]);
}

let mouseX = -100;
let mouseY = -100;
let ringX = -100;
let ringY = -100;
let isHover = false;
let mouseDown = false;
const initPointer = (options) => {
  window.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  window.onmousedown = () => {
    mouseDown = true;
  };

  window.onmouseup = () => {
    mouseDown = false;
  };

  const trace = (a, b, n) => {
    return (1 - n) * a + n * b;
  };
  window["trace"] = trace;

  const getOption = (option) => {
    let defaultObj = {
      pointerColor: "#750c7e",
      ringSize: 15,
      ringClickSize: (options["ringSize"] || 15) - 5,
    };
    if (options[option] == undefined) {
      return defaultObj[option];
    } else {
      return options[option];
    }
  };

  const render = () => {
    ringX = trace(ringX, mouseX, 0.2);
    ringY = trace(ringY, mouseY, 0.2);

    /**
     * The code block below is considered redundant and therefore commented out.
     *      It will be rectified later
     * @todo Rectify code block below.
     */
    if (document.querySelector("*")) {
      pointer.style.borderColor = getOption("pointerColor");
      isHover = true;
    } else {
      pointer.style.borderColor = "white";
      isHover = false;
    }

    ring.style.borderColor = getOption("pointerColor");
    if (mouseDown) {
      ring.style.padding = getOption("ringClickSize") + "px";
    } else {
      ring.style.padding = getOption("ringSize") + "px";
    }

    pointer.animate(
      { transform: `translate(${mouseX}px, ${mouseY}px)` },
      { duration: 200, fill: "forwards" }
    );

    ring.animate(
      {
        transform: `translate(${
          ringX -
          (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))
        }px, ${
          ringY -
          (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))
        }px)`,
      },
      { duration: 600, fill: "forwards", delay: 200 }
    );

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

const option = [
  {
    transform: `translate(${mouseX}px, ${mouseY}px)`,
  },
  { duration: 3000, fill: "forwards", delay: 200 },
  { duration: 1200, fill: "forwards" },
];

function elementInit() {
  const ptContainer = document.createElement("div"),
    pointer = document.createElement("div"),
    ring = document.createElement("div");
  return { pointer, ring, ptContainer };
}
