import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../src/actions/user';
import Nav from '../src/components/nav';
import SubNav from '../src/components/sub-nav';
import PostForm from '../src/components/post-form';
import Loading from '../src/components/loading';
import { container, main } from '../src/styles/styles.css';

class PostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const { fetchAuth } = this.props;
    fetchAuth();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;

    return (
      loading ? <Loading />
        : (
          <div>
            <Nav />
            <SubNav />
            <div className={container}>
              <main className={main}>
                <PostForm />
              </main>
            </div>
          </div>
        )
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.users.authenticated
});

const mapDispatchToProps = dispatch => ({
  fetchAuth: () => dispatch(fetchAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);