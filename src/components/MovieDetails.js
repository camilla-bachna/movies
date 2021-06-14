import { Link } from 'react-router-dom';

function MovieDetails(props) {
  const finalmovies = [];
  const relatedMovies = props.movieFound.tag.map((relatedMovie) => {
    const finalrelatedMovies = props.dataToShow.map((finalrelatedMovie) => {
      if (finalrelatedMovie.id === relatedMovie) {
        finalmovies.push(finalrelatedMovie);
      }
    });

    return finalmovies;
  });

  const finalMovie = finalmovies.map((finalMovie) => {
    return (
      <li className="container-list-movieDetails">
        <img src={finalMovie.cover} className="container-image"></img>
        <h3>{finalMovie.title}</h3>
      </li>
    );
  });

  return (
    <>
      <li className="container-moviedetails-list" key={props.movieFound.id}>
        <img
          src={props.movieFound.cover}
          className="container-moviedetails-image"
        ></img>
        <h3 className="container-heading"> {props.movieFound.title}</h3>
        <p className="container-paragraph">{props.movieFound.description}</p>
      </li>
      <h3>Películas relacionadas:</h3>
      <ul className="container">{finalMovie}</ul>
      <Link to="/" className="link">
        <h4 className="form-link">Volver a la página principal</h4>
      </Link>
    </>
  );
}

export default MovieDetails;
