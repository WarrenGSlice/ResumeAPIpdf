import { Router } from 'express';
import * as PdfController from './pdf.controller';

const router = Router();
// GET ALL RESUME
router.
    route('/pdf').
    get(PdfController.readPdf);
// SEARCH BY pdf NAME
router.
    route('/pdf/:pdfName').
    get(PdfController.readPdfByName);
// SEARCH BY ID
router.
    route('/id/:id').
    get(PdfController.readPdfById);
// SEARCH BY ANY TERM
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
// UPDATE
router
    .route('/update')
    .put(PdfController.uploadMiddleware,PdfController.updatePdf);
// DELETE
router
    .route('/pdf/:id')
    .delete(PdfController.deletePdf);

export default router;