import express from 'express';
import { MysqlCrudInterface } from './data/Interface/mysqlcrudinterface';
import mysql from 'mysql2';

const app = express();

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
  password: '', // You may need to set a password here if one is configured for your MySQL server
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

// simple route
app.get("/", (req, res) => {
  res.status(200).json({ Reply: "Hello world!" });
});

app.get("/leave-requests", (req: any, res: any) => {
  const query = 'SELECT * FROM absention';
  connection.query(query, (error: any, results: any) => {
    if (error) {
      console.error('Error fetching leave requests:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

app.post("/leave-requests", (req: any, res: any) => {
  const { captainEmail, startDate, endDate } = req.body;
  const query = 'INSERT INTO absention (Captain_Email, Start_Date, End_Date) VALUES (?, ?, ?)';
  connection.query(query, [captainEmail, startDate, endDate], (error: any, results: any) => {
    if (error) {
      console.error('Error submitting leave request:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).send('Leave request submitted successfully');
    }
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
