import express from 'express';
import verlofController from './controllers/verlofController'; // Import the verlof controller
import mysql from 'mysql2';

const app = express();

// Middleware
app.use(function (_req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', "true");
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Create connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'hverhuur'
});

// Check for MySQL connection errors
connection.connect((err: any) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Mount the verlof controller at the base path '/api'
app.use('/api', verlofController);

// simple route
app.get("/", (req, res) => {
  res.status(200).json({ Reply: "Hello world!" });
});

// set port, listen for requests
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
