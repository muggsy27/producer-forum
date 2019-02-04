import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Router from 'next/router';
import { startSaveStory, startUnsaveStory } from '../actions/save';
import { handleNetworkError } from '../util/network-error';
import { container } from '../styles/components/save.css'

class Save extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saved: false
    };
  }

  componentDidMount() {
    const { _id, user } = this.props;

    if (user) {
      axios.get(`/api/users/${user}`)
        .then(res => {
          const { saved } = res.data;
          if (saved.includes(_id)) {
            this.setState({ saved: true })
          }
        }, error => handleNetworkError(error))
    }

  }

  componentDidUpdate(prevProps) {
    const { _id, user } = this.props;
    if (user !== prevProps.user) {
      axios.get(`/api/users/${user}`)
        .then(res => {
          const { saved } = res.data;
          if (saved.includes(_id)) {
            this.setState({ saved: true })
          }
        }, error => handleNetworkError(error))
    }
  }

  handleOnSave = () => {
    const { _id, authenticated, user, startSaveStory, startUnsaveStory } = this.props;
    const { saved } = this.state;
    const reduxData = { user, _id };

    if (authenticated && saved === false) {
      startSaveStory(reduxData);
      this.setState({ saved: true });
    } else if (authenticated && saved === true) {
      startUnsaveStory(reduxData);
      this.setState({ saved: false });
    } else {
      Router.push('/login');
    }

  }

  render() {
    const { saved } = this.state;
    return (
      <div className={container}>
        <img
          src={saved ? '/static/star-blue.svg' : '/static/star.svg'}
          alt="save story icon"
          onClick={this.handleOnSave}
        />
      </div>
    )
  }

}

const mapStateToProps = state => ({
  authenticated: state.users.authenticated,
  user: state.users._id
});

const mapDispatchToProps = dispatch => ({
  startSaveStory: _id => dispatch(startSaveStory(_id)),
  startUnsaveStory: _id => dispatch(startUnsaveStory(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Save);