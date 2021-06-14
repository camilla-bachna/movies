import React, { useState } from 'react';

function RelatedMovies(props) {
  const [relatedMoviesArray, setRelatedMoviesArray] = useState([]);
  const [isClicked, setClicked] = useState('false');

  // add related movie by clicking on one

  const handleClickedMovie = (event) => {
    const clickedMovieId = event.currentTarget.id;

    const relatedMoviesIndex = relatedMoviesArray.findIndex(function (
      relatedMovies
    ) {
      return relatedMovies.id === clickedMovieId;
    });
    if (relatedMoviesIndex === -1) {
      const movieFound = props.dataToShow.find(function (movie) {
        return movie.id === clickedMovieId;
      });
      const newRelatedMoviesArray = [...relatedMoviesArray];
      newRelatedMoviesArray.push(movieFound);
      setRelatedMoviesArray(newRelatedMoviesArray);
      setClicked(true);
    } else {
      const newRelatedMoviesArray = [...relatedMoviesArray];
      newRelatedMoviesArray.splice(relatedMoviesIndex, 1);
      setRelatedMoviesArray(newRelatedMoviesArray);
      setClicked(false);
    }
  };

  const relatedMovies = relatedMoviesArray.map((relatedMovie) => {
    return (
      <li className="list__item">
        <div>{relatedMovie.title}</div>
      </li>
    );
  });

  // clicked movie

  function clickedMovies(data) {
    const movieFound = relatedMoviesArray.find(function (relatedMovie) {
      return data.id === relatedMovie.id;
    });
    if (movieFound === undefined) {
      return false;
    } else {
      return true;
    }
  }

  // paint movies

  const moviesToShow = props.dataToShow.map((data) => {
    let clickedMovie;
    if (clickedMovies(data)) {
      clickedMovie = 'container-list-clicked';
    } else {
      clickedMovie = '';
    }
    return (
      <>
        <li
          key={data.id}
          id={data.id}
          className={`container-list ${clickedMovie}`}
          onClick={handleClickedMovie}
        >
          <h3 className="container-heading"> {data.title}</h3>
          <p className="container-paragraph">
            {data.description.substring(0, 110) + '...'}
          </p>
          <span className="container-relatedMovies">
            Películas relacionadas: {data.relatedMovies}
          </span>
        </li>
      </>
    );
  });

  return (
    <>
      <div>{relatedMovies}</div>
      <div className="container-search">{moviesToShow}</div>
    </>
  );
}

export default RelatedMovies;
