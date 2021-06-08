import React from 'react';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../stylesheets/App.css';
import Form from './Form';
import Landing from './Landing';
import Search from './Search';
import ShowMovies from './ShowMovies';

function App() {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState('');

  /* search movie */

  const handleSearchMovie = (inputKey, inputValue) => {
    if (inputKey === 'name') {
      setName(inputValue);
    }
  };

  const searchMovies = movies.filter((movieSearched) => {
    return movieSearched.movieTitle.toLowerCase().includes(name.toLowerCase());
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pagina para cargar/modificar una película</h1>
      </header>
      <main className="App-main">
        <Switch>
          <Route exact path="/">
            <Landing />
            <Search handleSearchMovie={handleSearchMovie} />
          </Route>
          <Route path="/addMovie">
            <Form />
          </Route>
          <Route path="/showMovie">
            <ShowMovies />
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
