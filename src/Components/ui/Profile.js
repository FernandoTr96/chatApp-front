import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faEllipsisV, faUser, faUserPlus, faSignOutAlt, faBell, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FriendRequest from './FriendRequest';
import { useSelector, useDispatch } from 'react-redux';
import { windowToggle, CloseAllWindowsExcept, closeAll } from '../../slices/uiSlice';
import { socketContext } from '../providers/SocketProvider';
import { purgeSession } from '../../slices/authSlice';
import { purgeCurrentChat } from '../../slices/chatSlice';
const audio = new Audio();


const Profile = ({bellModalCss='-left-96 top-10 md:-left-0 md:bottom-0',menuModalCss='right-5 top-10 md:-right-52'}) => {

    const [friendRequest, setFriendRequest] = useState([]);
    const [notification, setNotification] = useState(false);
    const { online, socket } = useContext(socketContext);
    const { FriendRequestWindow, OptionsWindow } = useSelector((state) => state.ui);

    const session = useSelector((state) => state.auth.session);
    const dispatch = useDispatch();

    const handleDropdownOptions = () => {
        dispatch(windowToggle('window3dots'));
        dispatch(CloseAllWindowsExcept('window3dots'));
    }

    const handleDropdownFriendRequest = () => {
        dispatch(windowToggle('windowBell'));
        dispatch(CloseAllWindowsExcept('windowBell'));
    }

    const handleLogout = ()=>{
        dispatch(purgeSession());
        dispatch(purgeCurrentChat());
        dispatch(closeAll());
    }

    useEffect(() => {
       
        socket.on('friendNotifications',(notifications)=>{
            setFriendRequest(notifications);
        })

        return ()=> socket.off('friendNotification');

    }, [socket]);

    useEffect(() => {
       
        socket.on('notificationRingtone',()=>{
            setNotification(true);
        })

        return ()=> socket.off('notificationRingtone');

    }, [socket]);

    useEffect(() => {
       
        if(notification){
            audio.src = "./assets/huawei-2022-notification.mp3";
            audio.play();
            setNotification(false);
        }

    }, [socket,notification]);



    return (
        <div className="w-full py-3 px-3 flex justify-between items-center bg-indigo-700">

            <Link to="/edit/profile" className="inline-flex items-center">
               <div className={online ? "rounded-full border-2 border-green-400 w-10 h-10" : "rounded-full border-2 border-red-400 w-11 h-11"}>
                    <img className="w-full h-full object-cover rounded-full" src={session.image} alt="profile" />
               </div>
                <p className="ml-3 font-medium text-slate-100">{session.username}</p>
            </Link>

            <div className="relative flex">

                <div onClick={handleDropdownFriendRequest} className="m-2 relative z-10 cursor-pointer" title="Friend requests">
                    <FontAwesomeIcon className="transition text-zinc-100 hover:text-zinc-300" icon={faBell} />
                    <span className="w-4 h-4 absolute -top-1 -left-2 rounded-md flex justify-center items-center text-xs font-semibold bg-red-500 text-zinc-100">
                        {friendRequest.length}
                    </span>
                    <div className={ FriendRequestWindow ? `w-96 h-96 ${bellModalCss} absolute rounded drop-shadow-md focus:outline-none bg-zinc-50 overflow-hidden overflow-y-scroll` : "hidden"}>
                        {
                            friendRequest.length === 0 ?
                            <p className="text-center mt-44 text-slate-300">no requests</p> :
                            friendRequest.map((request, index) => <FriendRequest key={index} {...request} />)
                        }
                    </div>
                </div>

                <div onClick={handleDropdownOptions} className="m-2 cursor-pointer" title="Account options">
                    <FontAwesomeIcon className="rotate-180 transition text-zinc-100 hover:text-zinc-300" icon={faEllipsisV} />
                    <div
                        className={
                            OptionsWindow ?
                                `w-52  absolute z-10 ${menuModalCss} rounded drop-shadow-md focus:outline-none bg-zinc-50` :
                                "hidden"
                        }
                    >
                        <Link to="/" className="block py-3 px-3 transition-all hover:text-gray-700 hover:bg-slate-200">
                            <FontAwesomeIcon className="text-gray-600" icon={faComment} /> Chat
                        </Link>
                        <Link to="/edit/profile" className="block py-3 px-3 transition-all hover:text-gray-700 hover:bg-slate-200">
                            <FontAwesomeIcon className="text-gray-600" icon={faUser} /> Profile
                        </Link>
                        <Link to="/searchFriends" className="block py-2 px-3 transition-colors hover:text-gray-700 hover:bg-slate-200">
                            <FontAwesomeIcon className="text-gray-600" icon={faUserPlus} /> Add friend
                        </Link>
                        <Link onClick={handleLogout} to="/#" className="block py-2 px-3 transition-colors hover:text-gray-700 hover:bg-slate-200">
                            <FontAwesomeIcon className="text-gray-600" icon={faSignOutAlt} /> Logout
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Profile;
