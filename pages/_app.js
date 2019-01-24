import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import reduxStore from '../src/store/configureStore';
import withRedux from 'next-redux-wrapper';

const makeStore = () => reduxStore;

class myApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(myApp);