import { db } from './Firebase';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function FormUpdate(props) {
  //console.log(newMovie);
  const id = props.movieFound.id;
  const [movieTitle, setMovieTitle] = useState(props.movieFound.title);
  const [movieDescription, setMovieDescription] = useState(
    props.movieFound.description
  );
  const [relatedMovies, setRelatedMovies] = useState(
    props.movieFound.relatedMovies
  );

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
    /* console.log(updatedMovie.id); */
  }

  /* preventDefault for form */

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
            relatedMovies: relatedMovies,
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
          className="form-input"
          id="relatedMovies"
          type="text"
          placeholder="Películas relacionadas"
          value={relatedMovies}
          onChange={(ev) => setRelatedMovies(ev.target.value)}
        />

        <button className="form-button" type="submit">
          Modifica la película
        </button>
      </form>
      <Link to="/showMovie" className="link">
        <h4 className="form-link">Volver a ver todas las películas</h4>
      </Link>
    </>
  );
}

export default FormUpdate;
