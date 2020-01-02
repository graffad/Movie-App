import React, { useState } from 'react';


export function Info(props) {
  return(
    <div>
      <p>{props.data.Title}</p>
      <p>{props.data.Year}</p>
      <p>{props.data.Rated}</p>
      <p>{props.data.Released}</p>
      <p>{props.data.Runtime}</p>
      <p>{props.data.Genre}</p>
      <p>{props.data.Director}</p>
      <p>{props.data.Writer}</p>
      <p>{props.data.Actors}</p>
      <p>{props.data.Language}</p>
      <p>{props.data.Country}</p>
      <button>hide</button>
    </div>

  )
}
