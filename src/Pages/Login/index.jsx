import React from 'react';
import { Center, Text } from '../../components';
import { login_img } from '../../components/Images';

import style from './style.module.css';

const Login = () => {

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    
  }


  return (
    <Center>
      <form className={style.loginWrapper} onSubmit={onSubmit}>
        <div className="card w-50">
          <div className='pt-3 px-3 text-center'>
            <img src={login_img} className={`card-img-top ${style.image}`} alt="Login" />
          </div>
          <div className="card-body">
            <Text className="card-title h1 text-center fs-1" breeSerif>Login</Text>
            <div className="mb-3">
              <label htmlFor="loginExampleFormControlInput1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="loginExampleFormControlInput1" placeholder="name@example.com" />
            </div>

            <div className="mb-3">
              <label htmlFor="loginInputPassword5" className="form-label">Password</label>
              <input type="password" id="loginInputPassword5" className="form-control" aria-describedby="loginPasswordHelpBlock" />
              <div id="loginPasswordHelpBlock" className="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
              </div>
            </div>

            <div className='text-center'>
              <button type='submit' className="btn btn-primary text-uppercase">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </Center>
  )
}

export default Login;