import Pusher from 'pusher';

const pusher = new Pusher({
  appId: '1574102',
  key: '181714b03f5aa4d3cb65',
  secret: 'e6e8063b06fa1804c0d9',
  cluster: 'ap2',
}); 

export default function socketStart(req, res) {
  try {
    console.log('socket begin start');
    if (req.method === 'POST') {
      const data = req.body;
      pusher.trigger('my-channel', 'my-event', data)
      return res.status(200).json('Socket connected');
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch(err) {
    console.log(err);
  }
};