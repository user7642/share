// Hàm tải xuống tệp CSV
function downloadCSV(csvContent) {
    const csvFile = new Blob([csvContent],{
        type: 'text/csv'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvFile);
    link.download = document.title + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Lấy tất cả các phần tử chứa thuật ngữ
let csv = [];
let terms = document.querySelectorAll(".SetPageTerms-term");

// Lặp qua các phần tử thuật ngữ để thu thập dữ liệu
terms.forEach( (term) => {
    let enElement = term.querySelector("span.TermText.notranslate.lang-en");
    let viElement = term.querySelector("span.TermText.notranslate.lang-vi");
    let imgElement = term.querySelector("img.SetPageTerm-image");

    let en = enElement ? enElement.innerHTML : "N/A";
    let vi = viElement ? viElement.innerHTML : "N/A";
    let imgSrc = imgElement ? imgElement.src.split('/').pop() : null;

    // Thêm vào mảng CSV
    csv.push(`${en};${vi};<img src="${imgSrc}">;`);
}
);

console.log(csv.join('\n'));
downloadCSV(csv.join('\n'));
