import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { userRouter } from "./routes/user.routes";
import { movieRouter } from "./routes/movie.routes";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
dotenv.config();
import { Pool, QueryResult } from 'pg';

const { Client } = require('pg');
const { Pool } = require('pg');
const app = express();
app.use(express.json());
app.use(errorHandler)
const { PORT = 3000 } = process.env;
app.use("/auth", userRouter);
app.use("/api", movieRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

// Configure the database connection
const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'mydatabase', 
  password: 'password', 
  port: 5432, 
});


// Example query to test the connection
pool.query('SELECT NOW()', (err: Error, res: QueryResult) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL. Current time is:', res.rows[0].now);
  }
  pool.end(); 
});