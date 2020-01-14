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
      <select name="" id="" onChange={(event) => {
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
        <option defaultValue="Title">Title</option>
        <option value="yearNewToOld">Year↓</option>
        <option value="yearOldToNew">Year↑</option>
      </select>
      <p>{preloader}</p>
      <h3>{garage.searchParams.status}</h3>
      <ul>
        {
          garage.filmsReducer.data.Search.map((item) => (
            <li key={item.imdbID}>{item.Title}{item.Year}
              <Link to={`/films/${item.imdbID}`}>
                {/* <button onClick={() => fetchInfo(item.imdbID)}>more</button> */}
                <button>Detail</button>
              </Link>
              <div>
                {/* <img src={item.Poster} alt=""/> */}
              </div>
            </li>
          ))
        }
      </ul>
      <button onClick={onNext}>Show more</button>
    </div>

  );
}
