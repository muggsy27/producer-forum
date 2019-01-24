import React from 'react';
import Link from 'next/link';
import { btnBlue } from '../styles/styles.css'
import { container } from '../styles/components/login.css';

const Login = () => (
  <div className={container}>
    <img src={'/static/logo-black.svg'} alt="logo" />
    <h2>Login/Sign Up</h2>
    <p>Want to comment, vote on, save, & post stories on Producer Forum?<br />Please login or sign up with Google.</p>
    <Link href={'/auth/google'}>
      <a className={btnBlue}>Continue With Google</a>
    </Link>
  </div>
);

export default Login;