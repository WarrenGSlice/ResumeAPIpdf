export interface Pdf {
    id: number;
    pdfUserId: number;
    pdfName: string;
    dateUploaded: string;
    pdfBlob: string;  // Change to Buffer type to handle binary data
}