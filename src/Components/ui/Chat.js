import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import timeAgo from '../../helpers/timeAgo';
import { getChat, setMessageIndicator } from '../../slices/chatSlice';


const Chat = ({ to: friend1, for: friend2, listFriends}) => {

  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.session.uid);
  const {currentChat,messageIndicator} = useSelector((state)=>state.chat);
  const [friend, setFriend] = useState({});

  const handleCurrentChat = (friendUID) => {
    dispatch(getChat(friendUID,15));
    window.screen.width <= 768 && listFriends.current.classList.add('-translate-x-full');
    const messageIndicatorArray = messageIndicator.filter(el => el !== friendUID);
    dispatch(setMessageIndicator(messageIndicatorArray));
  }

  useEffect(() => {

    if (friend1._id === uid) {
      setFriend(friend2);
    }

    if (friend2._id === uid) {
      setFriend(friend1);
    }

  }, [friend1, friend2, uid]);


  return (
    <div onClick={() => handleCurrentChat(friend._id)} className="border p-4 flex justify-between cursor-pointer transition-colors hover:bg-slate-100">
      <div className="flex justify-center items-center">
        <img className="rounded-full  mr-3" src={friend.image} alt="profilePhoto" width="40" height="40" />
      </div>
      <div className="flex-1 flex-col justify-start">
        <p className="text-slate-700">{friend.username}</p>
        {
          friend.online ?
          <span className="text-green-600">online</span> :
          <span className="text-slate-400 text-sm">{timeAgo(friend.lastConnection)}</span>
        }
      </div>
      <div className="flex items-center">
        {
          messageIndicator.includes(friend._id) && currentChat?.friend?.uid !== friend._id ?
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span> : false
        }
      </div>
    </div >
  );
};

export default Chat;
