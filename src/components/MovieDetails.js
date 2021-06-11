import { Link } from 'react-router-dom';

function MovieDetails(props) {
  return (
    <>
      <li className="container-moviedetails-list" key={props.movieFound.id}>
        <img
          src={props.movieFound.cover}
          className="container-moviedetails-image"
        ></img>
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
