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
  doc.save("Test.pdf");
};

export default generatePDF;
