import React, { Component } from 'react';
import { connect } from 'react-redux';
import PleaseLogin from './please-login';
import { startAddStory } from '../actions/stories';
import { btnBlue, textarea } from '../styles/styles.css';
import { container, checkboxContainer } from '../styles/components/post.css';

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      link: '',
      comment: '',
      category: '',
    }
  }

  onTitleChange = e => {
    const title = e.target.value;
    this.setState({ title });
  }

  onLinkChange = e => {
    const link = e.target.value;
    this.setState({ link });
  }

  onCommentChange = e => {
    const comment = e.target.value;
    this.setState({ comment });
  }

  onCategoryChange = e => {
    const category = e.target.value;
    this.setState({ category });
  }

  submitStory = e => {
    e.preventDefault();

    const { username, startAddStory } = this.props;
    const { title, link, comment, category } = this.state;
    const date = Date.now().toString();

    const story = {
      title: title,
      link: link,
      comment: comment,
      category: category,
      username: username,
      date: date
    };

    startAddStory(story);

    window.location.href = 'http://localhost:3000/';
  }

  render() {
    const { authenticated } = this.props;

    return (
      <div className={container}>
        {authenticated ? (
          <div>
            <h1>Post a resource</h1>
            <p>
              Submit a link, upload a file, or ask a question. Please make sure to read the
              community guidelines to make sure you are posting beneficial content.
            </p>
            <form onSubmit={this.submitStory}>
              <h2>Title</h2>
              <input
                type="text"
                value={this.state.title}
                onChange={this.onTitleChange}
                placeholder="Language by Porter Robinson..."
              />
              <h2>Link <em>or</em> Comment</h2>
              <input
                type="text"
                value={this.state.link}
                onChange={this.onLinkChange}
                placeholder="Enter a link for your post..."
              />
              <header>
                <span>Markdown</span>
              </header>
              <textarea
                value={this.state.comment}
                onChange={this.onCommentChange}
                className={textarea}
                placeholder='Enter your comment...Be chill please...'
              />
              <div
                onChange={this.onCategoryChange}
                className={checkboxContainer}
              >
                <h2>Category</h2>
                <div>
                  <input
                    type="radio"
                    name="category"
                    value="Tutorial"
                  />
                  <label htmlFor="tutorial">Tutorial</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="category"
                    value="Midi"
                  />
                  <label htmlFor="Midi">Midi</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="category"
                    value="Project"
                  />
                  <label htmlFor="project">Project</label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="category"
                    value="Presets"
                  />
                  <label htmlFor="presets">Presets</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="category"
                    value="Ask"
                  />
                  <label htmlFor="ask">Ask</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="category"
                    value="Show"
                  />
                  <label htmlFor="show">Show</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="category"
                    value="Stream"
                  />
                  <label htmlFor="stream">Stream</label>
                </div>
              </div>
              <button className={btnBlue}>Submit</button>
            </form>
          </div>
        ) : <PleaseLogin />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.users.authenticated,
  username: state.users.username
});

const mapDispatchToProps = dispatch => ({
  startAddStory: story => dispatch(startAddStory(story))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);