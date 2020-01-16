import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  firstSearchAction,
  searchValAction,
  searchTypeAction,
  searchError,
  searchTotalResults,
} from '../state-managment/actions';

// apikey=5b0729fd
export function Header() {
  const dispatch = useDispatch();
  const garage = useSelector((state) => state);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('Movie');

  // eslint-disable-next-line prefer-const
  let url = `http://www.omdbapi.com/?s=${searchValue}&type=${searchType}&apikey=5b0729fd&page=${garage.searchParams.searchPage}`;

  function onSubmit() {
    dispatch(searchValAction(searchValue));
    dispatch(searchTypeAction(searchType));
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (result.Response === 'True') {
          dispatch(firstSearchAction(result));
          dispatch(searchTotalResults(`${result.totalResults} movies found`));
        } else { dispatch(searchError(result.Error)); }
      });
    // eslint-disable-next-line prefer-const
    let searchValInput = document.getElementById('searchValue');
    searchValInput.value = '';
  }

  return (
    <div className={'container'}>
      <h2 className={'logo'}><Link to='/'>MOVIE APP</Link></h2>
      <form action="" className={'formHeader'}>
        <input type="text" id="searchValue" placeholder={'Enter text here'}
               onChange={(event) => setSearchValue(event.target.value)}/>
        <Link to='/films'>
          <button className={'actionButton'} onClick={onSubmit}>Search</button>
        </Link>

        <div className={'typeSearch'}>
          <input type="radio" id='typeMovie' name='searchType' value='movie' defaultChecked={true}
                  onChange={(event) => setSearchType(event.target.value)}
          />
          <label htmlFor="typeMovie">Movie</label>
          <input type="radio" id='typeSeries' name='searchType' value='series'
                 onChange={(event) => setSearchType(event.target.value)}
          />
          <label htmlFor="typeSeries">TV-Show</label>
        </div>
      </form>

    </div>
  );
}
