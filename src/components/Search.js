function Search(props) {
  const handleSearch = (event) => {
    props.handleSearchMovie(event.target.name, event.target.value);
    console.log(event.target.name);
  };

  /* preventDefault for form */

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="movieSearch">
        Busca una película:
      </label>
      <input
        className="form-input"
        id="movieSearch"
        type="text"
        onChange={handleSearch}
      />

      <button className="form-button" type="submit">
        Busca
      </button>
    </form>
  );
}

export default Search;
