import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noPoster from '../assets/no-poster.png';
import { Films } from './Films';

export function Info(props) {
  const [data, setData] = useState({});
  const [preloader, setPreloader] = useState('');
  useEffect(() => {
    setPreloader('Loading');
    // eslint-disable-next-line react/prop-types
    fetch(`http://www.omdbapi.com/?i=${props.match.params.id}&apikey=5b0729fd&plot=full`)
      .then((response) => response.json())
      .then((result) => {
        if (result.Response === 'True') {
          setData(result);
          setPreloader('');
        } else { props.history.push('/not-found'); }
      });
    // eslint-disable-next-line react/prop-types
  }, [props.match.params.id]);


  return (
    <div>
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
    </div>

  );
}
