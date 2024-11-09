export interface Pdf {
    id: number;
    pdfUserId: number;
    pdfBlob: string;  // Change to Buffer type to handle binary data
    pdfName: string;
    dateUploaded: string;
}