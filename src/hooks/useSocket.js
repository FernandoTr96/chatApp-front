import {useCallback, useEffect, useState} from 'react';
import {io} from 'socket.io-client';

const useSocket = (urlServer) => {

  const [socket,setSocket] = useState(null);
  const [online, setOnline] = useState(false);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem('x-token-chatApp') || '';
    const socketInstance = io(urlServer,{
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query:{
        'x-token': token
      }
    });
    setSocket(socketInstance);
  }, [urlServer]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);
  
  useEffect(() => {
    socket?.on('connect', ()=>{
      setOnline(true);
    })
    return ()=> socket?.off('connect');
  }, [socket]);

  useEffect(() => {
    socket?.on('disconnect', ()=>{
      setOnline(false);
    })
    return ()=> socket?.off('disconnect');
  }, [socket]);
  
  return {
    socket,
    online,
    connectSocket,
    disconnectSocket
  }

};

export default useSocket;


