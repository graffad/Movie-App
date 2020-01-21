import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(props) {
  function relocate() {
    return props.history.push('/');
  }

  setTimeout(relocate, 5000);

  return (
    <div className={'container'}>
      <div className={'notFound'}>
        <Link to={'/'}>Home</Link>
        <h1>PAGE NOT FOUND</h1>
      </div>
    </div>
  );
}
