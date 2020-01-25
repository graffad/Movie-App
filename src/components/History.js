import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';


export default function History() {
  if (!localStorage.hasOwnProperty('watchedFilms')) {
    localStorage.setItem('watchedFilms', JSON.stringify([]));
  }
  const localFilmsArr = JSON.parse(localStorage.getItem('watchedFilms'));

  return (
    <>
  <Header/>
      <div className={'container'}>
        <h2 className={'logo'}><Link to='/'>HISTORY</Link></h2>
        {localFilmsArr.length !== 0 ? localFilmsArr.map((item) => (
          <div key={item.result.Title} className={'historyBlock'}>
            <div className="historyImg"><img src={item.result.Poster} alt=""/></div>
            <div className="historyText">
              <ul>
                <li><h3>{item.result.Title}</h3></li>
                <li><span>Year:</span> {item.result.Year}</li>
                <li><span>Rated:</span> {item.result.Rated}</li>
                <li><span>Released:</span> {item.result.Released}</li>
                <li><span>Runtime:</span> {item.result.Runtime}</li>
                <li><span>Genre:</span> {item.result.Genre}</li>
                <li><span>Director:</span> {item.result.Director}</li>
                <li><span>Actors:</span> {item.result.Actors}</li>
                <li><span>Country:</span> {item.result.Country}</li>
                <li className={'plot'}><span>Plot:</span> {item.result.Plot}</li>
              </ul>
            </div>
          </div>
        )) : <h4>History empty</h4>}
      </div>
    </>

  );
}
