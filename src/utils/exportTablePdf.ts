import jsPDF from 'jspdf';
import 'jspdf-autotable';

type Row = {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
};

export function exportScheduleTablePdf(rows: Row[], filename = 'amortization-table.pdf') {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(14);
  doc.text('Amortization Schedule', 14, 16);

  // Prepare table columns
  const head = [['Month', 'EMI', 'Principal', 'Interest', 'Balance']];
  const body = rows.map(r => [r.month.toString(), r.emi.toFixed(0), r.principal.toFixed(0), r.interest.toFixed(0), r.balance.toFixed(0)]);

  // @ts-ignore - autoTable attaches to doc
  (doc as any).autoTable({
    startY: 22,
    head: head,
    body: body,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [60, 60, 60] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { left: 14, right: 14 },
    theme: 'striped',
  });

  doc.save(filename);
}
