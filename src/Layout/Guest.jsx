import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '../utils/storage';

const Guest = () => {

  if (getCookie()) {
    return (
      <Navigate to='/' replace />
    )
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default Guest