import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noPoster from '../assets/no-poster.png';
import Films from './Films';
import history from '../state-managment/history';

export default function Info(props) {
  const [data, setData] = useState({});
  const [preloader, setPreloader] = useState('');
  if (!localStorage.hasOwnProperty('watchedFilms')) {
    localStorage.setItem('watchedFilms', JSON.stringify([]));
  }

  useEffect(() => {
    setPreloader('Loading');
    const localFilmsArr = JSON.parse(localStorage.getItem('watchedFilms'));
    const filmId = props.match.params.id;
    const filtered = localFilmsArr.filter((item) => item.result.imdbID === filmId);
    if (filtered.length !== 0) {
      setData(filtered[0].result);
      setPreloader('');
    } else {
      fetch(`http://www.omdbapi.com/?i=${props.match.params.id}&apikey=5b0729fd&plot=full`)
        .then((response) => response.json())
        .then((result) => {
          if (result.Response === 'True') {
            setData(result);
            setPreloader('');
            localFilmsArr.push({ result });
            localStorage.setItem('watchedFilms', JSON.stringify(localFilmsArr));
          } else { history.push('/not-found'); }
        });
    }
  }, [props.match.params.id]);


  return (
    <>
      <Films/>
      <div className={'container'}>
        <div className={'modalWrapper'}>
          <p className={'preloader'}>{preloader}</p>
          <div className={'modalInfoWrapper'}>
            <div className={'modalImg'}>
              {data.Poster === 'N/A' ? <img src={noPoster} alt=""/>
                : <img src={data.Poster} alt=""/>}
            </div>
            <div className={'modalText'}>
              <ul>
                <li><h3>{data.Title}</h3></li>
                <li><span>Year:</span> {data.Year}</li>
                <li><span>Rated:</span> {data.Rated}</li>
                <li><span>Released:</span> {data.Released}</li>
                <li><span>Runtime:</span> {data.Runtime}</li>
                <li><span>Genre:</span> {data.Genre}</li>
                <li><span>Director:</span> {data.Director}</li>
                <li><span>Actors:</span> {data.Actors}</li>
                <li><span>Country:</span> {data.Country}</li>
                <li><span>Plot:</span> {data.Plot}</li>
              </ul>
            </div>
            <Link to={'/films'}>
              <button>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>

  );
}
