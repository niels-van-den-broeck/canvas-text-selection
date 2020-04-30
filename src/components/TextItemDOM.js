import React, { useRef } from 'react';
import PDFJS from 'pdfjs-dist';

export function TextItemDom({ style, viewport, textItem }) {
  const element = useRef(null);

  const [
    ,
    ,
    /* fontHeightPx */ /* fontWidthPx */ offsetX,
    offsetY,
    x,
    y,
  ] = textItem.transform;
  const [, /* xMin */ yMin /* xMax */, , yMax] = viewport.viewBox;
  const top = yMax - (y + offsetY);

  const [xMin] = viewport.viewBox;
  const left = x - xMin;

  const targetWidth = textItem.width * textItem.scale;
  const actualWidth = element.current
    ? element.current.getBoundingClientRect()['width']
    : 0;

  console.log(targetWidth, actualWidth)
  let cssTransform = `scaleX(${targetWidth / actualWidth})`;

  const ascent = style.ascent ? style.ascent : 0;

  if (ascent) {
    cssTransform += ` translateY(${(1 - ascent) * 200}%)`;
  }
  
  return (
    <span
      key={`${textItem.str}${targetWidth}`}
      className="text-item-span"
      style={{
        transform: cssTransform,
        top: `${top * 2}px`,
        left: `${left * 2}px`,
        transformOrigin: 'left bottom',
        fontfamily: style.fontfamily,
        whiteSpace: 'pre',
        backgroundColor: 'rgba(255, 0, 0, .5)',
        width: textItem.width * 2,
        height: textItem.height * 2,
        fontSize: textItem.height * 2
      }}
      ref={element}
    >
      {textItem.str}
    </span>
  );
}
