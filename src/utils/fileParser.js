import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set up the worker for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Extracts text from a File object (PDF, DOCX, or TXT).
 * @param {File} file 
 * @returns {Promise<string>} Extracted text
 */
export async function extractTextFromFile(file) {
    const extension = file.name.split('.').pop().toLowerCase();

    switch (extension) {
        case 'pdf':
            return extractTextFromPDF(file);
        case 'docx':
            return extractTextFromDOCX(file);
        case 'txt':
            return extractTextFromTXT(file);
        default:
            throw new Error(`Unsupported file type: .${extension}`);
    }
}

async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + "\n";
    }
    return fullText;
}

async function extractTextFromDOCX(file) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
}

async function extractTextFromTXT(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error("Failed to read text file"));
        reader.readAsText(file);
    });
}
