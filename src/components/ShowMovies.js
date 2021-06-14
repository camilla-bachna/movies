import { db } from './Firebase';
import { Link } from 'react-router-dom';

function ShowMovies(props) {
  const moviesToShow = props.dataToShow.map((data) => {
    return (
      <li key={data.id} id={data.id} className="container-list">
        <h3 className="container-heading"> {data.title}</h3>
        <p className="container-paragraph">
          {data.description.substring(0, 110) + '...'}
        </p>
        <button
          onClick={() => {
            if (window.confirm('¿Seguro que quieres borrar esta película?')) {
              deleteMovie(data);
            }
          }}
          className="container-delete"
        >
          Eliminar
        </button>
        <Link to={`/updateMovie/${data.id}`}>
          <button className="container-delete">Modificar</button>
        </Link>
      </li>
    );
  });

  //delete movie function

  const ref = db.collection('movies');

  function deleteMovie(movie) {
    ref
      .doc(movie.id)
      .delete()
      .then(() => {
        alert('La película fue borrada');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <>
      <h3 className="showMovies-heading">
        Aqui puedes ver todos los pelícilas añadidas y editarlos o eliminarlos
      </h3>
      <p className="form-paragraph">
        Pincha en el botón "Modificar" para seleccionar la película que quieres
        modificar. El formulario se rellenará automáticamente.
      </p>
      <ul className="container">{moviesToShow}</ul>
    </>
  );
}

export default ShowMovies;
