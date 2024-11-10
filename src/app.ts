import express, { Request, Response } from 'express'; 
import pdfRouter from './pdf/pdf.routes';
import helmet from 'helmet';
import cors from 'cors';
import logger from './middleware/logger.middleware';
import dotenv from 'dotenv';
import { execute } from './services/mysql.connector';
import multer from 'multer';


dotenv.config(/*{ path: './.env'}*/);
// Create an instance of the Express application.
const app = express();
// Set the port number for the application.
const port = process.env.PORT || 5000;
//const port = 3000;



// CORS configuration
const corsOptions = {
    origin: '*', // Allow any origin (equivalent to .SetIsOriginAllowed(origin => true))
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow any method
    allowedHeaders: ['Content-Type', 'Authorization'], // You can specify which headers to allow
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

//MySQLConnector.initializeMySqlConnector();

console.log(process.env.MY_SQL_DB_HOST);

if (process.env.NODE_ENV == 'development' || 'production') {
    //add logger middleware
    app.use(logger);
    console.log(process.env.GREETING + ' in development mode')
}

app.get('/',(req: Request, res: Response) => {
    res.send('This is the PDF Homepage');
});

app.use('/', [pdfRouter]);

// Configure multer for file upload (in-memory storage for PDF files)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to handle PDF upload
app.post('/upload', upload.single('pdfBlob'), async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).send('No file uploaded');
        return;
      }
  
      const fileBuffer = req.file.buffer;
      const fileName = req.file.originalname;
      const dateUploaded = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
  
      // Ensure you're extracting pdfUserId properly
      const pdfUserId = req.body.pdfUserId;
  
      // Check for missing pdfUserId
      if (!pdfUserId) {
        res.status(400).send('Missing pdfUserId');
        return;
      }
  
      // MySQL Insert query
      const query = `
        INSERT INTO pdfs(pdfUserId, pdfName, dateUploaded, pdfBlob)
        VALUES (?, ?, ?, ?)
      `;
  
      // Execute the query
      await execute<any[]>(query, [pdfUserId, fileName, dateUploaded, fileBuffer]);
  
      res.status(200).send('PDF file uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);  // This will show the full error in your logs
      res.status(500).send('Error uploading file');
    }
  });

// Start the application and listen for incoming requests on the specified port.
app.listen(port, () => {
    // Display a message in the console to indicate that the application is running.
    console.log(`Example app listening at http://localhost:${port}`);
    //console.log(process.env.GREETING)
});
//app.use(bodyParser.urlencoded({ extended: true}));

export default app;