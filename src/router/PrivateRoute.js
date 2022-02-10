import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';


const PrivateRoute = ({children}) => {
  const session = useSelector((state)=>state.auth.session);
  return session ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
