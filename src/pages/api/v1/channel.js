import pusher from "../../../../lib/pusher"; 

export default function channel(req, res) {
  try {
    if (req.method === 'POST') {
      const data = req.body;
      pusher.trigger('channel', 'add-channel', data)
      return res.status(200).json('Message added!');
    } else if (req.method === 'PUT') {

    } else if (req.method === 'DELETE') {
      
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch(err) {
    console.log(err);
  }
};