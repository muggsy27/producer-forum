import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { container, list, dropdown, circle, orange, pink, blue, green, purple, indigo } from '../styles/components/sub-nav.css';
import { active } from '../styles/components/nav.css';

class SubNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: false,
      saved: false
    };
  }

  componentDidMount() {
    const pathname = window.location.pathname;

    switch (pathname) {
      case '/':
        this.setState({ home: true });
        break;
      case '/saved':
        this.setState({ saved: true });
        break;
      default:
        break;
    }
  }

  render() {
    const { authenticated } = this.props;
    const { home, saved } = this.state;

    return (
      <div className={container}>
        <ul className={list}>
          <Link
            prefetch
            href="/"
          >
            <a className={home ? active : null}>
              <li>Recent</li>
            </a>
          </Link>
          <Link
            prefetch
            href={authenticated ? '/saved' : '/login'}
          >
            <a className={saved ? active : null}>
              <li>Saved</li>
            </a>
          </Link>
          <li className={dropdown}>Categories ▾
          <ul>
              <li className={circle}>Tutorials</li>
              <li className={orange}>Midi</li>
              <li className={pink}>Project</li>
              <li className={blue}>Presets</li>
              <li className={green}>Ask</li>
              <li className={purple}>Show</li>
              <li className={indigo}>Streams</li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.users.authenticated
});

export default connect(mapStateToProps, undefined)(SubNav);


/* TODO:
- Nested nav for categories
- Save current state for Recent and saved
*/