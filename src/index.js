import PDFJS from 'pdfjs-dist';

import tc from './assets/textcontent.json';
import page from './assets/120.png';
import './styles/index.scss';

const app = document.getElementById('app');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = true;

const SVG_NS = "http://www.w3.org/2000/svg";

function loadImage(src) {
  const image = new Image();

  return new Promise((resolve) => {
    image.onload = function () {
      resolve(image);
    };

    image.src = src;
  });
}

async function initialize() {
  const image = await loadImage(page);
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
}

function buildSVG(viewport, textContent) {
  // Building SVG with size of the viewport (for simplicity)
  const svg = document.createElementNS(SVG_NS, "svg:svg");
  svg.setAttribute("width", viewport.width + "px");
  svg.setAttribute("height", viewport.height + "px");
  // items are transformed to have 1px font size
  svg.setAttribute("font-size", 1);

  // processing all items
  textContent.items.forEach(function (textItem) {
    // we have to take in account viewport transform, which includes scale,
    // rotation and Y-axis flip, and not forgetting to flip text.
    const tx = PDFJS.Util.transform(
      PDFJS.Util.transform(viewport.transform, textItem.transform),
      [1, 0, 0, -1, 0, 0]
    );
    const style = textContent.styles[textItem.fontName];
    // adding text element
    const text = document.createElementNS(SVG_NS, "svg:text");
    text.setAttribute("transform", "matrix(" + tx.join(" ") + ")");
    text.setAttribute("font-family", style.fontFamily);
    text.textContent = textItem.str;
    svg.appendChild(text);
  });
  
  app.appendChild(svg)
}

app.appendChild(canvas);

initialize();
buildSVG(tc.pc.viewport, tc.pc);
