import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <h2> Bienvenido! </h2>
      <p>Puedes añadir, editar o eliminar películas e información detallada</p>
      <Link to="/addMovie">
        <button className="landing-button-add">Añade una película</button>
      </Link>
      <Link to="/showMovie">
        <button className="landing-button-show">
          Mostrar todas las películas
        </button>
      </Link>
    </div>
  );
}

export default Landing;
