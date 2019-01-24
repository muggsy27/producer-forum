import React, { Component } from 'react';
import Router from 'next/router';
import { container } from '../styles/components/search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };
  }

  onChange = e => {
    const query = e.target.value;
    this.setState({ query });
  };

  onSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    Router.push(`http://localhost:3000/search?title=${query}`);
  }

  render() {
    const { query } = this.state;

    return (
      <div className={container}>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Search by title..."
            value={query}
            onChange={this.onChange}
            autoFocus={true}
          />
        </form>
      </div>
    )
  }
}

export default Search;