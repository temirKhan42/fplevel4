import _ from "lodash";
import HttpErrors from 'http-errors';
import  { connect, query, getSecret, close } from '../../../../lib/db';
let jwt = require('jsonwebtoken');

const { Unauthorized, Conflict } = HttpErrors;
const secret = getSecret();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    connect();
    const { rows } = await query('SELECT * FROM users', []);
    
    const username = _.get(req, 'body.username');
    const password = _.get(req, 'body.password');
    const user = rows.find((u) => u.username === username);

    if (!user || user.password !== password) {
      res.status(401).json(new Unauthorized());
      return;
    }

    const token = jwt.sign({ userId: user.id }, secret);
    close();
    return res.status(200).json({ token, username });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}