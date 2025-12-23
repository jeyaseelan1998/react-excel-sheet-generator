import { get } from 'lodash';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Center, Spinner, Text } from '../../components';
import { login_img } from '../../components/Images';

import api from '../../api/v1';
import MetaTag from '../../components/MetaTag';
import { Field, Form } from 'react-final-form';
import { required } from '../../utils/validate';
import { setCookie } from '../../utils/storage';

import style from './style.module.css';

const Login = () => {
  const [fetching, setFetching] = useState(false);

  const onSubmit = async (data) => {
    setFetching(true);
    try {
      const response = await api.post("/login", data);
      const token = get(response, 'data.token');
      if (token) {
        setCookie(token, 'token');
        window.location.href = '/';
      }
    } catch (error) {
      toast.error(get(error, 'response.data.message') || error.message);
    }
    setFetching(false);
  }

  return (
    <>
      <MetaTag title="Login" />
      <Center>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, valid }) => {
            return (
              <form className={style.loginWrapper} onSubmit={handleSubmit}>
                <div className="card">
                  <div className='pt-3 px-3 text-center'>
                    <img src={login_img} className={`card-img-top ${style.image}`} alt="Login" />
                  </div>
                  <div className="card-body">
                    <Text className="card-title h1 text-center fs-1" breeSerif>Login</Text>
                    <div className="mb-3">
                      <label htmlFor="loginExampleFormControlInput1" className="form-label">Email address</label>
                      <Field name="email" component="input" type='email' className="form-control" id="loginExampleFormControlInput1" required placeholder="name@example.com" validate={required} autoComplete="username" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="loginInputPassword5" className="form-label">Password</label>
                      <Field name="password" component="input" type='password' className="form-control" id="loginInputPassword5" required aria-describedby="loginPasswordHelpBlock" validate={required} autoComplete="current-password" />
                      {/* <div id="loginPasswordHelpBlock" className="form-text">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                      </div> */}
                    </div>

                    <div className='text-center pt-3'>
                      {
                        !fetching && (
                          <button type='submit' className="btn btn-primary text-uppercase w-25" disabled={!valid}>
                            Submit
                          </button>
                        )
                      }
                      {
                        fetching && (
                          <div className="btn btn-primary opacity-50 text-uppercase w-25 m-auto d-flex justify-content-center">
                            <Spinner />
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </form>
            )
          }}
        />
      </Center>
    </>
  )
}

export default Login;