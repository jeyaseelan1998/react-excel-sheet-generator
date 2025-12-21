import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/storage';

const Protected = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!getCookie()) {
      navigate('/guest/login', { replace: true });
    }
  }, [])

  return (
    <>
      <Outlet />
    </>
  )
}

export default Protected