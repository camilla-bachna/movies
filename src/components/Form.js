import { useState, useEffect } from 'react';
import { db } from './Firebase';
import firebase from 'firebase';

import { v4 as uuidv4 } from 'uuid';

function Form(props) {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [relatedMovies, setRelatedMovies] = useState('');
  const [dataShow, setData] = useState([]);
  const cover = props.cover;
  const setCover = props.setCover;

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
    setRelatedMovies('');
  }

  /* preventDefault for form */

  const handleSubmitForm = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <p>Aqui puedes añadir cualquier película</p>
      <form
        className="form"
        onSubmit={handleSubmitForm}
        onSubmit={() =>
          addMovie({
            id: uuidv4(),
            movieTitle: movieTitle,
            movieDescription: movieDescription,
            cover: cover,
            relatedMovies: relatedMovies,
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
    </>
  );
}

export default Form;
