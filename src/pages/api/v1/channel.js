import { connect, close, query } from "../../../../lib/db";
import pusher from "../../../../lib/pusher"; 

export default async function channel(req, res) {
  try {
    if (req.method === 'POST') {
      connect();

      const { name } = req.body;
      const currentDate = new Date().toISOString();
      await query(`INSERT INTO channels (name, removable, created_at) VALUES ('${name}', '${true}', '${currentDate}')`, []);
      const { rows } = await query(`SELECT * FROM channels WHERE created_at = '${currentDate}'`, []);
      console.log('Rows from new-channel request:', rows);
      const newChannel = rows[0];
      pusher.trigger('channel', 'add-channel', newChannel);

      close();
      return res.status(200).json('Channel added!');
    } else if (req.method === 'PUT') {
      connect();

      const { id, name } = req.body;
      await query(`UPDATE channels SET name = '${name}' WHERE id = ${id}`, []);
      const { rows } = await query(`SELECT * FROM channels WHERE id = ${id}`, []);
      console.log('Rows from rename-channel request:', rows);
      const renamedChannel = rows[0];
      pusher.trigger('channel', 'rename-channel', renamedChannel);
      
      close();
      return res.status(200).json('Channel renamed!');
    } else if (req.method === 'DELETE') {
      connect();

      const { id } = req.body;
      console.log(id);
      await query(`DELETE from messages WHERE channelid = ${id}`, []);
      await query(`DELETE from channels WHERE id = ${id}`, []);
      console.log('ID from removed-channel request:', id);
      const removedChannelId = { id };
      pusher.trigger('channel', 'remove-channel', removedChannelId);

      close();
      return res.status(200).json('Channel removed!');
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch(err) {
    console.log(err);
  }
};