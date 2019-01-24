import React from 'react';
import Link from 'next/link';
import { container, btn } from '../styles/components/please-login.css';

const PleaseLogin = () => (
  <div className={container}>
    <h3>Please Login</h3>
    <p>Login to comment, vote, & post stories on Producer Forum.</p>
    <Link href="/login">
      <a className={btn}>Login</a>
    </Link>
  </div>
);

export default PleaseLogin;