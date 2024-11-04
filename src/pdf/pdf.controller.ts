import { Request, Response, RequestHandler } from "express";
import { Pdf } from "./pdf.model";
import * as PdfDao from './pdf.dao';
import { OkPacket } from "mysql";

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
        const okPacket: OkPacket = await PdfDao.createPdf(req.body);

        console.log('req.body', req.body);
        console.log('pdf', okPacket);

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[pdf.controller][createPdf][Error] ', error);
        res.status(500).json({message: 'There was an error when creating a new pdf'});
    }
};

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