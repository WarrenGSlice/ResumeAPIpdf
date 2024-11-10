
export const pdfQueries = {
    readPdf:`
        SELECT
            id as id, pdfUserId as pdfUserId, pdfName as pdfName, dateUploaded as dateUploaded, pdfBlob as pdfBlob
        FROM bhxhr5tkthkjr1rbfskg.pdfs
    `,
    readPdfById:`
        SELECT
            id as id, pdfUserId as pdfUserId, pdfName as pdfName, dateUploaded as dateUploaded, pdfBlob as pdfBlob
        FROM bhxhr5tkthkjr1rbfskg.pdfs
        WHERE bhxhr5tkthkjr1rbfskg.pdfs.id = ?
    `,
    readPdfByName:`
        SELECT * FROM bhxhr5tkthkjr1rbfskg.pdfs
        WHERE bhxhr5tkthkjr1rbfskg.pdfs.pdfName = ?
    `,
    readPdfBySearchTerm:`
        SELECT
            id as id, pdfUserId as pdfUserId, pdfName as pdfName, dateUploaded as dateUploaded, pdfBlob as pdfBlob
        FROM bhxhr5tkthkjr1rbfskg.pdfs
        WHERE bhxhr5tkthkjr1rbfskg.pdfs.pdfName LIKE ?
    `,
    createPdf:`
        INSERT INTO pdfs(pdfUserId, pdfName, dateUploaded, pdfBlob)
        VALUES(?,?,?,?)
    `,
    updatePdf:`
        UPDATE bhxhr5tkthkjr1rbfskg.pdfs
        SET  pdfUserId = ?, pdfName = ?, dateUploaded = ?, pdfBlob = ?
        WHERE id = ?
    `,
    deletePdf:`
        DELETE FROM bhxhr5tkthkjr1rbfskg.pdfs
        WHERE id = ?
    `,

};