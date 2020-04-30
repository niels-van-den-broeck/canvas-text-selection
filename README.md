# POC

## RETREIVING THE TEXT 

Pdfjs allows retrieval of the text trough getTextContent on the Page object
This returns the following format

```
  {
    "pc": {
        "items": [
            {
                "str": "105", // The text content
                "dir": "ltr", // The direction of the text
                "width": 13.584599999999998, // The width of the bounding box on scale 1
                "height": 9,// The height of the bounding box on scale 1
                "transform": [
                    9, // scaleX
                    0, // 
                    0,
                    9,
                    510.2362, // The y coordinate on the page on scale 1
                    22.6993 // The x coordinate on the page on scale 1
                ], // the transform matrix of the text
                "fontName": "g_d1_f5" // The identifier to match with the styles below
            },
        ],
        "styles": {
          "g_d1_f5": {
                "fontFamily": "sans-serif",
                "ascent": 1.024,
                "descent": -0.298,
                "vertical": false
            },
        }
      }
  }
```

Since this would become a bulk of data maintain, I think the process should store this data in a proper format on a bucket on S3.
Also, since this data does not keep any viewport scaling into mind (Codex Player Scale is 2 by default) I recommend we transform it in the place where the scaling logic is as well. (Being the Portaal backend)

Further investigation is a necessity though.

## Rendering the text 

Text Selection can be achieved by overlaying. The book with an svg.
This SVG Should contain a text tag per item. (TextLayer.js)

This will never overlap completely since we do not get the correct font information from PDFjs. And even if we did we wouldn't be able to always obtain the correct font to render. 

The Text on this SVG can get a transparency of 0 which allows the user to get the feeling that he's selecting text on the book, while in reality it is just an overlay. 

Since we don't know the correct ways to render the font but we do know the width of every single text bounding box, we could use the textLength and lengthAdjust properties on svg text. which spreads out the text over its container.

## Zooming, panning, ...

If we would be able to keep the svg viewport in sync with the fabric viewport, this would not cause any issues. The transformation that fabric makes would be made on an svg level, and the underlying text would not be affected.

## Technical Debt

This functionality requires us to hook into the book component. Which has been touched on many times during retrospectives. This component needs cleaning before I would personally feel comfortable building further on it. 

## Marking text

The window selection API gives a good way to mark text. The API is wonky but it seems to work properly, and is compatible with all major browsers. 

We could draw a rect in the overlay svg for every selection that has been made.

