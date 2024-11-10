import { execute } from '../services/mysql.connector';
import { Pdf } from "./pdf.model";
import { pdfQueries } from "./pdf.queries";
import { OkPacket } from "mysql";

export const readPdf = async () => {
    return execute<Pdf[]>(pdfQueries.readPdf, []);
};

export const readPdfById = async (id: number) => {
    console.log('Executing query with ID:', id);
    return execute<Pdf[]>(pdfQueries.readPdfById, [id]);
};

export const readPdfByName = async (pdfName: string) => {
    return execute<Pdf[]>(pdfQueries.readPdfByName, [pdfName]);
};

export const readPdfBySearchTerm = async (search: string) => {
    return execute<Pdf[]>(pdfQueries.readPdfBySearchTerm, [search]);
};
// Updated createPdf to match format that works for uploaded pdfs
export const createPdf = async (pdf: Pdf): Promise<OkPacket> => {
    return execute<OkPacket>(pdfQueries.createPdf, [pdf.pdfUserId, pdf.pdfName, pdf.dateUploaded, pdf.pdfBlob]);
};
// Made changes to try and match createPdf slightly
export const updatePdf = async (pdf: Pdf): Promise<OkPacket> => {
    const result = await execute<OkPacket>(pdfQueries.updatePdf, [pdf.pdfUserId, pdf.pdfName, pdf.dateUploaded, pdf.pdfBlob, pdf.id]);

    console.log('Update Result:', result);  // Log the result of the query
    console.log('Affected Rows:', result.affectedRows); // Log how many rows were affected

    if (result.affectedRows === 0) {
        throw new Error('No matching record found to update.');
    }

    return result;
};

export const deletePdf = async (id: number) => {
    return execute<OkPacket>(pdfQueries.deletePdf, [id]);
};