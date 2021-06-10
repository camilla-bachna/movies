import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';

function LastFiveMovies(props) {
  // lastFiveMovies slider
  let lastFiveMovies = props.dataToShow.slice(
    Math.max(props.dataToShow.length - 5, 1)
  );
  const slider = lastFiveMovies.map((lastmovie) => {
    return (
      <li className="container-list">
        <h3 className="container-heading"> {lastmovie.title}</h3>
        <span className="container-relatedMovies">
          Películas relacionadas: {lastmovie.relatedMovies}
        </span>
      </li>
    );
  });

  return (
    <ul className="container">
      <h3>Las 5 últimas películas añadidas</h3>
      <Carousel>{slider}</Carousel>
    </ul>
  );
}

export default LastFiveMovies;