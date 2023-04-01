import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import routes from '../../utils/routes';

const notify = () => toast.error('Ошибка соединения');

async function fetchData(token) {
  try {
    const response = await axios({
      method: 'get',
      url: routes.dataPath(),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (err) {
    if (err.response.status === 500) {
      notify();
    }
    throw err;
  }
}

const defaultChannelId = 1;

const initialState = {
  channels: [], // [{ id: 1, name: '', removable: true }, {}, {}]
  currentChannelId: 1,
  messages: [], // [{ channelId: 1, id: 1, userName: '', text: '' }, {}, {}]
};

export const fetchChannels = createAsyncThunk(
  'channels/fetchStatus',
  async () => {
    const userId = localStorage.getItem('userId');
    const { token } = JSON.parse(userId);
    const response = await fetchData(token);
    return response.data;
  },
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => ({
      ...state,
      currentChannelId: parseInt(action.payload),
    }),
    addChannel: (state, action) => ({
      ...state,
      channels: [...state.channels, { ...action.payload, id: parseInt(action.payload?.id)}],
      currentChannelId: parseInt(action.payload.id),
    }),
    renameChannel: (state, action) => {
      const newChannel = { ...action.payload, id: parseInt(action.payload?.id)};
      const newChannels = state.channels.map((channel) => {
        if (parseInt(channel.id) === newChannel.id) {
          return newChannel;
        }
        return channel;
      });

      return {
        ...state,
        channels: newChannels,
      };
    },
    removeChannel: (state, action) => {
      const removingId = parseInt(action.payload);

      const currentChannelId = removingId === state.currentChannelId
        ? defaultChannelId
        : state.currentChannelId;

      const newChannels = state.channels
        .filter(({ id }) => parseInt(id) !== removingId);

      const newMessages = state.messages
        .filter(({ channelId }) => parseInt(channelId) !== removingId);

      return {
        channels: newChannels,
        messages: newMessages,
        currentChannelId,
      };
    },
    addMessage: (state, action) => {
      return {
        ...state,
        messages: [...state.messages, { ...action.payload, id: parseInt(action.payload?.id) }],
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      const channels = action.payload.channels.map((chan) => {
        return {...chan, id: parseInt(chan?.id) };
      });
      const messages = action.payload.messages.map((mes) => {
        return { ...mes, id: parseInt(mes?.id) };
      })
      return {
        channels,
        currentChannelId: action.payload.currentChannelId,
        messages,
      }
    });
  },
});

export const {
  setCurrentChannel,
  addChannel,
  renameChannel,
  removeChannel,
  addMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
