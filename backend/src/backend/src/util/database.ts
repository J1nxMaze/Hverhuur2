import { config } from 'dotenv';
import mysql2 from 'mysql2';

config();

// Create the connection pool
export const pool = mysql2.createPool({
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});