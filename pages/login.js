import React from 'react';
import Nav from '../src/components/nav';
import SubNav from '../src/components/sub-nav'
import Login from '../src/components/login';
import { container } from '../src/styles/styles.css'

const LoginPage = () => (
  <div>
    <Nav />
    <SubNav />
    <div className={container}>
      <Login />
    </div>
  </div>
);

export default LoginPage;