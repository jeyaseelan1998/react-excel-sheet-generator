import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { getCookie } from '../utils/storage';
import Header from './Header';

const ProtectedAdmin = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!getCookie()) {
      navigate('/guest/login', { replace: true });
    }
  }, [])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default ProtectedAdmin