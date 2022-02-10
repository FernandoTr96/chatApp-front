import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PublicRoute = ({children}) => {
  const session = useSelector((state)=>state.auth.session);
  return session ? <Navigate to="/" /> : children;
};

export default PublicRoute;
