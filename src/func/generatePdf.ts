import { PDFDocument, PDFPage, StandardFonts } from "pdf-lib";
import { drawMultilineText } from "./pdfUtils";

const positions: Record<
  string,
  { x: number; y: number; multiline?: boolean; maxWidth?: number }
> = {
  // 📌 DATOS PERSONALES (página 1)
  "0-0": { x: 265, y: 570 }, // Nombre
  "0-1": { x: 125, y: 557 }, // Domicilio
  "0-2": { x: 40, y: 545 }, // Correo
  "0-3": { x: 300, y: 544 }, // Tel

  // 📌 CLAUSULAS (página 1)
  "1-0": { x: 220, y: 482 }, // Día
  "1-1": { x: 400, y: 482 }, // Mes
  "1-2": { x: 530, y: 482 }, // Año

  "1-3": { x: 40, y: 450 }, // Lugar
  "1-4": { x: 130, y: 412 }, // Horario

  "1-5": {
    x: 160,
    y: 745,
  },
  "1-6": {
    x: 150,
    y: 727,
  },
  "1-7": {
    x: 40,
    y: 680,
    multiline: true,
    maxWidth: 380,
  },

  // 📌 SEGUNDA PÁGINA (AQUÍ estaba tu problema)
  "2-0": { x: 80, y: 325 }, // Nombre
  "2-1": { x: 95, y: 305 }, // Total
  "2-2": { x: 395, y: 305 }, // Anticipo
  "2-3": { x: 105, y: 285 }, // Restante
  "2-4": { x: 125, y: 265 }, // Fecha
  "2-5": { x: 430, y: 240 }, // ciudad de
  "2-6": { x: 65, y: 222 }, // dias
  "2-7": { x: 180, y: 222 }, // mes
  "2-8": { x: 340, y: 222 }, // año
};

export async function generarPDF(formData: Record<string, string>) {
  // 👇 aquí SÍ existe pdfDoc
  const existingPdfBytes = await fetch("/contrato.pdf").then((res) =>
    res.arrayBuffer(),
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  drawDebugGrid(pages[0]);
  drawDebugGrid(pages[1]);

  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontSize = 10;

  Object.entries(formData).forEach(([key, value]) => {
    if (!value) return;

    const [sectionIndex] = key.split("-"); // 👈 "2-0" → "2"
    const pos = positions[key];

    if (!pos) return;

    // 🔥 CONTROL DE PÁGINAS
    if (sectionIndex === "2" || ["1-5", "1-6", "1-7"].includes(key)) {
      // SOLO datos de pago → página 2
      const page = pages[1];

      page.drawText(value, {
        x: pos.x,
        y: pos.y,
        size: fontSize,
        font,
      });
    } else {
      // TODO lo demás → página 1
      const page = pages[0];

      if (pos.multiline) {
        drawMultilineText(page, value, {
          x: pos.x,
          y: pos.y,
          maxWidth: pos.maxWidth!,
          font,
          fontSize,
        });
      } else {
        page.drawText(value, {
          x: pos.x,
          y: pos.y,
          size: fontSize,
          font,
        });
      }
    }
  });

  const pdfBytes = await pdfDoc.save();

  const arrayBuffer = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength,
  ) as ArrayBuffer;

  const blob = new Blob([arrayBuffer], {
    type: "application/pdf",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "contrato-lleno.pdf";
  a.click();

  window.open(URL.createObjectURL(blob));
}

export async function drawDebugGrid(page: PDFPage) {
  for (let y = 0; y < 800; y += 10) {
    page.drawText(String(y), {
      x: 5,
      y,
      size: 6,
    });
  }

  for (let x = 0; x < 600; x += 20) {
    page.drawText(String(x), {
      x,
      y: 10,
      size: 6,
    });
  }
}
