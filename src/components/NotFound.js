import React from 'react';
import { Link } from 'react-router-dom';
import history from '../state-managment/history';

export default function NotFound() {
  function relocate() {
    return history.push('/');
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
