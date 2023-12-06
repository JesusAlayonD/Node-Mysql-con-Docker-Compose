import express from "express";
import { createPool } from "mysql2/promise";
import { config } from "dotenv";
config();

const app = express();

console.log();

export const pool = createPool({
  host: process.env.MYSQLDB_HOST,
  user: "root",
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  port: process.env.MYSQLDB_DOCKER_PORT,
});

app.get("/", (req, res) => {
  res.send({
    host: process.env.MYSQLDB_HOST,
    user: "root",
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    port: process.env.MYSQLDB_DOCKER_PORT,
  });
});

app.get("/ping", async (req, res) => {
  try {
    const result = await pool.query(`SELECT NOW()`);
    return res.json(result[0]);
  } catch (error) {
    return res.json(error);
  }
});

app.listen(3000);
console.log("Server on port", process.env.NODE_DOCKER_PORT);
