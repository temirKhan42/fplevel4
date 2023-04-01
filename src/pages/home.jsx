import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import useAuth from '../utils/hooks';
import { addMessage, addChannel, renameChannel, removeChannel } from '../store/slices/chatSlice';


const Home = () => {
  const isAnyModalOpen = useSelector((state) => state.ui.isAnyModalOpen);
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Home rendered');
    auth.socket?.onAddMessage((data) => {
      console.log('Message that need to add is - ', data);
      dispatch(addMessage(data));
    });

    auth.socket?.onAddChannel((data) => {
      console.log('Channel that need to add is - ', data)
      dispatch(addChannel(data));
    });

    auth.socket?.onRenameChannel((data) => {
      console.log('Channel that need to rename is - ', data);
      dispatch(renameChannel(data));
    });

    auth.socket?.onRemoveChannel((data) => {
      console.log('Channel id that need to remove is - ', data?.id);
      dispatch(removeChannel(parseInt(data?.id)));
    });

    return () => {
      auth.socket?.unBinedMessage();
      auth.socket?.unBinedChannel();
    };
  });

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