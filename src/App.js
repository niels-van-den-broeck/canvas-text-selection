import React, { useEffect, useRef, useState } from 'react';

import page from './assets/105.png';
import { TextLayerDOM } from './components/TextLayerDOM';
import { TextLayer } from './components/TextLayer';

async function loadImage(src) {
  const image = new Image();

  return new Promise((resolve, reject) => {
    image.onload = function () {
      resolve(image);
    };

    image.onerror = function (err) {
      reject(err);
    };

    image.src = src;
  });
}

const VIEWMODES = {
  DOM: 'dom',
  SVG: 'svg',
};

export function App() {
  const canvas = useRef(null);
  const context = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1190, height: 1683 });
  const [viewmode, setViewmode] = useState(VIEWMODES.DOM);

  useEffect(() => {
    async function drawImage() {
      const image = await loadImage(page);
      context.current = canvas.current.getContext('2d');

      context.current.drawImage(image, 0, 0, image.width, image.height);

      setDimensions({ width: image.width, height: image.height });
    }

    drawImage();
  }, []);

  return (
    <>
      <div id="relative">
        <canvas
          width={dimensions.width}
          height={dimensions.height}
          ref={canvas}
        />
        {viewmode === VIEWMODES.SVG && <TextLayer />}
        {viewmode === VIEWMODES.DOM && <TextLayerDOM />}
        <button
          onClick={() => {
            setViewmode(
              viewmode === VIEWMODES.SVG ? VIEWMODES.DOM : VIEWMODES.SVG
            );
          }}
        >
          CHANGE VIEWMODE
        </button>
      </div>
    </>
  );
}
