import express, { Request, Response } from 'express'; 
import pdfRouter from './pdf/pdf.routes';
import helmet from 'helmet';
import cors from 'cors';
import logger from './middleware/logger.middleware';
import dotenv from 'dotenv';
//import bodyParser from 'body-parser';

dotenv.config(/*{ path: './.env'}*/);
// Create an instance of the Express application.
const app = express();
// Set the port number for the application.
const port = process.env.PORT || 5000;
//const port = 3000;

app.use(cors());

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
    res.send('PDF file save homepage');
});

app.use('/', [pdfRouter]);

// Start the application and listen for incoming requests on the specified port.
app.listen(port, () => {
    // Display a message in the console to indicate that the application is running.
    console.log(`Example app listening at http://localhost:${port}`);
    //console.log(process.env.GREETING)
});
//app.use(bodyParser.urlencoded({ extended: true}));

export default app;