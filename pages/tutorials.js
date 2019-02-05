import React, { Component, Fragment } from 'react';
import Head from 'next/head'
import axios from 'axios';
import Nav from '../src/components/nav';
import SubNav from '../src/components/sub-nav'
import Story from '../src/components/story';
import { handleNetworkError } from '../src/util/network-error';
import { container, main } from '../src/styles/styles.css';

class TutorialsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    axios.get('/api/stories/tutorials')
      .then(res => this.setState({ stories: res.data }), error => handleNetworkError(error));

  }

  render() {
    const { stories } = this.state;

    return (
      <Fragment>
        <Head>
          <title>Producer Forum</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        </Head>
        <Nav />
        <SubNav />
        <div className={container}>
          <main className={main}>
            {stories.map(story => (
              <Story
                key={story._id}
                {...story} />
            ))}
          </main>
        </div>
      </Fragment>
    );
  }
}

export default TutorialsPage;