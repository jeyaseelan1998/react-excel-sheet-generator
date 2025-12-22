import React from 'react';
import { Center, Text } from '../../components';
import { login_img } from '../../components/Images';

import style from './style.module.css';
import MetaTag from '../../components/MetaTag';
import { Field, Form } from 'react-final-form';
import { required } from '../../utils/validate';
import api from '../../api/v1';

const Login = () => {

  const onSubmit = async (data) => {
    await api.post("/login", data);
    window.location.href = '/';
  }

  return (
    <>
      <MetaTag title="Login" />
      <Center>
        <Form
          initialValues={{
            email: "test@test.com",
            password: "Test2025"
          }}
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
                      <Field name="email" component="input" type='email' className="form-control" id="loginExampleFormControlInput1" required placeholder="name@example.com" validate={required} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="loginInputPassword5" className="form-label">Password</label>
                      <Field name="password" component="input" type='password' className="form-control" id="loginInputPassword5" required aria-describedby="loginPasswordHelpBlock" validate={required} />
                      <div id="loginPasswordHelpBlock" className="form-text">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                      </div>
                    </div>

                    <div className='text-center'>
                      <button type='submit' className="btn btn-primary text-uppercase" disabled={!valid}>Submit</button>
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