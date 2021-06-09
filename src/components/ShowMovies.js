import { db } from './Firebase';

function ShowMovies(props) {
  const moviesToShow = props.dataToShow.map((data) => {
    return (
      <li className="container-list">
        <h3 className="container-heading"> {data.title}</h3>
        <p className="container-paragraph">{data.description}</p>
        <p>{data.id}</p>
        <span className="container-relatedMovies">
          Películas relacionadas: {data.relatedMovies}
        </span>
        <button onClick={() => deleteMovie(data)} className="container-delete">
          Eliminar
        </button>
        <button
          className="container-delete"
          onClick={() =>
            editMovie({
              title: data.title,
              description: data.description,
              relatedMovies: data.relatedMovies,
              id: data.id,
            })
          }
        >
          Modificar
        </button>
      </li>
    );
  });

  //delete movie function

  const ref = db.collection('movies');

  function deleteMovie(movie) {
    ref
      .doc(movie.id)
      .delete()
      .catch((error) => {
        alert(error.message);
      });
    console.log(movie.id);
  }

  // edit movie function

  function editMovie(updatedMovie) {
    ref
      .doc(updatedMovie.id)
      .update(updatedMovie)
      .then(() => {
        alert('La película ha sido cambiada');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <h3>
        Aqui puedes ver todos los pelícilas añadidas y editarlos o eliminarlos
      </h3>
      <ul className="container">{moviesToShow}</ul>
    </>
  );
}

export default ShowMovies;
