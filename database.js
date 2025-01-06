import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getResponses(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM responses
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}

export async function createItem(item) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      item JSON NOT NULL
    )
  `);

  const [result] = await pool.query(
    `
    INSERT INTO items (item)
    VALUES (?)
  `,
    [item]
  );

  const id = result.insertId;
  return { id, item };
}

export async function createCarParts(carParts) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS carParts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      carPart JSON NOT NULL
    )
  `);

  const [result] = await pool.query(
    `
    INSERT INTO carParts (carPart)
    VALUES (?)
  `,
    [carParts]
  );
  const id = result.insertId;
  console.log(id);

  await getResponses(id);
}

export async function createResponses(item, carPart) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS responses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      item JSON NOT NULL,
      carPart JSON NOT NULL
    )
  `);

  const [result] = await pool.query(
    `
    INSERT INTO responses (item, carPart)
    VALUES (?, ?)
  `,
    [JSON.stringify(item), JSON.stringify(carPart)]
  );
  const id = result.insertId;
  return { id, item, carPart };
}
