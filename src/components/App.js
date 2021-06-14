import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import '../stylesheets/App.css';
import Form from './Form';
import Landing from './Landing';
import Search from './Search';
import ShowMovies from './ShowMovies';
import Pagination from './Pagination';
import { db } from './Firebase';
import MovieDetails from './MovieDetails';
import LastFiveMovies from './LastFiveMovies';
import FormUpdate from './FormUpdate';
import UploadImage from './UploadImage';
import RelatedMovies from './RelatedMovies';

function App() {
  const [movieName, setmovieName] = useState('');
  const [dataToShow, setData] = useState([]);
  const [cover, setCover] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [moviePerPage] = useState(10);

  // Fetch the data from firebase when the commponent is mounted
  useEffect(() => {
    const unsubscribe = db
      .collection('movies')
      .orderBy('createdAt')
      .onSnapshot(function (querySnapshot) {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.data().id,
            title: doc.data().movieTitle,
            description: doc.data().movieDescription,
            cover: doc.data().cover,
            relatedMovies: doc.data().relatedMovies,
          });
        });
        setData(data);
      });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  /* console.log(dataToShow); */
  // search movie

  const handleSearchMovie = (inputKey, inputValue) => {
    if (inputKey === 'movieName') {
      setmovieName(inputValue);
    }
  };

  const searchMovies = dataToShow.filter((movieSearched) => {
    return movieSearched.title.toLowerCase().includes(movieName.toLowerCase());
  });

  // Pagination
  const indexOfLastMovie = currentPage * moviePerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviePerPage;
  const currentMovie = searchMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  /* console.log(searchMovies); */

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // route movie details

  const renderDetail = (routerProps) => {
    const routerMovieId = routerProps.match.params.id;

    const movieFound = dataToShow.find((movie) => movie.id === routerMovieId);

    // paint details of movies

    if (movieFound) {
      return (
        <MovieDetails movieFound={movieFound} cover={cover}></MovieDetails>
      );
    }
  };

  // route update movie

  const updateMovie = (routerProps) => {
    const routerMovieId = routerProps.match.params.id;

    const movieFound = dataToShow.find((movie) => movie.id === routerMovieId);

    // paint details of movies

    if (movieFound) {
      return <FormUpdate movieFound={movieFound} />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-heading">
          Pagina para cargar/modificar una película
        </h1>
        <nav className="navigation">
          <ul className="navigation__list">
            <li className="navigation__list--item">
              <Link to="/addMovie">
                <span className="navigation__list--button">
                  Añade una película
                </span>
              </Link>
            </li>
            <li className="navigation__list--item"></li>
            <li className="navigation__list--item">
              <Link to="/showMovie">
                <span className="navigation__list--button">
                  Editar o eliminar las películas
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="App-main">
        <Switch>
          <Route exact path="/">
            <LastFiveMovies dataToShow={dataToShow} />
            <div className="landing">
              <Landing />
              <Search
                handleSearchMovie={handleSearchMovie}
                movieName={movieName}
                searchMovies={currentMovie}
              />
              <Pagination
                moviePerPage={moviePerPage}
                totalMovies={searchMovies.length}
                paginate={paginate}
              />
            </div>
          </Route>
          <Route path="/movie/:id" render={renderDetail}></Route>
          <Route path="/addMovie">
            <Form dataToShow={dataToShow} cover={cover} setCover={setCover} />
            <UploadImage cover={cover} setCover={setCover} />
            <RelatedMovies dataToShow={dataToShow} />
            <Link to="/" className="link">
              <h4 className="form-link">Volver a la página principal</h4>
            </Link>
          </Route>
          <Route path="/updateMovie/:id" render={updateMovie}></Route>
          <Route path="/showMovie">
            <ShowMovies dataToShow={dataToShow} />
            <Link to="/" className="link">
              <h4 className="form-link">Volver a la página principal</h4>
            </Link>
          </Route>
        </Switch>
      </main>
      <footer className="App-footer">
        <small>Camilla @2021</small>
      </footer>
    </div>
  );
}

export default App;
