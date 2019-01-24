import React from 'react';
import { container } from '../styles/components/loading.css';

const Loading = () => (
  <div className={container}>
    <img src={'/static/logo-black.svg'} />
    <p>Loading...</p>
  </div>
);

export default Loading;