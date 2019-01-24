import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { handleNetworkError } from '../util/network-error';
import { startUpvote, startDownvote, startAddUpvote, startModifyUpvote, startAddDownvote, startModifyDownvote } from '../actions/vote';
import { container } from '../styles/components/votes.css';

class Votes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      votes: 0,
      upvoted: false,
      downvoted: false
    };
  }

  componentDidMount() {
    const { _id, user, authenticated } = this.props;

    if (_id) {
      axios.get(`http://localhost:3000/api/votes/${_id}`)
        .then(res => {
          const { votes } = res.data;
          this.setState({ votes });
        }, error => handleNetworkError(error))
        .then(() => {
          if (user && authenticated) {
            axios.get(`http://localhost:3000/api/users/${user}`)
              .then(res => {
                const { votes } = res.data;

                votes.find(vote => {
                  if (vote.storyId === _id) {
                    const { upvoted, downvoted } = vote;
                    this.setState({ upvoted, downvoted });
                  }
                });

              }, error => handleNetworkError(error));
          }

        })

    }

  }

  handleUpvote = () => {
    const { authenticated, startUpvote, startDownvote, startAddUpvote, startModifyUpvote, _id, user } = this.props;
    const { upvoted } = this.state;

    if (authenticated && upvoted === false) {
      this.setState({
        votes: this.state.votes + 1,
        upvoted: true,
        downvoted: false
      });

      axios.get(`http://localhost:3000/api/users/${user}`)
        .then(res => {
          const { votes } = res.data;
          const reduxData = { user, _id, upvoted: true, downvoted: false };

          if (votes.length > 0) {
            const story = votes.find(vote => vote.storyId === _id);
            story ? startModifyUpvote(reduxData) : startAddUpvote(reduxData);
          } else {
            startAddUpvote(reduxData)
          }

        }, error => handleNetworkError(error))

      startUpvote(_id);

    } else if (authenticated && upvoted === true) {
      this.setState({
        votes: this.state.votes - 1,
        upvoted: false,
        downvoted: false
      });

      const reduxData = { user, _id, upvoted: false, downvoted: false };

      startDownvote(_id);
      startModifyUpvote(reduxData);

    } else {
      Router.push('/login');
    }

  }

  handleDownvote = () => {
    const { authenticated, startDownvote, startUpvote, startAddDownvote, startModifyDownvote, _id, user } = this.props;
    const { downvoted } = this.state;

    if (authenticated & downvoted === false) {
      this.setState({
        votes: this.state.votes - 1,
        upvoted: false,
        downvoted: true
      });

      axios.get(`http://localhost:3000/api/users/${user}`)
        .then(res => {
          const { votes } = res.data;
          const reduxData = { user, _id, upvoted: false, downvoted: true };

          if (votes.length > 0) {
            const story = votes.find(vote => vote.storyId === _id);
            story ? startModifyDownvote(reduxData) : startAddDownvote(reduxData)
          } else {
            startAddDownvote(reduxData);
          }

        }, error => handleNetworkError(error))

      startDownvote(_id);

    } else if (authenticated && downvoted === true) {
      const reduxData = { user, _id, upvoted: false, downvoted: false };

      this.setState({
        votes: this.state.votes + 1,
        upvoted: false,
        downvoted: false
      });

      startUpvote(_id);
      startModifyDownvote(reduxData);

    } else {
      Router.push('/login');
    }
  }

  render() {
    const { votes, upvoted, downvoted } = this.state;

    return (
      <div className={container}>
        <img
          onClick={this.handleUpvote}
          src={upvoted ? '/static/upvote-blue.svg' : '/static/upvote.svg'}
          alt="upvote icon"
        />
        <p>{votes >= 0 ? votes : 0}</p>
        <img
          onClick={this.handleDownvote}
          src={downvoted ? '/static/downvote-blue.svg' : '/static/downvote.svg'}
          alt="downvote icon"
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.users.authenticated,
  user: state.users._id,
  story: state.story
});

const mapDispatchToProps = dispatch => ({
  startUpvote: id => dispatch(startUpvote(id)),
  startAddUpvote: reduxData => dispatch(startAddUpvote(reduxData)),
  startModifyUpvote: reduxData => dispatch(startModifyUpvote(reduxData)),
  startDownvote: id => dispatch(startDownvote(id)),
  startAddDownvote: reduxData => dispatch(startAddDownvote(reduxData)),
  startModifyDownvote: reduxData => dispatch(startModifyDownvote(reduxData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Votes);