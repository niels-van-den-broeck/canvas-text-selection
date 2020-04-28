import React from 'react';
import PDFJS from 'pdfjs-dist';

import textContent from '../assets/textcontent.json';

export function TextLayer() {
  return (
    <svg
      width={textContent.pc.viewport.width}
      height={textContent.pc.viewport.height}
      fontSize={1}
    >
      {textContent.pc.items.map((textItem, index) => {
        const tx = PDFJS.Util.transform(
          PDFJS.Util.transform(textContent.pc.viewport.transform, textItem.transform),
          [1, 0, 0, -1, 0, 0]
        );

        const style = textContent.pc.styles[textItem.fontName];

        return (
          <text
            key={`${textItem.str}${index}`}
            transform={`matrix(${tx.join(' ')})`}
            fontFamily={style.fontFamily}
          >
            {textItem.str}
          </text>
        );
      })}
    </svg>
  );
}
