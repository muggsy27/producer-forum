import React from 'react';
import Link from 'next/link';
import Search from './search';
import { connect } from 'react-redux';
import { nav } from '../styles/components/hamburger.css';

const Hamburger = ({ authenticated }) => {
  return (
    <nav className={nav}>
      <Link prefetch href={authenticated ? '/post' : '/login'}>
        <a>Post A Story</a>
      </Link>
      {authenticated ? (
        <Link prefetch href="/auth/logout">
          <a>Logout</a>
        </Link>
      ) : (
          <Link prefetch href="/login">
            <a>Login/Register</a>
          </Link>
        )}
      <Search />
    </nav>
  );
}

const mapStateToProps = state => ({
  authenticated: state.users.authenticated
})

export default connect(mapStateToProps, undefined)(Hamburger);