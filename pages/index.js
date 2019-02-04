import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchAuth } from '../src/actions/user';
import Nav from '../src/components/nav';
import SubNav from '../src/components/sub-nav';
import Story from '../src/components/story';
import { handleNetworkError } from '../src/util/network-error';
import { container, main } from '../src/styles/styles.css';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: []
    };

  }

  componentDidMount() {
    const { fetchAuth } = this.props;
    fetchAuth();

    axios.get('/api/stories')
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
                key={story._id}
                {...story}
              />
            ))}
          </main>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  fetchAuth: () => dispatch(fetchAuth())
});

export default connect(undefined, mapDispatchToProps)(HomePage);