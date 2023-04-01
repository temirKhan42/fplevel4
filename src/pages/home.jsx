import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import { addMessage, addChannel, renameChannel, removeChannel } from '../store/slices/chatSlice';
import Socket from '../utils/Socket';

const Home = () => {
  const isAnyModalOpen = useSelector((state) => state.ui.isAnyModalOpen);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const notifyChannelCreated = () => toast.success(t('notes.channel created'));
  const notifyChannelRenamed = () => toast.success(t('notes.channel renamed'));
  const notifyChannelRemoved = () => toast.success(t('notes.channel removed'));

  useEffect(() => {
    const newsocket = new Socket();
    console.log('Home rendered');
    setSocketBind(newsocket);

    return () => {
      newsocket?.unBinedMessage();
      newsocket?.unBinedChannel();
      newsocket?.unSubscribe();
    };
  }, []);

  const setSocketBind = (socket) => {
    socket?.onAddMessage((data) => {
      dispatch(addMessage(data));
    });

    socket?.onAddChannel((data) => {
      dispatch(addChannel(data));
      notifyChannelCreated();
    });

    socket?.onRenameChannel((data) => {
      dispatch(renameChannel(data));
      notifyChannelRenamed();
    });

    socket?.onRemoveChannel((data) => {
      dispatch(removeChannel(parseInt(data?.id)));
      notifyChannelRemoved();
    });
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row" aria-hidden={isAnyModalOpen}>
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default Home;