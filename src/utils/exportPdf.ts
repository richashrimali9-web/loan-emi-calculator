import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportElementToPdf(element: HTMLElement | null, filename = 'download.pdf') {
  // If element is not present, return false (caller can fallback) instead of throwing
  if (!element) {
    // no error thrown to keep console clean; caller should handle fallback
    return false;
  }

  try {
    // Render the element to canvas (higher scale for better resolution)
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    // Create a PDF and scale the image to fit A4 width while preserving aspect ratio
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = (pdf as any).getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
    return true;
  } catch (err) {
    // If conversion failed, return false so callers can use a fallback PDF
    console.warn('exportElementToPdf failed:', err);
    return false;
  }
}
