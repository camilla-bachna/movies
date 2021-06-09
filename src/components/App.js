import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../stylesheets/App.css';
import Form from './Form';
import Landing from './Landing';
import Search from './Search';
import ShowMovies from './ShowMovies';
import { db } from './Firebase';

function App() {
  const [movieName, setmovieName] = useState('');
  const [dataToShow, setData] = useState([]);
  // Fetch the data from firebase when the commponent is mounted
  useEffect(() => {
    const unsubscribe = db
      .collection('movies')
      .onSnapshot(function (querySnapshot) {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            title: doc.data().movieTitle,
            description: doc.data().movieDescription,
            relatedMovies: doc.data().relatedMovies,
          });
        });
        setData(data);
      });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  /* search movie */

  const handleSearchMovie = (inputKey, inputValue) => {
    if (inputKey === 'movieName') {
      setmovieName(inputValue);
    }
  };

  const searchMovies = dataToShow.filter((movieSearched) => {
    return movieSearched.title.toLowerCase().includes(movieName.toLowerCase());
  });

  console.log(searchMovies);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pagina para cargar/modificar una película</h1>
      </header>
      <main className="App-main">
        <Switch>
          <Route exact path="/">
            <Landing />
            <Search
              handleSearchMovie={handleSearchMovie}
              movieName={movieName}
              searchMovies={searchMovies}
            />
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
