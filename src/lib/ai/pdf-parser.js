/**
 * PDF Parser Utility
 * Extracts text from PDF files client-side
 */

/**
 * Extract text from a PDF file
 * @param {File} file - PDF file object
 * @returns {Promise<string>} Extracted text
 */
export async function extractTextFromPDF(file) {
    try {
        // Read file as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();

        // For browser environment, we'll use a simpler approach
        // pdf-parse works in Node.js, so we'll use PDF.js instead
        // Import dynamically to avoid SSR issues
        const pdfjsLib = await import('pdfjs-dist/webpack');

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';

        // Extract text from each page
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
        }

        return fullText.trim();
    } catch (error) {
        console.error('PDF parsing error:', error);
        throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF.');
    }
}

/**
 * Validate if file is a PDF
 * @param {File} file - File object
 * @returns {boolean}
 */
export function isPDF(file) {
    return file && file.type === 'application/pdf';
}

/**
 * Validate PDF file size (max 5MB)
 * @param {File} file - File object
 * @returns {boolean}
 */
export function isValidPDFSize(file) {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    return file && file.size <= MAX_SIZE;
}
