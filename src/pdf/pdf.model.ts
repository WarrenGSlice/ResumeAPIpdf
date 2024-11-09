export interface Pdf {
    id?: number;
    pdfUserId: number;
    pdfName: string;
    dateUploaded: string;
    pdfBlob: Buffer;  // Change to Buffer type to handle binary data
}