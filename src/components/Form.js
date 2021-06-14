import { useState, useEffect } from 'react';
import { db } from './Firebase';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';

function Form(props) {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [dataShow, setData] = useState([]);
  const cover = props.cover;
  const setCover = props.setCover;
  const relatedMoviesArray = props.relatedMoviesArray;
  const setRelatedMoviesArray = props.setRelatedMoviesArray;

  // add movies

  const ref = db.collection('movies');

  function getMovies() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setData(items);
    });
  }

  useEffect(() => {
    getMovies();
  }, []);

  // add movie function

  function addMovie(newMovie) {
    ref
      .doc(newMovie.id)
      .set(newMovie)
      .then(() => {
        alert('La película se guardó');
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
    return <li className="relatedMovie-list">{`${relatedMovie.title}, `}</li>;
  });

  // preventDefault for form

  const handleSubmitForm = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <p className="form-paragraph">Aqui puedes añadir cualquier película</p>
      <small>
        Por favor añade el título, la descripción, sube una imagen de la
        película y seleccione las películas relacionadas de las películas
        almacenadas. Al final pincha el botón "Añade la película".
      </small>
      <form
        className="form"
        onSubmit={handleSubmitForm}
        onSubmit={() =>
          addMovie({
            id: uuidv4(),
            movieTitle: movieTitle,
            movieDescription: movieDescription,
            cover: cover,
            tag: relatedMovieId,
            createdAt: timestamp(),
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
          type="text"
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
        <ul>{relatedMoviesList}</ul>
        <button className="form-button-addMovie" type="submit">
          Añade la película
        </button>
      </form>
    </>
  );
}

export default Form;
