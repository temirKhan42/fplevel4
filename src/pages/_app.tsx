import '../styles/application.scss';
import { injectStyle } from 'react-toastify/dist/inject-style.js';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from '../store/index';
import MyProvider from '../components/Provider';
import Socket from '../utils/Socket';

if (process.env.NODE_ENV !== 'production') {
  // localStorage.debug = 'chat:*';
}

// injectStyle();
export default function App({ Component, pageProps }: AppProps) {
  const rollbarConfig = {
    accessToken: 'cf96e5d807e5492fb9377e245ab7ebc3', // 'POST_CLIENT_ITEM_ACCESS_TOKEN'
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  const socket = new Socket();
  socket?.onAddMessage((data:any) => {
    console.log('Message that need to add is - ', data);
    // dispatch(addMessage(data));
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <MyProvider socket={socket}>
            <Component {...pageProps} />
          </MyProvider>        
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}
