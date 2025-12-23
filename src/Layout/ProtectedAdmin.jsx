import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { deleteCookie, getCookie } from '../utils/storage';
import Header from './Header';
import { toast } from 'react-toastify';
import { get, isEmpty } from 'lodash';
import api from '../api/v1';
import { Spinner } from '../components';

const ProtectedAdmin = () => {

  const [user, setUser] = useState({});

  const getProfile = async () => {
    try {
      const response = await api.post("/profile", {
        token: getCookie('token')
      });
      setUser(get(response, "data.data"));
    } catch (error) {
      deleteCookie();
      toast.error(get(error, "response.data.message") || error.message);
      setTimeout(() => {
        window.location.href = '/guest/login';
      }, 5000)
    }
  }

  useEffect(() => {
    getProfile();
  }, [])

  return (
    <>
      <Header />
      {
        isEmpty(user) && (
          <div className='profile-loading'>
            <Spinner />
          </div>
        )
      }
      {
        !isEmpty(user) && (
          <Outlet context={{ user }} />
        )
      }
    </>
  )
}

export default ProtectedAdmin