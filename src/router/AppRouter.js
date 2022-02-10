import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginScreen from '../Components/pages/LoginScreen';
import RegisterScreen from '../Components/pages/RegisterScreen';
import { refreshToken } from '../slices/authSlice';
import DashboardRoutes from './DashboardRoutes';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {

  const {checking} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);


  if(checking){
    return(
      <div className="w-full h-screen flex justify-center items-center bg-slate-100">
        <h1 className="text-gray-600 text-2xl">checking your account info...</h1>
        <div className=" flex justify-center items-center ml-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 mr-3 border-indigo-800"></div>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login'    element={<PublicRoute><LoginScreen/></PublicRoute>} />
            <Route path='/register' element={<PublicRoute><RegisterScreen/></PublicRoute>} />
            <Route path='/*'        element={<PrivateRoute><DashboardRoutes/></PrivateRoute>} />
        </Routes>
    </BrowserRouter>
  )
};

export default AppRouter;
