import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  nextSearchAction,
  // filmInfoAction,
  sortTitleAction,
  sortToNewAction,
  sortToOldAction,
  searchError,
} from '../state-managment/actions';
import noPoster from '../assets/no-poster.png';
import Header from './Header';

export default function Films(props) {
  const dispatch = useDispatch();
  const garage = useSelector((state) => state);
  const [searchPage, setSearchPage] = useState(1);
  const [sortValue, setSortValue] = useState('Title');
  const [preloader, setPreloader] = useState('');
  const [filmsBlocksOnPage, setFilmsBlocksOnPage] = useState(0);
  useEffect(() => {
    const hidden = document.getElementsByClassName('show');
    const currentFilmsBlocks = document.getElementsByClassName('filmBlock');
    setFilmsBlocksOnPage(currentFilmsBlocks.length);
    if (garage.searchParams.status === 'Movie not found!' || garage.searchParams.status === ''
      || garage.searchParams.status === 'Something went wrong.'
      || garage.searchParams.status === 'Too many results.'
      || garage.searchParams.status === 'Series not found!') {
      Array.from(hidden)
        .forEach((item) => {
          item.style.display = 'none';
        });
    } else {
      Array.from(hidden)
        .forEach((item) => {
          item.style.display = 'flex';
        });
    }
  }, [garage.searchParams.status]);

  function onNext() {
    setPreloader('Loading...');
    const url = `http://www.omdbapi.com/?s=${garage.searchParams.searchValue}&type=${garage.searchParams.searchType}&apikey=5b0729fd&page=${searchPage + 1}`;
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (result.Response === 'True') {
          setSearchPage(searchPage + 1);
          dispatch(nextSearchAction(result, sortValue));
          setPreloader('');
        } else {
          if (filmsBlocksOnPage !== garage.filmsReducer.data.totalResults) {
            dispatch(searchError('No more pages'));
          } else {
            dispatch(searchError(result.Error));
          }
          setPreloader('');
        }
      });
  }

  // function fetchInfo(filmID) {
  //   fetch(`http://www.omdbapi.com/?i=${filmID}&apikey=5b0729fd`)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       dispatch(filmInfoAction(result));
  //     });
  // }


  return (
    <div>
      <Header newpr={props}/>
      <div className={'container'}>
        <p className={'preloader'}>{preloader}</p>
        <h3 className={'searchStatus'} id={'searchStatus'}>{garage.searchParams.status}</h3>
        <div className={'select show'} id={'selector'}>
          <select defaultValue={'Chose sorting'} name="" id="selectSort" onChange={(event) => {
            setSortValue(event.target.value);
            if (event.target.value === 'Title') {
              dispatch(sortTitleAction());
            } else if (event.target.value === 'yearNewToOld') {
              dispatch(sortToOldAction());
            } else if (event.target.value === 'yearOldToNew') {
              dispatch(sortToNewAction());
            }
          }
          }>
            <option value={'Chose sorting'} disabled={true}>Chose sorting</option>
            <option value="Title">Title</option>
            <option value="yearNewToOld">Year↓</option>
            <option value="yearOldToNew">Year↑</option>
          </select>
        </div>
        <div className={'filmsWrapper show'}>
          {
            garage.filmsReducer.data.Search.map((item) => (
              <div className={'filmBlock'} key={item.imdbID}>
                <div className={'imgBlock'}>
                  <Link to={`/films/${item.imdbID}`}>
                    {item.Poster === 'N/A' ? <img src={noPoster} alt=""/>
                      : <img src={item.Poster} alt=""/>}
                  </Link>
                </div>
                <div className={'tooltip'}>
                  <h4><Link to={`/films/${item.imdbID}`}>{item.Title}</Link></h4>
                  <span>{item.Title}</span>
                </div>
                <div className={'shortFilmInfo'}>
                  <p>Year: {item.Year}</p>
                  <p>Type: {item.Type}</p>
                </div>
              </div>
            ))
          }
        </div>
        <button className={'actionButton  nextButton show'} onClick={onNext}>Show more</button>
      </div>
    </div>

  );
}
