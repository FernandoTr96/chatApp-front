import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { socketContext } from '../providers/SocketProvider';

const FriendRequest = ({uid,username,image}) => {
  
  const forUID = useSelector((state)=>state.auth.session.uid);
  const {socket} = useContext(socketContext);

  const handleAcceptRequest = (toUID)=>{
    socket.emit('acceptFriendReq',{toUID,forUID});
  }

  const handleCancelFriendRequest = async (toUID)=>{
    socket.emit('cancelFriendReq',{toUID,forUID});
  }
  
  return (
    <div className="border p-2 flex justify-between cursor-pointer transition-colors hover:bg-slate-100">
    <div className="flex justify-center items-start">
      <img className="mr-3" src={image} alt="profile" width="45" height="45" />
    </div>
    <div className="flex-1 flex-col justify-start">
      <p>{username}</p>
      <div className="inline-flex mt-2">
        <button onClick={()=>handleAcceptRequest(uid)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-1 px-3 rounded">Accept</button>
        <button onClick={()=>handleCancelFriendRequest(uid)} className="ml-3 bg-slate-500 hover:bg-slate-600 text-white text-sm py-1 px-3 rounded">Cancel</button>
      </div>
    </div>
  </div>
  );
};

export default FriendRequest;
