import { Link } from 'react-router-dom';

function ShowMovies(props) {
  const moviesToShow = props.dataToShow.map((data) => {
    return (
      <li className="container-list">
        <h3 className="container-heading"> {data.title}</h3>
        <p className="container-paragraph">{data.description}</p>
        <span className="container-relatedMovies">
          Películas relacionadas: {data.relatedMovies}
        </span>
      </li>
    );
  });

  return (
    <>
      <h2> Hola! </h2>
      <h3>
        Aqui puedes ver todos los pelícilas añadidas y editarlos o eliminarlos
      </h3>
      <ul className="container">{moviesToShow}</ul>
      <Link to="/" className="link">
        <h4 className="form-link">Volver a la página principal</h4>
      </Link>
    </>
  );
}

export default ShowMovies;
