import React from 'react'
import {Form, Link, redirect} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch.js';
import {toast} from 'react-toastify';
// email: "nitish@gmail.com"
// lastName: "kalra"
// location: "earth"
// name: "nitish"
// password: "abc123"
// admin credentials
export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch(error){
    toast.error(error?.response?.data?.msg);
    console.log(error?.response?.data?.msg);
    return error;
  }
  
}

const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" id="name" labelText="name" />
        <FormRow type="text" name="lastName" id="lastName" labelText="Last Name" />
        <FormRow type="text" name="location" id="location" labelText="Location" />
        <FormRow type="email" name="email" id="email" labelText="Email" />
        <FormRow type="password" name="password" id="password" labelText="Password" />
        <SubmitBtn />
        <p>Already a member ?
          <Link to="/login" className='member-btn'>Login</Link>  
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register
