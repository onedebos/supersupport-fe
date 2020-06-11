import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = tickets => {
  var doc = new jsPDF();
  var col = ["Id", "Title", "Issue", "Status"];
  var rows = [];

  tickets.forEach(ticket => {
    var temp = [ticket.id, ticket.title, ticket.request, ticket.status];
    rows.push(temp);
  });

  doc.autoTable(col, rows, { startY: 10 });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
