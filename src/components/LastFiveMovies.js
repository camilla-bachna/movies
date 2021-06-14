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
        <img src={lastmovie.cover} className="container-image"></img>
        <h3 className="container-heading"> {lastmovie.title}</h3>
      </li>
    );
  });

  return (
    <ul className="container">
      <h3 className="heading">Las 5 últimas películas añadidas</h3>
      <Carousel>{slider}</Carousel>
    </ul>
  );
}

export default LastFiveMovies;
