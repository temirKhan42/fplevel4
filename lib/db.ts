const { Pool, Client } = require('pg');

let pool: any = null;

export function connect() {
  console.log('connecting to DB');
  pool = new Pool({
    user: 'temirkhan',
    host: 'localhost',
    database: 'fplevel4',
    password: '1234asdzxc',
    port: 5432,
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

