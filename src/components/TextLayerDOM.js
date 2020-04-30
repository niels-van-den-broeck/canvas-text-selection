import React, { useState, useRef, useEffect } from 'react';
import PDFJS from 'pdfjs-dist';

import textContent from '../assets/textcontent.json';
import { TextItemDom } from './TextItemDOM';

export function TextLayerDOM() {
  const textLayerContainer = useRef(null);
  const { viewport } = textContent.pc;
  return (
    <div
      className="text-layer"
      width={textContent.pc.viewport.width}
      height={textContent.pc.viewport.height}
      ref={textLayerContainer}
    >
      {textContent.pc.items.map((textItem) => (
        <TextItemDom 
          textItem={textItem}
          style={textContent.pc.styles[textItem.fontName]}
          viewport={viewport}
        />
      ))}
    </div>
  );
}
