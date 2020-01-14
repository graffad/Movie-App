import React, { useState, useEffect } from 'react';

export function Info(props) {
  const [data, setData] = useState({});
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    fetch(`http://www.omdbapi.com/?i=${props.match.params.id}&apikey=5b0729fd`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
    // eslint-disable-next-line react/prop-types
  }, [props.match.params.id]);


  return (
        <div>
            <p>{data.Title}</p>

            <button>hide</button>
        </div>

  );
}
