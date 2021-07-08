function ShowMovies(props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalMovies / props.moviePerPage); i++) {
    pageNumbers.push(i);
  }

  const pageNumber = pageNumbers.map((number) => {
    return (
      <li key={number} className="pagination-list">
        <a
          onClick={() => props.paginate(number)}
          href="#"
          className="pagination-link"
        >
          {number}
        </a>
      </li>
    );
  });

  return (
    <>
      <ul className="pagination-container">{pageNumber}</ul>
    </>
  );
}

export default ShowMovies;
