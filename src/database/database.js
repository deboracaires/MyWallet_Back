/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const connection = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_DATABASE,
});

export default connection;
