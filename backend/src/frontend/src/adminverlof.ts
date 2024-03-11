import express from 'express';
import mysql from 'mysql2';

const app = express();

// Enable CORS
app.use(function (_req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', "true");
  next();
});

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
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

// Route to simulate leave requests for dummy captain
app.post("/simulate-leave-request", (req: any, res: any) => {
  const { startDate, endDate } = req.body;
  const dummyCaptainEmail = 'dummy@email.com'; // Dummy captain's email

  const query = 'INSERT INTO absention (Captain_Email, Start_Date, End_Date) VALUES (?, ?, ?)';
  connection.query(query, [dummyCaptainEmail, startDate, endDate], (error: any, _results: any) => {
    if (error) {
      console.error('Error simulating leave request:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).send('Leave request simulated successfully');
    }
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
