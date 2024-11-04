import { Router } from 'express';
import * as PdfController from './pdf.controller';

const router = Router();
router.
    route('/pdf').
    get(PdfController.readPdf);

router.
    route('/pdf/:pdfName').
    get(PdfController.readPdfByName);

router
    .route('/pdf/search/:search')
    .get(PdfController.readPdfBySearchTerm);

router
    .route('/pdf')
    .post(PdfController.createPdf);

router
    .route('/pdf')
    .put(PdfController.updatePdf);

router
    .route('/pdf/:id')
    .delete(PdfController.deletePdf);

export default router;