'use script'

function loadScript(filePath, cacheBuster = `?bust=${new Date().getTime()}`) {
	const scriptTag = document.createElement('script');
	scriptTag.onload = () => console.log('loaded');
	scriptTag.type = 'text/javascript';
	scriptTag.src = `${filePath}${cacheBuster}`;
	document.querySelector('head').appendChild(scriptTag);
}

window.loadScript = loadScript;

loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js')


// Hàm tải xuống tệp CSV
function downloadCSV(csvContent) {
    const csvFile = new Blob([csvContent], {
        type: 'text/csv'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvFile);
    link.download = document.title + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Hàm chính để xử lý việc thu thập dữ liệu và tải đồng bộ với ZIP
async function processTermsAndDownload() {
    let csv = [];
    let terms = document.querySelectorAll(".SetPageTerms-term");

    // Tạo đối tượng JSZip
    let zip = new JSZip();
    let imgFolder = zip.folder("images");  // Tạo thư mục cho ảnh trong file ZIP

    // Lặp qua các phần tử thuật ngữ để thu thập dữ liệu
    for (const term of terms) {
        let enElement = term.querySelector("span.TermText.notranslate.lang-en");
        let viElement = term.querySelector("span.TermText.notranslate.lang-vi");
        let imgElement = term.querySelector("img.SetPageTerm-image");

        let en = enElement ? enElement.innerHTML : "N/A";
        let vi = viElement ? viElement.innerHTML : "N/A";
        let imgSrc = imgElement ? imgElement.src : null;
        let imgName = imgSrc ? imgSrc.split('/').pop() : "no_image";

        // Thêm vào mảng CSV
        csv.push(`${en};${vi};<img src="${imgName}">;`);

        // Kiểm tra nếu ảnh không phải là .gif thì tải và thêm vào ZIP
        if (imgSrc && !imgName.toLowerCase().endsWith(".gif")) {
            const response = await fetch(imgSrc);
            const blob = await response.blob();
            imgFolder.file(imgName, blob);  // Thêm file ảnh vào thư mục images trong file ZIP
        }
    }

    // Tạo file CSV và thêm vào ZIP
    zip.file(document.title + ".csv", csv.join('\n'));

    // Tạo và tải file ZIP
    zip.generateAsync({ type: "blob" }).then(function (content) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = document.title + ".zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Gọi hàm chính
processTermsAndDownload();
