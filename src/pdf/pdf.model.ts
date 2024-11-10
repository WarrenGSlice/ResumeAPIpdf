export interface Pdf {
    id?: number; // Made it as optional to get it to work correctly
    pdfUserId: number;
    pdfName: string;
    dateUploaded: string;
    pdfBlob: string;  // Change to Buffer type to handle binary data
}