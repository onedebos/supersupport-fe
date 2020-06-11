import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

const generatePDF = tickets => {
  var doc = new jsPDF();

  var col = ["Id", "Title", "Issue", "Status", "Closed on"];
  var rows = [];

  tickets.forEach(ticket => {
    var temp = [
      ticket.id,
      ticket.title,
      ticket.request,
      ticket.status,
      format(new Date(ticket.updated_at), "yyyy-MM-dd")
    ];
    rows.push(temp);
  });

  doc.autoTable(col, rows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.text("Closed tickets within the last one month.", 14, 15);
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
