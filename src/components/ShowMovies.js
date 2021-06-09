import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from './Firebase';

function ShowMovies() {
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

  const moviesToShow = dataToShow.map((data) => {
    return (
      <li className="container-list">
        <h3 className="container-heading"> {data.title}</h3>
        <p className="container-paragraph">{data.description}</p>
        <span className="container-relatedMovies">
          Películas relacionadas: {data.relatedMovies}
        </span>
      </li>
    );
  });

  return (
    <>
      <h2> Hola! </h2>
      <h3>
        Aqui puedes ver todos los pelícilas añadidas y editarlos o eliminarlos
      </h3>
      <ul className="container">{moviesToShow}</ul>
      <Link to="/" className="link">
        <h4 className="form-link">Volver a la página principal</h4>
      </Link>
    </>
  );
}

export default ShowMovies;
