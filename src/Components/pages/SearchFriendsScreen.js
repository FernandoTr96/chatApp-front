import React, { useContext, useState } from 'react';
import { chatAppToken } from '../../helpers/axiosInstance';
import Profile from '../ui/Profile';
import {useFormik} from 'formik';
import {faUserPlus,faUserTimes,faChevronLeft,faChevronRight,faUserCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useSelector} from 'react-redux';
import { socketContext } from '../providers/SocketProvider';


const SearchFriendsScreen = () => {

  const toUID = useSelector((state)=>state.auth.session.uid);
  const [search, setSearch] = useState({});
  const {socket} = useContext(socketContext);

  const handleSearchUser = async ({search})=>{
    if(!search) return;
    try {
      const res = await chatAppToken.get(`/user/search?q=${search}&page=1`);
      const json = res.data;
      if(json.ok){
        delete json.ok;
        setSearch(json);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handlePagination = async (page)=>{
    try {
      const res = await chatAppToken.get(`/user/search?q=${search.q}&page=${page}`);
      const json = res.data;
      if(json.ok){
        delete json.ok;
        setSearch(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const hanldeSendFriendRequest = async (forUID)=>{
    socket.emit('sendFriendReq',{toUID,forUID});
    handlePagination();
  }

  const handleCancelFriendRequest = async (forUID)=>{
    socket.emit('cancelFriendReq',{toUID,forUID});
    handlePagination();
  }

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    onSubmit: handleSearchUser
  });

  return(
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center">
        <Profile 
          bellModalCss='-left-96'
          menuModalCss='-left-44'
        />
      </div>
      <div className="w-1/2 mt-16">
        <form onSubmit={formik.handleSubmit}>
          <input onChange={formik.handleChange} value={formik.values.search} type="search" className="w-full outline-none p-3 rounded border" name="search" placeholder="🔍 search people" />
        </form>
        <div className="w-full mt-5">
          {
            search.users?.length > 0 &&
              search.users.map((user)=>{
                return (
                  <div key={user.uid} className="w-full p-3 mt-3 border rounded-sm flex justify-between items-center bg-slate-50">
                    <div className="flex items-center">
                      <img className="rounded-full border-2" src={user.image} alt="profile" width="40" height="40" />
                      <p className="ml-3 font-medium text-slate-500">{user.username}</p>
                    </div>
                    {
                      user.friendRequests.includes(`${toUID}@pending`) &&
                      <button onClick={()=> handleCancelFriendRequest(user.uid)} className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded" title="cancel friend request" >
                        <FontAwesomeIcon icon={faUserTimes} />
                      </button>                    
                    }
                    {
                      !user.friendRequests.includes(`${toUID}@pending`) && !user.friendRequests.includes(`${toUID}@accepted`) ?
                      <button onClick={()=> hanldeSendFriendRequest(user.uid)} data-uid={user.uid} className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded" title="send friend request">
                        <FontAwesomeIcon icon={faUserPlus} />
                      </button> : false
                    }
                    {
                      user.friendRequests.includes(`${toUID}@accepted`) && 
                      <button className="bg-indigo-600 text-white text-sm py-1 px-3 rounded" title="friend added">
                        <FontAwesomeIcon icon={faUserCheck} />
                      </button>
                    }
                  </div>
                )
              }) 
          }
          {
            !search.users && <img className="mx-auto" src="https://media2.giphy.com/media/AS1QYqISiXDiwLtPg3/200w.webp?cid=ecf05e47anlxw4u7oos03g028ce208f5hpw1umscwgogqtci&rid=200w.webp&ct=s" alt="Search" width="100" height="100"/>
          }
          {
            search.users?.length === 0 && <p className="text-center text-slate-400">not found results for "{search.q}"</p>
          }
        </div>
 
        {
          search.users?.length > 0 &&
          <div className="mt-8">
            <button onClick={()=> handlePagination(search.previous)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded" title="previous" >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button> 
            <span className="px-5">{search.actualRegister} / {search.totalRegisters}</span>
            <button onClick={()=> handlePagination(search.next)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded" title="next">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        }

      </div>
    </div>
  )
};

export default SearchFriendsScreen;
