import type { PDFFont, PDFPage } from "pdf-lib";

type MultilineOptions = {
  x: number;
  y: number;
  maxWidth: number;
  font: PDFFont;
  fontSize: number;
  lineHeight?: number;
};

export function drawMultilineText(
  page: PDFPage,
  text: string,
  options: MultilineOptions
) {
  const { x, y, maxWidth, font, fontSize } = options;
  const lineHeight = options.lineHeight ?? fontSize + 2;

  const paragraphs = text.split("\n"); // 👈 clave
  let currentY = y;

  paragraphs.forEach((paragraph) => {
    const words = paragraph.split(" ");
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine ? currentLine + " " + word : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);

      if (width > maxWidth) {
        page.drawText(currentLine, {
          x,
          y: currentY,
          size: fontSize,
          font,
        });
        currentLine = word;
        currentY -= lineHeight;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      page.drawText(currentLine, {
        x,
        y: currentY,
        size: fontSize,
        font,
      });
      currentY -= lineHeight;
    }

    currentY -= lineHeight; // 👈 espacio extra entre párrafos
  });
}
