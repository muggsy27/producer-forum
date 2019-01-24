import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../src/components/nav';
import SubNav from '../src/components/sub-nav';
import Story from '../src/components/story';
import CommentForm from '../src/components/comment-form';
import Comments from '../src/components/comments';
import Loading from '../src/components/loading';
import { fetchAuth } from '../src/actions/user';
import { startGetStory } from '../src/actions/story';
import { container, main } from '../src/styles/styles.css';
import { storyComment } from '../src/styles/pages/post.css';

class StoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  static async getInitialProps({ pathname, query }) {
    return { pathname, query }
  }

  componentDidMount() {
    const { fetchAuth, startGetStory } = this.props;
    const { id } = this.props.query;

    fetchAuth();
    startGetStory(id);

    setTimeout(() => {
      this.setState({ loading: false });
    }, 250);
  }

  render() {
    const { query: { id }, story, authenticated } = this.props;
    const { loading } = this.state;

    return (
      loading ? <Loading />
        : (
          <div>
            <Nav authenticated={authenticated} />
            <SubNav />
            <div className={container}>
              <main className={main}>
                <Story {...story} />
                {story.comment && <p className={storyComment}>{story.comment}</p>}
                <CommentForm id={id} />
                <Comments id={id} />
              </main>
            </div>
          </div>
        )
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.users.authenticated,
  story: state.story
});

const mapDispatchToProps = dispatch => ({
  fetchAuth: () => dispatch(fetchAuth()),
  startGetStory: id => dispatch(startGetStory(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryPage);