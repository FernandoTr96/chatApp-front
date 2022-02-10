import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Emoji from './Emoji';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle,faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Message from './Message';
import { socketContext } from '../providers/SocketProvider';
import { getChat } from '../../slices/chatSlice';


const CurrentChat = ({listFriends}) => {
  
  const dispatch = useDispatch();
  const {friend,messages} = useSelector((state)=>state.chat.currentChat);
  const {uid} = useSelector((state)=>state.auth.session);

  const {socket} = useContext(socketContext);
  const [isWritting,setIsWritting] = useState(false);

  const input = useRef();
  const chat = useRef();
  const chatRegisters = useRef(15);

  const handleSendMessage = (e)=>{
    
    if(e.code === 'Enter'){
      e.preventDefault();
      const message = e.target.textContent;
      if(message.length > 0){
        const payload = {
          message,
          to: uid,
          for: friend.uid
        };
        socket.emit('sendMessage',payload);
        e.target.textContent = null;
      }
    }

    socket.emit('writting',{
      writting: true,
      to: uid,
      for: friend.uid
    });

  }

  const hanldeKeyUp = ()=> {
    socket.emit('writting',{
      writting: false,
      to: uid,
      for: friend.uid
    });
  }

  const handleGoBack = ()=> {
    listFriends.current.classList.remove('-translate-x-full');
  }

  const infiniteScroll = ({target})=>{
    if(target.scrollTop === 0){
      chatRegisters.current += 5;
      dispatch(getChat(friend.uid,chatRegisters.current));
      // chat.current.scrollTop = 8;
    }
  }

  useEffect(()=>{
    
    socket.on('isWritting',(isWritting)=>{
      setIsWritting(isWritting);
    })

    return ()=> socket.off('isWritting');

  },[socket])

  useEffect(() => {
    
    if(friend.uid){
      socket.on('reloadCurrentChat',()=>{
        dispatch(getChat(friend.uid,chatRegisters.current));
      })
    }

    return ()=> socket.off('reloadCurrentChat');

  }, [socket,dispatch,friend]);

  useEffect(() => {
    chat.current.scrollTop = chat.current.scrollHeight;
  }, [messages]);
  

  return (
    <div className="w-full h-screen flex flex-col">

      <div className="w-full py-3 px-3 flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-800">
        <div className="flex items-center justify-between w-full">
          <div className="w-10 h-10 relative inline-flex">
            <img className="w-full h-full object-cover rounded-full" src={friend.image} alt="profile" />
            <FontAwesomeIcon className={friend.online ? "absolute -bottom-1 right-1 top-6 text-xs text-green-500 border-2 rounded-full border-blue-700" : "hidden"} icon={faCircle} />
            <div>
                <p className="ml-3 font-medium w-full text-slate-100">{friend.username}</p>
                { 
                  isWritting ?
                    <p className="ml-3 text-slate-300 text-xs w-full flex">is writing <img className="ml-3" src="https://samherbert.net/svg-loaders/svg-loaders/three-dots.svg" alt="loader" width="20" height="20"/></p>
                  :
                    friend.online ? 
                    <p className="ml-3 text-slate-300 text-xs w-full">active now</p> :
                    <p className="ml-3 text-slate-300 text-xs w-full">offline</p>
                }
            </div>
          </div>
          <div>
            <FontAwesomeIcon onClick={handleGoBack} className="lg:hidden transition-colors text-lg text-slate-50 hover:text-slate-200" icon={faArrowLeft} />
          </div>
        </div>
      </div>

      <div onScroll={infiniteScroll} ref={chat} className="flex-1 p-5 overflow-hidden overflow-y-scroll to-slate-100">
        {
          !messages.length ?
          <p className="text-center text-slate-300">start a conversation !!  ✨</p> :
          messages.map((message) => <Message key={message.id} {...message} />)
        }
      </div>

      <div className="p-2 flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-800">
        <div onKeyPress={handleSendMessage} onKeyUp={hanldeKeyUp} ref={input} contentEditable="true" className="max-w-5xl outline-none border rounded-md py-1 px-3 flex-1 bg-zinc-50"></div>
        <Emoji input={input} />
      </div>

    </div>
  )
};

export default CurrentChat;
