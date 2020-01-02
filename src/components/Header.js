import React, { useState, useEffect } from 'react';
import { Info } from './Info';


//apikey=5b0729fd
export function Header() {
  const [loadingData, setLoading] = useState({
    Loading: ""
  } ); //PRoblem
  const [searchPage, setSearchPage] = useState(1);
  const [counter, setCounter] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [stateJson, setStateJson] = useState({
    Search: [],
  });
  const [movie, setMovie] = useState({
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

  useEffect(()=>{

    fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=5b0729fd&page=${searchPage}`)
      .then(response => response.json())
      .then(result => {
        if(result.Response === "True"){
          // let newArr = stateJson.Search.concat(result.Search)
          setStateJson({
            Search: result.Search,
            totalResults: result.totalResults,
          });
          setLoading({Loading: ""})
        }else {
          setStateJson({
            Search: [],

          });
          setLoading({Loading: `${result.Error}`})
        }



      });
  },[searchValue])

  console.log(loadingData)
  //при изменении страницы

  useEffect(()=>{
    fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=5b0729fd&page=${searchPage}`)
      .then(response => response.json())
      .then(result => {
        if(result.Response === "True"){
          let newArr = stateJson.Search.concat(result.Search)
          setStateJson({
            Search: newArr,
            totalResults: result.totalResults,
          });
          setLoading({Loading: ""})
        }else {
          setStateJson({
            Search: [],

          });
          setLoading({Loading: `${result.Error}`})
        }



      });
  },[counter])




  function fetchInfo(filmID) {
    fetch(`http://www.omdbapi.com/?i=${filmID}&apikey=5b0729fd`)
      .then(response => response.json())
      .then(result => setMovie(result));

  }


  const onEnter = (event) => {

    if (event.key === 'Enter') {
      setLoading({Loading: "Loading.."})
      setSearchPage(1); //ставим первую страницу
      setSearchValue(event.target.value)

      // fetchMovie();
      event.target.value = '';
      event.target.blur();
    }

  };


  // onChange={onChange}
  return (
    <div>
      <input type="text"  onKeyPress={onEnter}/>
      <p>{loadingData.Loading}</p>
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
          setLoading({Loading: "Loading.."})

          setSearchPage(searchPage + 1);
          setCounter(counter +1)
          // fetchMovie();
        }}>next
        </button>


      </ul>

      <Info data={movie}/>
    </div>

  );
}
