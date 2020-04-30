import React, { useState, useRef } from 'react';
import PDFJS from 'pdfjs-dist';

import textContent from '../assets/textcontent.json';

export function TextLayer() {
  const [selections, setSelections] = useState([]);
  const highlighter = useRef(null);

  const mouseUpHandler = (e) => {
    const userSelection = window.getSelection().getRangeAt(0);

    const rects = userSelection.getClientRects();

    setSelections(
      [...rects].map((rect) => ({
        y: rect.top + window.scrollY,
        x: rect.left + window.scrollX,
        height: rect.height,
        width: rect.width,
      }))
    ); // it's not a plain array, hence the spread
  };

  return (
    <svg
      width={textContent.pc.viewport.width}
      height={textContent.pc.viewport.height}
      onMouseUp={mouseUpHandler}
    >
      {textContent.pc.items.map((textItem, index) => {
        const tx = PDFJS.Util.transform(
          PDFJS.Util.transform(
            textContent.pc.viewport.transform,
            textItem.transform
          ),
          [1, 0, 0, -1, 0, 0]
        );

        const style = textContent.pc.styles[textItem.fontName];

        return (
          <text
            key={`${textItem.str}${index}`}
            x={tx[4]}
            y={tx[5]}
            textLength={`${textItem.width * 2}px`}
            lengthAdjust="spacingAndGlyphs"
            fontFamily={style.fontFamily}
          >
            {textItem.str}
          </text>
        );
      })}
      {selections.map((selection) => (
        <rect
          ref={highlighter}
          x={selection.x}
          y={selection.y}
          width={selection.width}
          height={selection.height}
        />
      ))}
    </svg>
  );
}
