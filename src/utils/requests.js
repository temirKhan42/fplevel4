import axios from "axios";
import routes from './routes';

export async function addMessage(message) {
  try {
    const { data } = await axios.post(routes['message'](), message);
  } catch(err) {
    console.error('Add message failed');
  }
};

export async function addChannel(channel) {
  try {
    const { data } = await axios.post(routes['channel'](), {
      channel,
    });
  } catch(err) {
    console.error('Add channel failed');
  }
};

export async function removeChannel(channelId) {
  try {
    const { data } = await axios.delete(routes['channel'](), {
      channelId,
    });
  } catch(err) {
    console.error('Remove channel failed');
  }
};

export async function renameChannel({ id, name}) {
  try {
    const { data } = await axios.put(routes['channel'](), {
      id,
      name
    });
  } catch(err) {
    console.error('Rename channel failed');
  }
};
