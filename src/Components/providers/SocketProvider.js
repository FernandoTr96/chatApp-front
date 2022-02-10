import { createContext, useEffect } from "react";
import useSocket from "../../hooks/useSocket";
import {useSelector} from 'react-redux';

export const socketContext = createContext();

export const SocketProvider = ({children}) => {

  const {session} = useSelector((state)=>state.auth);
  const {socket,online,connectSocket,disconnectSocket} = useSocket(process.env.REACT_APP_SOCKET_SERVER);

  useEffect(() => {
  
    if(session){
      connectSocket();
    }

  }, [session,connectSocket]);


  useEffect(() => {
  
    if(!session){
      disconnectSocket();
    }

  }, [session,disconnectSocket]);

  
  return(
    <socketContext.Provider value={{socket,online}}>
        {children}
    </socketContext.Provider>
  )
  
};
