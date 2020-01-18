import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  nextSearchAction,
  filmInfoAction,
  sortTitleAction,
  sortToNewAction,
  sortToOldAction,
  searchError,
} from '../state-managment/actions';
import noPoster from '../assets/no-poster.png';
import { Header } from './Header';

export function Films() {
  const dispatch = useDispatch();
  const garage = useSelector((state) => state);
  const [searchPage, setSearchPage] = useState(1);
  const [sortValue, setSortValue] = useState('Title');
  const [counter, setCounter] = useState(0);
  const [preloader, setPreloader] = useState('');

  useEffect(() => {

  }, [counter]);

  console.log(garage.filmsReducer.data);

  function onNext() {
    setPreloader('Loading...');
    setCounter(counter + 1);
    // eslint-disable-next-line prefer-const
    let url = `http://www.omdbapi.com/?s=${garage.searchParams.searchValue}&type=${garage.searchParams.searchType}&apikey=5b0729fd&page=${searchPage + 1}`;
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (result.Response === 'True') {
          setSearchPage(searchPage + 1);
          dispatch(nextSearchAction(result, sortValue));
          setPreloader('');
        } else {
          dispatch(searchError(result.Error));
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
      <Header/>
      <div className={'container'}>

        <div className={'select'}>
          <select name="" id="selectSort" onChange={(event) => {
            setSortValue(event.target.value);
            if (event.target.value === 'Title') {
              dispatch(sortTitleAction());
            } else if (event.target.value === 'yearNewToOld') {
              dispatch(sortToOldAction());
            } else if (event.target.value === 'yearOldToNew') {
              dispatch(sortToNewAction());
            }
            setCounter(counter + 1);
          }
          }>
            <option selected={true} disabled={true}>Chose sorting</option>
            <option value="Title">Title</option>
            <option value="yearNewToOld">Year↓</option>
            <option value="yearOldToNew">Year↑</option>
          </select>
        </div>

        <p className={'preloader'}>{preloader}</p>
        <h3 className={'searchStatus'}>{garage.searchParams.status}</h3>
        <div className={'filmsWrapper'}>
          {
            garage.filmsReducer.data.Search.map((item) => (
              <div className={'filmBlock'} key={item.imdbID}>
                <div className={'imgBlock'}>
                  <Link to={`/films/${item.imdbID}`}>
                    {item.Poster === 'N/A' ? <img src={noPoster} alt=""/>
                      : <img src={item.Poster} alt=""/>}
                    {/* <img src={item.Poster} alt=""/> */}
                  </Link>
                </div>
                <Link to={`/films/${item.imdbID}`}><h4>{item.Title}</h4></Link>
                <div className={'shortFilmInfo'}>
                  <p>Year: {item.Year}</p>
                  <p>Type: {item.Type}</p>
                </div>
              </div>
            ))
          }
        </div>
        <button className={'actionButton  nextButton'} onClick={onNext}>Show more</button>
      </div>
    </div>

  );
}
