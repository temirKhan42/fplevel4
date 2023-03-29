import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import authContext from '../utils/context/index';
import '../utils/i18n';
import Pusher from 'pusher-js';
import axios from 'axios';
import Nav from './Nav';

import {
  addChannel,
  removeChannel,
  renameChannel,
  addMessage,
} from '../store/slices/chatSlice';
import routes from '../utils/routes';

const MyProvider = ({ children }) => {
  const pusher = new Pusher('181714b03f5aa4d3cb65', {
    cluster: 'ap2',
  });
  
  const channel = pusher.subscribe('my-channel');

  const connectSocket = async () => {
    try {
      const { data } = await axios.post(routes.socketStart(), {
        message: 'Hi from client',
      });
    } catch(err) {
      console.error('Socket failed');
    }
  };

  const dispatch = useDispatch();

  const [userId, setUserId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!userId);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (!socketConnected) {
      channel.bind('my-event', function(data) {
        console.log('Received event:', data?.message);
      });  
      const id = localStorage.getItem('userId');
      setUserId(id);
      setSocketConnected(true);
    }
  }, [userId])


  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const { t } = useTranslation();
  const notifyChannelCreated = () => toast.success(t('notes.channel created'));
  const notifyChannelRenamed = () => toast.success(t('notes.channel renamed'));
  const notifyChannelRemoved = () => toast.success(t('notes.channel removed'));

  // socket.on('connect', () => {
  //   console.log('Connected to server');
  // });

  // socket.on('newMessage', (newMessage) => {
  //   dispatch(addMessage(newMessage));
  // });

  // socket.on('newChannel', (channelWithId) => {
  //   dispatch(addChannel(channelWithId));
  //   notifyChannelCreated();
  // });

  // socket.on('removeChannel', ({ id }) => {
  //   dispatch(removeChannel(id));
  //   notifyChannelRemoved();
  // });

  // socket.on('renameChannel', (newChannel) => {
  //   dispatch(renameChannel(newChannel));
  //   notifyChannelRenamed();
  // });

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }} >
      <div className="d-flex flex-column h-100">
        <Nav />
        {children}
      </div>
      <ToastContainer />
    </authContext.Provider>
  )
}

export default MyProvider;