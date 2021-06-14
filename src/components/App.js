import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { db } from './Firebase';
import Form from './Form';
import Landing from './Landing';
import Search from './Search';
import ShowMovies from './ShowMovies';
import Pagination from './Pagination';
import MovieDetails from './MovieDetails';
import LastFiveMovies from './LastFiveMovies';
import FormUpdate from './FormUpdate';
import UploadImage from './UploadImage';
import RelatedMovies from './RelatedMovies';
import '../stylesheets/App.css';

function App() {
  const [movieName, setmovieName] = useState('');
  const [dataToShow, setData] = useState([]);
  const [cover, setCover] = useState('');
  const [relatedMoviesArray, setRelatedMoviesArray] = useState([]);

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [moviePerPage] = useState(10);

  // Fetch the data from firebase

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
            tag: doc.data().tag,
          });
        });
        setData(data);
      });

    // Cleanup function

    return () => unsubscribe();
  }, []);

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

  // change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // route movie details

  const renderDetail = (routerProps) => {
    const routerMovieId = routerProps.match.params.id;

    const movieFound = dataToShow.find((movie) => movie.id === routerMovieId);

    // paint details of movies

    if (movieFound) {
      return (
        <MovieDetails
          movieFound={movieFound}
          cover={cover}
          dataToShow={dataToShow}
        ></MovieDetails>
      );
    }
  };

  // route update movie

  const updateMovie = (routerProps) => {
    const routerMovieId = routerProps.match.params.id;

    const movieFound = dataToShow.find((movie) => movie.id === routerMovieId);

    // paint details of movies

    if (movieFound) {
      return (
        <>
          <FormUpdate
            movieFound={movieFound}
            cover={cover}
            setCover={setCover}
            relatedMoviesArray={relatedMoviesArray}
            setRelatedMoviesArray={setRelatedMoviesArray}
          />
          <UploadImage cover={cover} setCover={setCover} />
          <RelatedMovies
            dataToShow={dataToShow}
            relatedMoviesArray={relatedMoviesArray}
            setRelatedMoviesArray={setRelatedMoviesArray}
          />

          <Link to="/showMovie" className="link">
            <h4 className="form-link">Volver a ver todas las películas</h4>
          </Link>
        </>
      );
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>Pagina para cargar/modificar una película</h1>
        <nav className="navigation">
          <ul className="navigation__list">
            <li className="navigation__list--item">
              <Link to="/addMovie">
                <span className="navigation__list--button">
                  Añadir una película
                </span>
              </Link>
            </li>
            <li className="navigation__list--item">
              <Link to="/">
                <span className="navigation__list--button">
                  Volver a la página principal
                </span>
              </Link>
            </li>
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
      <main className="main">
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
            <Form
              dataToShow={dataToShow}
              cover={cover}
              setCover={setCover}
              relatedMoviesArray={relatedMoviesArray}
              setRelatedMoviesArray={setRelatedMoviesArray}
            />
            <UploadImage cover={cover} setCover={setCover} />
            <RelatedMovies
              dataToShow={dataToShow}
              relatedMoviesArray={relatedMoviesArray}
              setRelatedMoviesArray={setRelatedMoviesArray}
            />

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
      <footer className="footer">
        <small>Camilla &copy; 2021</small>
      </footer>
    </div>
  );
}

export default App;
