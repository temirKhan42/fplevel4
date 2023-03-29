const io = require('socket.io')();
import  { connect, query, getSecret } from '../../../../lib/db';

const secret = getSecret();

export default function handler(req, res) {
  connect();
  console.log('asdasddasds');
  if (!res.socket.server.io) {
    console.log('First time: initializing socket.io');
    io.attach(res.socket.server);
  }

  io.on('connection', (socket) => {
    console.log({ 'socket.id': socket.id });
    console.log('Client connected');

    socket.on('newMessage', async (message, acknowledge = _.noop) => {
      const channelId = parseInt(message?.channelId);
      const username = message?.username;
      const text = message?.text;
      const created_at = new Date();

      await query(`INSERT INTO messages (channelId, username, text, created_at) VALUES (${channelId}, '${username}', '${text}', ${created_at})`, []);
      const { rows } = await query(`SELECT * FROM messages WHERE username='${username}' AND created_at=${created_at}`);
      const messageWithId = rows[0];
      acknowledge({ status: 'ok' });
      app.io.emit('newMessage', messageWithId);
    });


    socket.emit('message', 'Hello, client!');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  res.end();
};


