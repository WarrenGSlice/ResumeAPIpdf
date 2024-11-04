
export const pdfQueries = {
    readPdf:`
        SELECT
            id as id, pdfUserId as pdfUserId, pdfUrl as pdfUrl, pdfName as pdfName, dateUploaded as dateUploaded
        FROM bhxhr5tkthkjr1rbfskg.pdfs
    `,
    readPdfById:`
        SELECT
            id as id, pdfUserId as pdfUserId, pdfUrl as pdfUrl, pdfName as pdfName, dateUploaded as dateUploaded
        FROM bhxhr5tkthkjr1rbfskg.pdfs
        WHERE bhxhr5tkthkjr1rbfskg.pdfs.id = ?
    `,
    readPdfByName:`
        SELECT
            id as id, pdfUserId as pdfUserId, pdfUrl as pdfUrl, pdfName as pdfName, dateUploaded as dateUploaded
        FROM bhxhr5tkthkjr1rbfskg.pdfs
        WHERE bhxhr5tkthkjr1rbfskg.pdfs.pdfName = ?
    `,
    readPdfBySearchTerm:`
        SELECT
            id as id, pdfUserId as pdfUserId, pdfUrl as pdfUrl, pdfName as pdfName, dateUploaded as dateUploaded
        FROM bhxhr5tkthkjr1rbfskg.pdfs
        WHERE bhxhr5tkthkjr1rbfskg.pdfs.pdfName LIKE ?
    `,
    createPdf:`
        INSERT INTO pdf(pdfUserId, pdfUrl, pdfName, dateUploaded)
        VALUES(?,?,?,?)
    `,
    updatePdf:`
        UPDATE bhxhr5tkthkjr1rbfskg.pdfs
        SET pdfUrl = ?, pdfName = ?, dateUploaded = ?
        WHERE id = ?
    `,
    deletePdf:`
        DELETE FROM bhxhr5tkthkjr1rbfskg.pdfs
        WHERE id = ?
    `,

};