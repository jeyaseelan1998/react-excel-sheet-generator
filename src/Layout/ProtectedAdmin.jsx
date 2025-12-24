import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { deleteCookie, getCookie } from '../utils/storage';
import Header from './Header';
import { toast } from 'react-toastify';
import { get, isEmpty } from 'lodash';
import api from '../api/v1';
import { Center, Spinner, Text } from '../components';
import HeaderSpacer from './Header/HeaderSpacer';
import { BiErrorAlt } from "../components/Icons.js";

const ProtectedAdmin = () => {

  const [user, setUser] = useState({});
  const [error, setError] = useState(false);

  const getProfile = async () => {
    const token = getCookie('token');
    if (!token) {
      window.location.href = '/guest/login';
    }
    try {
      const response = await api.post("/profile", {
        token
      });

      if (import.meta.env.VITE_APP_SUPER_ADMIN !== get(response, "data.data.role")) {
        setError("You do not have permission to access this page");
      } else {
        setUser(get(response, "data.data"));
        setError(false);
      }

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
        isEmpty(user) && !error && (
          <div className='profile-loading'>
            <Spinner />
          </div>
        )
      }
      {
        error && (
          <Center>
            <div className='text-center fs-5 pt-5'>
              <BiErrorAlt size={52} />
              <Text className="h3 text-center pt-2">{error}</Text>
            </div>
          </Center>
        )
      }
      {
        !isEmpty(user) && !error && (
          <Outlet context={{ user }} />
        )
      }
    </>
  )
}

export default ProtectedAdmin