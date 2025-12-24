import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { deleteCookie, getCookie } from '../utils/storage';
import Header from './Header';
import { toast } from 'react-toastify';
import { get, isEmpty } from 'lodash';
import api from '../api/v1';
import { Spinner } from '../components';
import HeaderSpacer from './Header/HeaderSpacer';

const Protected = () => {

  const [user, setUser] = useState({});

  const getProfile = async () => {
    const token = getCookie('token');
    if (!token) {
      window.location.href = '/guest/login';
    }
    try {
      const response = await api.post("/profile", {
        token
      });
      setUser(get(response, "data.data"));
    } catch (error) {
      toast.error(get(error, "response.data.message") || error.message);
      if (get(error, "response.status") >= 400 && get(error, "response.status") <= 499) {
        deleteCookie();
        setTimeout(() => {
          window.location.href = '/guest/login';
        }, 5000)
      }
    }
  }

  useEffect(() => {
    getProfile();
  }, [])

  return (
    <>
      <Header user={user} />
      <HeaderSpacer />
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

export default Protected