import React, { Component } from 'react';
import axios from 'axios';
import { distanceInWords } from 'date-fns';
import { handleNetworkError } from '../util/network-error';
import { container, commentsContainer } from '../styles/components/comments.css';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    const { id } = this.props;

    if (id) {
      axios.get(`/api/comments/${id}`)
        .then(res => this.setState({ comments: res.data }),
          error => handleNetworkError(error));
    }
  }

  render() {
    const { comments } = this.state;

    return (
      <div className={container}>
        <header>
          <h3>{comments.length} {comments.length > 1 ? 'Comments' : 'Comment'}</h3>
        </header>
        {comments.map(comment => (
          <div
            className={commentsContainer}
            key={comment._id}
          >
            <p>{comment.username}, <span>{distanceInWords(new Date(parseInt(comment.date)), new Date)} ago</span></p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Comments;