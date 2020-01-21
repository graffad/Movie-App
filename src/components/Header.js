import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  firstSearchAction,
  searchValAction,
  searchTypeAction,
  searchError,
  searchTotalResults,
} from '../state-managment/actions';

// apikey=5b0729fd
export default function Header(props) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('Movie');
  const [preloader, setPreloader] = useState('');
  const url = `http://www.omdbapi.com/?s=${searchValue}&type=${searchType}&apikey=5b0729fd&page=1`;

  function onSubmit(event) {
    const searchValInput = document.getElementById('searchValue');
    event.preventDefault();
    if (searchValInput.value !== '') {
      setPreloader('Loading...');
      dispatch(searchValAction(searchValue));
      dispatch(searchTypeAction(searchType));
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          if (result.Response === 'True') {
            dispatch(firstSearchAction(result));
            dispatch(searchTotalResults(`${result.totalResults} results found for "${searchValue}"`));
            setPreloader('');
            if (!props.hasOwnProperty('newpr')) {
              props.history.push('/films');
            }
          } else {
            dispatch(searchError(result.Error));
            setPreloader('');
            if (!props.hasOwnProperty('newpr')) {
              setPreloader(`${result.Error}`);
            }
          }
        });
      searchValInput.value = '';
    } else { setPreloader('Search field is empty'); }
  }

  return (
    <div className={'container'}>
      <h2 className={'logo'}><Link to='/'>MOVIE APP</Link></h2>
      <form action="" className={'formHeader'}>
        <input type="text" id="searchValue" placeholder={'Enter text here'}
               onChange={(event) => setSearchValue(event.target.value.trim())}/>
          <button className={'actionButton'} onClick={onSubmit}>Search</button>
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
       <h3 className={'searchStatus'}>{preloader}</h3>
    </div>
  );
}
