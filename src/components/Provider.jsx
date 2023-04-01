import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import authContext from '../utils/context/index';
import '../utils/i18n';
import { useRouter } from 'next/router';
import Nav from './Nav';
import Socket from '../utils/Socket';

import {
  addChannel,
  removeChannel,
  renameChannel,
  addMessage,
} from '../store/slices/chatSlice';

const MyProvider = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!userId);
  const [socket, setSocket] = useState(null);

  useLayoutEffect(() => {
    console.log('Provider rendered!!!');
    const id = localStorage.getItem('userId');
    setLoggedIn(!!id);
    setUserId(id);
    if (!socket) {
      console.log('Socket initiated!!');
      const socket = new Socket();
      setSocket(socket);
    }
    if (!id) {
      router.push('/login');
    }
  }, [])

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    console.log("Logout initiated!!!");
    localStorage.removeItem('userId');
    setLoggedIn(false);
    setSocket(null);
  };

  // const { t } = useTranslation();
  // const notifyChannelCreated = () => toast.success(t('notes.channel created'));
  // const notifyChannelRenamed = () => toast.success(t('notes.channel renamed'));
  // const notifyChannelRemoved = () => toast.success(t('notes.channel removed'));

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

  return true ? (
    <authContext.Provider value={{ loggedIn, logIn, logOut, socket }} >
      <div className="d-flex flex-column h-100">
        <Nav />
        {children}
      </div>
      <ToastContainer />
    </authContext.Provider>
  ) : null;
}

export default MyProvider;
