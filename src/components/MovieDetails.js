import { Link } from 'react-router-dom';

function MovieDetails(props) {
  return (
    <>
      <li className="container-list">
        <h3 className="container-heading"> {props.movieFound.title}</h3>
        <p className="container-paragraph">{props.movieFound.description}</p>
        <span className="container-relatedMovies">
          Películas relacionadas: {props.movieFound.relatedMovies}
        </span>
      </li>
      <Link to="/" className="link">
        <h4 className="form-link">Volver a la página principal</h4>
      </Link>
    </>
  );
}

export default MovieDetails;
