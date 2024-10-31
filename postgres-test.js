// import pg from 'pg';
// import dotenv from 'dotenv'
const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();
console.log(process.env.POSTGRES_URL);

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool.connect();