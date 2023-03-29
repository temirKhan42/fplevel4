import React from 'react';
import Head from 'next/head';
import PrivateRoute from '../components/PrivateRoute';
import '../utils/i18n';
import Pusher from 'pusher-js';

const Home = () => {
  const pusher = new Pusher('181714b03f5aa4d3cb65', {
    cluster: 'ap2',
  });
  const channel = pusher.subscribe('message');
  channel.bind('add-message', function(data) {
    console.log('Message that need to add is - ', data);
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PrivateRoute></PrivateRoute>
      </main>
    </>
  );
};

export default Home;