import React, { Component } from 'react';
import { connect } from 'react-redux';
import PleaseLogin from '../components/please-login';
import { startAddComment } from '../actions/comment';
import { btnBlue, textarea } from '../styles/styles.css';
import { container } from '../styles/components/comment-form.css';

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      storyId: '',
      date: '',
      comment: '',
    }
  }

  onTextareaChange = e => {
    const comment = e.target.value;
    this.setState({ comment });
  }

  submitComment = () => {
    const { startAddComment, username, id } = this.props;
    const { comment } = this.state;

    const date = Date.now().toString();

    const newComment = {
      username: username,
      storyId: id,
      date: date,
      comment: comment
    };

    startAddComment(newComment);
  }

  render() {
    const { authenticated } = this.props;

    return (
      <div>
        {
          authenticated ? (
            <div className={container}>
              <header>
                <span>Comment</span>
              </header>
              <form onSubmit={this.submitComment}>
                <textarea
                  className={textarea}
                  placeholder='Enter your comment...Be chill please...'
                  onChange={this.onTextareaChange}
                >
                </textarea>
                <button className={btnBlue}>Submit</button>
              </form>
            </div>
          ) : (
              <div className={container}>
                <PleaseLogin />
              </div>)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.users.authenticated,
  username: state.users.username
});

const mapDispatchToProps = dispatch => ({
  startAddComment: comment => dispatch(startAddComment(comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);