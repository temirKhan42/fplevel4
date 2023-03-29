import _ from "lodash";
import HttpErrors from 'http-errors';
import  { connect, query, getSecret, close } from '../../../../lib/db';
let jwt = require('jsonwebtoken');

const { Unauthorized, Conflict } = HttpErrors;
const secret = getSecret();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    connect();
    const { rows: users } = await query('SELECT * FROM users', []);
    

    const username = _.get(req, 'body.username');
    const password = _.get(req, 'body.password');
    const user = users.find((u) => u.username === username);

    if (user) {
      res.status(409).send(new Conflict());
      return;
    }

    await query(`INSERT INTO users (username, password) VALUES ('${username}', '${password}')`, []);
    const { rows } = await query(`SELECT * FROM users WHERE username = '${username}'`, []);

    const newUser = rows.find((u) => u.username === username);

    const token = jwt.sign({ userId: newUser.id }, secret);
    close();
    return res
      .status(201)
      .setHeader('Content-Type', 'application/json; charset=utf-8')
      .json({ token, username });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
