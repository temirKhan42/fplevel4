import { connect, close, query } from "../../../../lib/db";
import pusher from "../../../../lib/pusher"; 

export default async function message(req, res) {
  try {
    if (req.method === 'POST') {
      connect();
      const { channelId, username, text } = req.body;
      const currentDate = new Date();
      await query(`INSERT INTO messages (channelid, username, text, created_at) VALUES ('${channelId}', '${username}', '${text}', to_timestamp('${currentDate}')::timestamp)`, []);
      const { rows } = await query(`SELECT * FROM messages WHERE created_at = '${currentDate}'`, []);
      console.log('Rows from message request:', rows);
      const newMessage = rows[0];
      pusher.trigger('message', 'add-message', newMessage);
      close();
      return res.status(200).json('Message added!');
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch(err) {
    console.log(err);
  }
};