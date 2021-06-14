import { db } from './Firebase';
import { useState } from 'react';

function FormUpdate(props) {
  const id = props.movieFound.id;
  const [movieTitle, setMovieTitle] = useState(props.movieFound.title);
  const [movieDescription, setMovieDescription] = useState(
    props.movieFound.description
  );
  const cover = props.cover;
  const setCover = props.setCover;
  const relatedMoviesArray = props.relatedMoviesArray;
  const setRelatedMoviesArray = props.setRelatedMoviesArray;

  // modify movie function
  const ref = db.collection('movies');

  function updateMovie(updatedMovie) {
    ref
      .doc(updatedMovie.id)
      .update(updatedMovie)
      .then(() => {
        alert('La película ha sido cambiada');
      })
      .catch((error) => {
        alert(error.message);
      });

    setMovieTitle('');
    setMovieDescription('');
    setCover('');
    setRelatedMoviesArray([]);
  }

  // get movie id from array of related movies

  const relatedMovieId = relatedMoviesArray.map((relatedMovie) => {
    return relatedMovie.id;
  });

  // print selected movies

  const relatedMoviesList = relatedMoviesArray.map((relatedMovie) => {
    return <span>{`${relatedMovie.title}, `}</span>;
  });

  // preventDefault for form

  const handleSubmitForm = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form
        className="form"
        onSubmit={handleSubmitForm}
        onSubmit={() =>
          updateMovie({
            movieTitle: movieTitle,
            movieDescription: movieDescription,
            cover: cover,
            tag: relatedMovieId,
            id: id,
          })
        }
      >
        <label className="form-label" htmlFor="movieTitle">
          Título de la película:
        </label>
        <input
          className="form-input"
          id="movieTitle"
          type="text"
          placeholder="Título"
          value={movieTitle}
          onChange={(ev) => setMovieTitle(ev.target.value)}
        />

        <label className="form-label" htmlFor="movieDescription">
          Descripción de la película:
        </label>
        <textarea
          className="form-input"
          id="movieDescription"
          type="movieDescription"
          placeholder="Descripción"
          value={movieDescription}
          onChange={(ev) => setMovieDescription(ev.target.value)}
        />

        <label className="form-label" htmlFor="relatedMovies">
          Películas relacionadas:
        </label>
        <input
          className="form-input-hidden"
          id="relatedMovies"
          type="text"
          placeholder="Películas relacionadas"
          value={relatedMovieId}
          onChange={(ev) => setRelatedMoviesArray(ev.target.value)}
        />
        <span>{relatedMoviesList}</span>
        <button className="form-button-addMovie" type="submit">
          Modifica la película
        </button>
      </form>
    </>
  );
}

export default FormUpdate;
