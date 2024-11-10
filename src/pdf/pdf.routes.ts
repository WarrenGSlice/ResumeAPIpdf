import { Router } from 'express';
import * as PdfController from './pdf.controller';

const router = Router();
router.
    route('/pdf').
    get(PdfController.readPdf);

router.
    route('/pdf/:pdfName').
    get(PdfController.readPdfByName);

router.
    route('/pdf/:id').
    get(PdfController.readPdfById);

router
    .route('/pdf/search/:search')
    .get(PdfController.readPdfBySearchTerm);
/* No Longer using this route
router
    .route('/pdf')
    .post(PdfController.createPdf);
*/
// Testing Post route that I got to work previously
router
    .route('/upload')
    .post(PdfController.uploadMiddleware,PdfController.createPdf);

router
    .route('/pdf')
    .put(PdfController.updatePdf);

router
    .route('/pdf/:id')
    .delete(PdfController.deletePdf);

export default router;