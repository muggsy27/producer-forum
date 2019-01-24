import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import Search from './search';
import Hamburger from './hamburger';
import { container, list, btn, active, dropdown, menu, open1, open2, open3 } from '../styles/components/nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: false,
      tutorials: false,
      streams: false,
      resources: false,
      login: false,
      hamburger: false
    };
  }

  componentDidMount() {
    const pathname = window.location.pathname;

    switch (pathname) {
      case '/tutorials':
        this.setState({ tutorials: true });
        break;
      case '/streams':
        this.setState({ streams: true });
        break;
      case '/resources':
        this.setState({ resources: true });
        break;
      case '/login':
        this.setState({ login: true })
      default:
        break;
    }

  }

  handleSearch = () => this.setState(prevState => ({ search: !prevState.search }));

  handleMenu = () => this.setState(prevState => ({ hamburger: !prevState.hamburger }));

  render() {
    const { authenticated, username } = this.props;
    const { search, tutorials, streams, resources, login, hamburger } = this.state;

    return (
      <nav>
        <div className={container}>
          <ul className={list}>
            <Link prefetch href="/">
              <li>
                <img
                  src={'/static/logo.svg'}
                  alt="logo"
                />
              </li>
            </Link>
            <Link prefetch href="/tutorials">
              <li>
                <a className={tutorials ? active : null}>Tutorials</a>
              </li>
            </Link>
            <Link prefetch href="/streams">
              <li>
                <a className={streams ? active : null}>Streams</a>
              </li>
            </Link>
            <Link prefetch href="/resources">
              <li>
                <a className={resources ? active : null}>Resources</a>
              </li>
            </Link>
          </ul>
          <ul className={list}>
            {authenticated ? (
              <li className={dropdown}>{username} ▾
                  <ul>
                  <Link prefetch href="/saved">
                    <li>
                      <a>Saved</a>
                    </li>
                  </Link>
                  <Link prefetch href="/auth/logout">
                    <li>
                      <a>Logout</a>
                    </li>
                  </Link>
                </ul>
              </li>
            ) : (
                <Link prefetch href="/login">
                  <li>
                    <a className={login ? active : null}>Login/Register</a>
                  </li>
                </Link>
              )}
            <li>
              <img
                src={'/static/search.svg'}
                alt="search icon"
                onClick={this.handleSearch} />
            </li>
            <Link prefetch href={authenticated ? '/post' : '/login'}>
              <li>
                <a className={btn}>Post A Story</a>
              </li>
            </Link>
          </ul>
          <div
            className={menu}
            onClick={this.handleMenu}
          >
            <div className={hamburger ? open1 : null}></div>
            <div className={hamburger ? open2 : null}></div>
            <div className={hamburger ? open3 : null}></div>
          </div>
        </div>
        {search && <Search />}
        {hamburger && <Hamburger />}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.users.authenticated,
  username: state.users.username
});

export default connect(mapStateToProps, undefined)(Nav);