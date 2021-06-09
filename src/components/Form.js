import { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from './Firebase';

function Form() {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [relatedMovies, setRelatedMovies] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection('movies')
      .add({
        movieTitle: movieTitle,
        movieDescription: movieDescription,
        relatedMovies: relatedMovies,
      })
      .then(() => {
        alert('La película se guardó');
      })
      .catch((error) => {
        alert(error.message);
      });

    setMovieTitle('');
    setMovieDescription('');
    setRelatedMovies('');
  };

  return (
    <>
      <p>Aqui puedes añadir cualquier película</p>
      <form className="form" onSubmit={handleSubmit}>
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
          Añade la película
        </button>
      </form>
      <Link to="/" className="link">
        <h4 className="form-link">Volver a la página principal</h4>
      </Link>
    </>
  );
}

export default Form;
