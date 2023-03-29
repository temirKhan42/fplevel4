import React from 'react';
import { useSelector } from 'react-redux';
import Channels from '../components/Channels';
import Messages from '../components/Messages';

const Home = () => {
  const isAnyModalOpen = useSelector((state) => state.ui.isAnyModalOpen);

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
