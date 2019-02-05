import React, { Fragment } from 'react';
import Head from 'next/head'
import Nav from '../src/components/nav';
import SubNav from '../src/components/sub-nav'
import Login from '../src/components/login';
import { container } from '../src/styles/styles.css'

const LoginPage = () => (
  <Fragment>
    <Head>
      <title>Login Page</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
    </Head>
    <Nav />
    <SubNav />
    <div className={container}>
      <Login />
    </div>
  </Fragment>
);

export default LoginPage;