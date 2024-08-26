function tableToCSV() {
var csv = [];
doc = $0;
var rows = doc.querySelectorAll("tr");

rows.forEach(function(row) {
    var cols = row.querySelectorAll("td");
    var rowData = [];

    cols.forEach(function(col) {
        rowData.push(col.innerText.trim().toLocaleLowerCase());
    });

    csv.push(rowData.join(";"));
});
// Tạo file CSV
var csvFile = new Blob([csv.join("\n")], { type: "text/csv" });

// Tạo link download
var downloadLink = document.createElement("a");
downloadLink.download = "table.csv";
downloadLink.href = window.URL.createObjectURL(csvFile);
downloadLink.style.display = "none";

// Thêm link vào document và click tự động
document.body.appendChild(downloadLink);
downloadLink.click();
document.body.removeChild(downloadLink);

 console.log(csv.join("\n"))
}

// Gọi hàm để tạo file CSV
tableToCSV();
