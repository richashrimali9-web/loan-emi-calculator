import jsPDF from 'jspdf';

export function exportBasicPdf(data: { title?: string; rows?: string[]; meta?: Record<string, string | number> }, filename = 'download-basic.pdf') {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const left = 15;
  let y = 20;

  pdf.setFontSize(14);
  pdf.text(data.title || 'Loan EMI Summary', left, y);

  pdf.setFontSize(10);
  y += 10;

  if (data.meta) {
    Object.entries(data.meta).forEach(([k, v]) => {
      pdf.text(`${k}: ${v}`, left, y);
      y += 7;
    });
    y += 4;
  }

  if (data.rows && data.rows.length) {
    pdf.setFontSize(12);
    pdf.text('Details:', left, y);
    y += 8;
    pdf.setFontSize(10);
    data.rows.forEach((r) => {
      // wrap if too long
      const lines = (pdf as any).splitTextToSize(r, 180);
      (pdf as any).text(lines, left, y);
      y += lines.length * 6;
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    });
  }

  pdf.save(filename);
}
