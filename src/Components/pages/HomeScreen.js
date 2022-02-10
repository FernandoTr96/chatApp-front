import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { socketContext } from '../providers/SocketProvider';
import Chat from '../ui/Chat';
import CurrentChat from '../ui/CurrentChat';
import NoChat from '../ui/NoChat';
import Profile from '../ui/Profile';
import { setMessageIndicator, setMessageReceived } from '../../slices/chatSlice';
const audio = new Audio();


const HomeScreen = () => {

  const isChatActive = useSelector((state)=>state.ui.chatActive);

  const dispatch = useDispatch();
  const {messageReceived,messageIndicator} = useSelector((state)=>state.chat);

  const {socket} = useContext(socketContext);
  const [friends,setFriends] = useState([]);
  const listFriends = useRef();

  useEffect(() => {
    
    socket.on('getFriends',(friends)=>{
      setFriends(friends);
    });
    
    return () => socket.off('getFriends');
    
  }, [socket]);

  useEffect(() => {

    socket.emit('loadFriends', null);
    
  }, [socket]);

  useEffect(() => {

    socket.on('reloadFriendList',()=>{
      socket.emit('loadFriends', null);
    })

    return () => socket.off('reloadFriendList');

  }, [socket]);


  useEffect(() => {
  
    socket?.on('messageReceived',(to)=>{
      dispatch(setMessageReceived(true));
      const UID_array = [...messageIndicator,to];
      dispatch(setMessageIndicator(UID_array));
    })
  
    return () => socket?.off('messageReceived');

  }, [socket,dispatch,messageIndicator])

  useEffect(() => {
  
    if(messageReceived){
      audio.src = "./assets/msn_messenger.mp3";
      audio.play();
      dispatch(setMessageReceived(false));
    }
    
  }, [socket,dispatch,messageReceived])


  return (
    <div className="h-screen flex justify-between overflow-hidden">
      <aside ref={listFriends} className="absolute z-10 top-0 left-0 right-0 bottom-0 h-screen transition-transform bg-white md:w-1/3 md:static">
        <Profile/>
        <div className="w-full h-full overflow-y-scroll">
          {
            friends.map((chat,index) => <Chat  key={index} listFriends={listFriends} {...chat}/>)
          }
        </div>
      </aside>
      <main className="flex-1">
        {
          isChatActive ?
          <CurrentChat listFriends={listFriends} /> :
          <NoChat/>
        }
      </main>
    </div>
  );
};

export default HomeScreen;
