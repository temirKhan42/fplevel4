import { connect, query, getSecret } from '../../../../lib/db';
import HttpErrors from 'http-errors';
import _ from 'lodash';
let jwt = require('jsonwebtoken');

const { Unauthorized, Conflict } = HttpErrors;
const secret = getSecret();

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      // Verify the token and extract the user's information
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next(req, res);
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
}

async function handler(req, res) {
  connect();
  const { rows } = await query('SELECT * FROM users', []);
  const { rows: channels } = await query('SELECT * FROM channels', []);
  const { rows: messages } = await query('SELECT * FROM messages', []);
  const currentChannelId = 1;

  const user = rows.find(({ id }) => id === req.user.userId);

  if (!user) {
    res.status(401).json(new Unauthorized());
    return;
  }

  res
    .status(200)
    .setHeader('Content-Type', 'application/json; charset=utf-8')
    .send({ channels, messages, currentChannelId });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function(req, res) {
  authenticate(req, res, () => {
    handler(req, res);
  });
}
