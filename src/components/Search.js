function Search(props) {
  const handleSearch = (event) => {
    props.handleSearchMovie(event.target.name, event.target.value);
  };

  /* preventDefault for form */

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const searchedMovies = props.searchMovies.map((movie) => {
    return (
      <li className="container-list">
        <h3 className="container-heading"> {movie.title}</h3>
        <p className="container-paragraph">{movie.description}</p>
        <span className="container-relatedMovies">
          Películas relacionadas: {movie.relatedMovies}
        </span>
      </li>
    );
  });

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="movieSearch">
          Busca una película:
        </label>
        <input
          className="form-input"
          id="movieSearch"
          name="movieName"
          type="text"
          value={props.movieName}
          placeholder="Nombre de la película"
          onChange={handleSearch}
        />
      </form>
      <ul className="container">{searchedMovies}</ul>
    </>
  );
}

export default Search;
