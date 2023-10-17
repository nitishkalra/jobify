import React from 'react';
import {Form, Link, redirect, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import {toast} from 'react-toastify';
import customFetch from '../utils/customFetch.js';
import errorHandlerMiddleware from '../../../middleware/errorHandlerMiddleware';

export const action = async ({request}) => {
  
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch(error){
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: 'alice.smith@example.com',
      password: 'password123'
    }
    try {
      await customFetch.post('/auth/login', data);
      toast.success('Feel free to go through the website');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  }

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" id="email" labelText="Email"  />
        <FormRow type="password" name="password" id="password" labelText="Password" />
        <SubmitBtn />
        <button type="button" className='btn btn-block' onClick={loginDemoUser} >Explore the App</button>
        <p>
          Not a member yet ?
            <Link to="/register" className="member-btn">Register</Link>
        </p>
      </Form>
  </Wrapper>
  )
}

export default Login
