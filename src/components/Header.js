import React, { useEffect, useState } from 'react';
import { Info } from './Info';


//apikey=5b0729fd
export function Header() {
  const [loadingData, setLoading] = useState({
    Loading: ''
  }); //PRoblem
  const [searchPage, setSearchPage] = useState(1);
  const [counter, setCounter] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [stateJson, setStateJson] = useState({
    Search: [],
  });
  const [movieInfo, setMovie] = useState({
    Title: '',
    Year: '',
    Rated: '',
    Released: '',
    Runtime: '',
    Genre: '',
    Director: '',
    Writer: '',
    Actors: '',
    Plot: '',
    Language: '',
    Country: '',
    Awards: '',
    Poster: '',
    Metascore: '',
    imdbRating: '',
    imdbVotes: '',
    imdbID: '',
    Type: '',
    DVD: '',
    BoxOffice: '',
    Production: '',
    Website: '',
    Response: '',
    Ratings: [],
  });
  const [typeSearch, setTypeSearch] = useState('movie');
  const [sortValue, setSortValue] = useState('Title');
  let url = `http://www.omdbapi.com/?s=${searchValue}&type=${typeSearch}&apikey=5b0729fd&page=${searchPage}`;


  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(result => {
        if (result.Response === 'True') {
          // let newArr = stateJson.Search.concat(result.Search)
          let arrSorted = [];
          if (sortValue === 'Title') {
            arrSorted = result.Search.sort((prev, next) => {
              if (prev.Title < next.Title) return -1;
              if (prev.Title < next.Title) return 1;
            });
          }
          if (sortValue === 'yearNewToOld') {
            let arrNum = result.Search.map(function (item) {
              item.Year = parseInt(item.Year, 10); //строки в числа
              return item;
            });
            arrSorted = arrNum.sort((prev, next) => next.Year - prev.Year);
          }
          if (sortValue === 'yearOldToNew') {
            let arrNum = result.Search.map(function (item) {
              item.Year = parseInt(item.Year, 10); //строки в числа
              return item;
            });
            arrSorted = arrNum.sort((prev, next) => prev.Year - next.Year);
          }
          setStateJson({
            Search: arrSorted,
            totalResults: result.totalResults,
          });
          setLoading({ Loading: `Total results of (${searchValue}): ${result.totalResults}` });
        } else {
          setStateJson({
            Search: [],
          });
          setLoading({ Loading: `${result.Error}` });
        }


      });
  }, [searchValue, typeSearch, sortValue]);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(result => {
        if (result.Response === 'True') {
          let arrSorted = [];
          if (sortValue === 'Title') {
            arrSorted = result.Search.sort((prev, next) => {
              if (prev.Title < next.Title) return -1;
              if (prev.Title < next.Title) return 1;
            });
          }
          if (sortValue === 'yearNewToOld') {
            let arrNum = result.Search.map(function (item) {
              item.Year = parseInt(item.Year, 10); //строки в числа
              return item;
            });
            arrSorted = arrNum.sort((prev, next) => next.Year - prev.Year);
          }
          if (sortValue === 'yearOldToNew') {
            let arrNum = result.Search.map(function (item) {
              item.Year = parseInt(item.Year, 10); //строки в числа
              return item;
            });
            arrSorted = arrNum.sort((prev, next) => prev.Year - next.Year);
          }
          let newArr = stateJson.Search.concat(arrSorted);
          setStateJson({
            Search: newArr,
            totalResults: result.totalResults,
          });
          setLoading({ Loading: `Total results of (${searchValue}): ${result.totalResults}` });
        } else {
          setStateJson({
            Search: [],

          });
          setLoading({ Loading: `${result.Error}` });
        }


      });
  }, [counter]);

  function fetchInfo(filmID) {
    fetch(`http://www.omdbapi.com/?i=${filmID}&apikey=5b0729fd`)
      .then(response => response.json())
      .then(result => setMovie(result));

  }

  const onEnter = (event) => {
    if (event.key === 'Enter') {
      setLoading({ Loading: 'Loading..' });
      setSearchPage(1); //ставим первую страницу
      setSearchValue(event.target.value);

      // fetchMovie();
      event.target.value = '';
      event.target.blur();
    }
  };

  return (
    <div>
      <input type="text" onKeyPress={onEnter}/>
      <input type="radio" name="typeSearch" defaultChecked={true} id="typeMovie" value="movie"
             onChange={event => setTypeSearch(event.target.value)}
      />
      <label htmlFor="typeMovie">Movie</label>
      <input type="radio" name="typeSearch" id="typeTvShow" value="series"
             onChange={event => setTypeSearch(event.target.value)}
      />
      <label htmlFor="typeTvShow">Tv show</label>

      <select name="" id="" onChange={event => setSortValue(event.target.value)}>
        <option defaultValue="Title">Title</option>
        <option value="yearNewToOld">Year↓</option>
        <option value="yearOldToNew">Year↑</option>
      </select>

      <h3>{loadingData.Loading}</h3>
      <ul>
        {stateJson.Search.map(item => (
          <li key={item.imdbID}>{item.Title}{item.Year}
            <button onClick={() => fetchInfo(item.imdbID)}>more</button>
            <div>
              {/*<img src={item.Poster} alt=""/>*/}
            </div>
          </li>
        ))}

        <button onClick={() => {
          setLoading({ Loading: 'Loading..' });
          setSearchPage(searchPage + 1);
          setCounter(counter + 1);
          // fetchMovie();
        }}>next
        </button>


      </ul>

      <Info data={movieInfo}/>
    </div>

  );
}
