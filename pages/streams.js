import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../src/components/nav';
import SubNav from '../src/components/sub-nav';
import Story from '../src/components/story';
import { handleNetworkError } from '../src/util/network-error';
import { container, main } from '../src/styles/styles.css';

class StreamsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/stories/streams')
      .then(res => this.setState({ stories: res.data }), error => handleNetworkError(error));
  }

  render() {
    const { stories } = this.state;

    return (
      <div>
        <Nav />
        <SubNav />
        <div className={container}>
          <main className={main}>
            {stories.map(story => (
              <Story
                {...story}
                key={story._id}
              />
            ))}
          </main>
        </div>
      </div>
    );
  }
}

export default StreamsPage;