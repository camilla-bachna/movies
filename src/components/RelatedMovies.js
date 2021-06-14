import React, { useState } from 'react';

function RelatedMovies(props) {
  const [isClicked, setClicked] = useState('false');

  // add related movie by clicking on one

  const handleClickedMovie = (event) => {
    const clickedMovieId = event.currentTarget.id;

    const relatedMoviesIndex = props.relatedMoviesArray.findIndex(function (
      relatedMovies
    ) {
      return relatedMovies.id === clickedMovieId;
    });
    if (relatedMoviesIndex === -1) {
      const movieFound = props.dataToShow.find(function (movie) {
        return movie.id === clickedMovieId;
      });
      const newRelatedMoviesArray = [...props.relatedMoviesArray];
      newRelatedMoviesArray.push(movieFound);
      props.setRelatedMoviesArray(newRelatedMoviesArray);
      setClicked(true);
    } else {
      const newRelatedMoviesArray = [...props.relatedMoviesArray];
      newRelatedMoviesArray.splice(relatedMoviesIndex, 1);
      props.setRelatedMoviesArray(newRelatedMoviesArray);
      setClicked(false);
    }
  };

  // clicked movie

  function clickedMovies(data) {
    const movieFound = props.relatedMoviesArray.find(function (relatedMovie) {
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
      <p className="form-paragraph">
        Por favor haz clic en la película que deseas seleccionar como película
        relacionada.
      </p>
      <div className="container-search">{moviesToShow}</div>
    </>
  );
}

export default RelatedMovies;
