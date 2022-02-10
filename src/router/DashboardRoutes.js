import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomeScreen from '../Components/pages/HomeScreen';
import ProfileScreen from '../Components/pages/ProfileScreen';
import SearchFriendsScreen from '../Components/pages/SearchFriendsScreen';

const DashboardRoutes = () => {

  return (
    <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/edit/profile' element={<ProfileScreen/>} />
        <Route path='/searchFriends' element={<SearchFriendsScreen/>} />
    </Routes>
  )
};

export default DashboardRoutes;
