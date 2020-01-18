import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound(props) {
  function relocate() {
    // eslint-disable-next-line react/prop-types
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
