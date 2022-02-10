import React from 'react';
import { useSelector } from 'react-redux';

const Message = ({id,to:friend1,message,createdAt}) => {
    
  const uid = useSelector((state)=>state.auth.session.uid);

  if(uid === friend1._id)
  {
    return (
        <div className="flex items-center justify-end mt-3">
           <div className="w-1/2 p-3 rounded-xl text-slate-50  bg-indigo-700 shadow-sm">
              <p className="break-all">{message}</p>
              <p className="text-slate-300 text-right text-xs">{new Date(createdAt).toLocaleDateString()} {new Date(createdAt).toLocaleTimeString()}</p>
           </div>
        </div>
    )
  }
  else
  {
    return (
        <div className="flex items-center justify-start mt-3">
           <div className="w-1/2 p-3 mt-3 rounded-xl text-slate-700 bg-slate-100 shadow-sm">
              <p className="break-all">{message}</p>
              <p className="text-slate-400 text-right text-xs">{new Date(createdAt).toLocaleDateString()} {new Date(createdAt).toLocaleTimeString()}</p>
           
           </div> 
        </div>
    )
  }
  
};

export default Message;
