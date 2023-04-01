const { Pool, Client } = require('pg');

let pool: any = null;

export function connect() {
  console.log('connecting to DB', process.env.PGUSER);
  pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  })
}

export async function query(text: string, params: any[]) {
  const data = await pool.query(text);
  return data;
}

export async function close() {
  console.log('DB closed.');
  await pool.end();
}

export function getSecret() {
  return 'secret2799AKecv';
}

