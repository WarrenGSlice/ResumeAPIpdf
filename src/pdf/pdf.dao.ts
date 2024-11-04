import { execute } from '../services/mysql.connector';
import { Pdf } from "./pdf.model";
import { pdfQueries } from "./pdf.queries";
import { OkPacket } from "mysql";

export const readPdf = async () => {
    return execute<Pdf[]>(pdfQueries.readPdf, []);
};

export const readPdfById = async (id: number) => {
    return execute<Pdf[]>(pdfQueries.readPdfById, [id]);
};

export const readPdfByName = async (pdfName: string) => {
    return execute<Pdf[]>(pdfQueries.readPdfByName, [pdfName]);
};

export const readPdfBySearchTerm = async (search: string) => {
    return execute<Pdf[]>(pdfQueries.readPdfBySearchTerm, [search]);
};

export const createPdf = async (pdf: Pdf) => {
    return execute<OkPacket>(pdfQueries.createPdf, [pdf.pdfUrl, pdf.pdfName, pdf.dateUploaded]);
};

export const updatePdf = async (pdf: Pdf) => {
    return execute<OkPacket>(pdfQueries.updatePdf, [pdf.pdfUrl, pdf.pdfName, pdf.dateUploaded, pdf.id]);
};

export const deletePdf = async (id: number) => {
    return execute<OkPacket>(pdfQueries.deletePdf, [id]);
};