import { Request, Response, RequestHandler } from "express";
import { Pdf } from "./pdf.model";
import * as PdfDao from './pdf.dao';
import { OkPacket } from "mysql";
import multer from 'multer';

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const readPdf: RequestHandler = async (req: Request, res: Response) => {
    try {
        let pdfs;
        let id = parseInt(req.query.id as string);

        console.log('pdf ID', id);
        if (Number.isNaN(id)) {
            pdfs = await PdfDao.readPdf();
        } else {
            pdfs = await PdfDao.readPdfById(id);
        }
        res.status(200).json(pdfs);
    } catch (error) {
        console.error('[pdf.controller][readPdf][Error] ', error);
        res.status(500).json({message: 'There was an error when fetching pdfs'});
    }
};

export const readPdfById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const pdf = await PdfDao.readPdfById(id);

        if (pdf && pdf.length > 0) {
            const pdfData = pdf[0];
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${pdfData.pdfName}"`);
            res.send(pdfData.pdfBlob);
        } else {
            res.status(404).json({ message: 'PDF not found' });
        }
    } catch (error) {
        console.error('[pdf.controller][readPdfById][Error] ', error);
        res.status(500).json({ message: 'There was an error when fetching the pdf by id' });
    }
};

export const readPdfByName: RequestHandler = async (req: Request, res: Response) => {
    try {
        const pdf = await PdfDao.readPdfByName(req.params.name);

        res.status(200).json(pdf);
    } catch (error) {
        console.error('[pdf.controller][readPdfByName][Error] ', error);
        res.status(500).json({message: 'There was an error when fetching pdfs by name'});
    }
};

export const readPdfBySearchTerm: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('search', req.params.search);
        const pdf = await PdfDao.readPdfBySearchTerm('%' + req.params.search + '%');

        res.status(200).json(pdf);
    } catch (error) {
        console.error('[pdf.controller][readPdfBySearchTerm][Error] ', error);
        res.status(500).json({message: 'There was an error when fetching pdfs by search term'});
    }
};

export const createPdf: RequestHandler = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        const fileBuffer = req.file.buffer.toString('base64'); // Convert to string
        const fileName = req.file.originalname;
        const dateUploaded = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
        const pdfUserId = req.body.pdfUserId;

        if (!pdfUserId) {
            res.status(400).json({ message: 'Missing pdfUserId' });
            return;
        }

        await PdfDao.createPdf({pdfUserId, pdfName: fileName, dateUploaded, pdfBlob: fileBuffer});

        res.status(200).json({ message: 'PDF file uploaded successfully'});
    } catch (error) {
        console.error('[pdf.controller][uploadPdf][Error]', error);
        res.status(500).json({ message: 'Error uploading PDF' });
    }
};
// Multer middleware export - Works as part of the createPdf method up above
export const uploadMiddleware = upload.single('pdfBlob');

export const updatePdf: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await PdfDao.updatePdf(req.body);
        console.log('req.body', req.body);
        console.log('pdf', okPacket);

        res.status(200).json(okPacket);
    }catch (error) {
        console.error('[pdf.controller][updatePdf][Error] ', error);
        res.status(500).json({message: 'There was an error when updating a pdf'});
    }
};

export const deletePdf: RequestHandler = async (req:Request, res: Response) => {
    try {
        let id = parseInt(req.params.id as string);

        console.log('pdf id', id);
        if (!Number.isNaN(id)) {
            const response = await PdfDao.deletePdf(id);
            res.status(200).json(response);
        } else {
            throw new Error("Integer expected for pdf id");
        }
    } catch (error) {
        console.error('[pdf.controller][deletePdf][Error] ', error);
        res.status(500).json({message: 'There was an error when deleting a pdf'});
    }
};