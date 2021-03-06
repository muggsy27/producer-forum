import React, { Component, Fragment } from 'react';
import Head from 'next/head'
import axios from 'axios';
import { connect } from 'react-redux';
import Nav from '../src/components/nav';
import SubNav from '../src/components/sub-nav';
import Story from '../src/components/story';
import { handleNetworkError } from '../src/util/network-error';
import { container, main } from '../src/styles/styles.css';

class SavedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    const { user } = this.props;

    if (user) {
      axios.get(`/api/users/${user}`)
        .then(res => {
          const { saved } = res.data;

          axios.get('/api/stories/saved', {
            params: {
              stories: JSON.stringify(saved)
            }
          })
            .then(res => this.setState({ stories: res.data }));


        }, error => handleNetworkError(error))
    }

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
                {...story}
                key={story._id}
              />
            ))}
          </main>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.users.authenticated,
  user: state.users._id
});

export default connect(mapStateToProps, undefined)(SavedPage);


/*
- Needs to render a message if no stories are saved
"Hey you haven't saved any stories! Click on the stars to save your favorite posts :p"
- Need to add saved stories from user into array and search my database for those stories
- Need to pass those stories to story component
*/