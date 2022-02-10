import React from 'react';
import AppRouter from "./router/AppRouter";
import {Provider} from 'react-redux';
import store from './store/AppStore';
import { SocketProvider } from './Components/providers/SocketProvider';


const ChatApp = ()=>{
  return (
    <Provider store={store}>
      <SocketProvider>
        <AppRouter/>
      </SocketProvider>
    </Provider>
  );
}

export default ChatApp;
