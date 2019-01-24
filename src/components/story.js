import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { distanceInWords } from 'date-fns';
import Votes from '../components/votes';
import Save from '../components/save';
import { handleNetworkError } from '../util/network-error';
import { container, circle, circlePink, circleBlue, circleOrange, circlePurple, circleGreen, circleIndigo } from '../styles/components/story.css';

class Story extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    const { _id } = this.props;

    if (_id) {
      axios.get(`http://localhost:3000/api/comments/${_id}`)
        .then(res => this.setState({ comments: res.data }),
          error => handleNetworkError(error));
    }

  }

  render() {
    const { _id, title, link, category, username, date } = this.props;
    const { comments } = this.state;

    let className;

    switch (category) {
      case 'Project':
        className = circlePink;
        break;
      case 'Presets':
        className = circleBlue;
        break;
      case 'Midi':
        className = circleOrange;
        break;
      case 'Ask':
        className = circleGreen;
        break;
      case 'Show':
        className = circlePurple;
        break;
      case 'Stream':
        className = circleIndigo;
        break;
      default:
        className = circle;
    }

    return (
      <div className={container} key={_id}>
        <div className={className}>
          <span>{category}</span>
        </div>
        <Votes _id={_id} />
        <Link href={`/stories/${_id}`}>
          <a>
            <h1>{link ? <Link><a>{link}</a></Link> : title}</h1>
            <span>{`${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`}</span>
            <span>●</span>
            <span>{`${distanceInWords(new Date(parseInt(date)), new Date)} ago by `} {username}</span>
          </a>
        </Link>
        <Save _id={_id} />
      </div>
    );
  }
}

export default Story;