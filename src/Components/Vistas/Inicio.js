import "./stylesApi.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../Store/StoreProvider";

export default function Inicio() {
  const { store } = useContext(StoreContext);
  const { user } = store;
  const navigate = useNavigate();

  const handleComenzarClick = () => {
    if (user) {
      navigate("/menu");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <section className="home-container">
        <div className="text-content">
          <h1>
            Conocimiento
            <br />
            sin límites.
            <br />
            educación
            <br />
            para todos.
          </h1>
          <p>
            Creemos que la educación debe ser un derecho accesible para todos.
            Nuestro enfoque está centrado en proporcionar un aprendizaje de
            calidad que fomente el desarrollo académico y personal de cada
            estudiante...
          </p>
        </div>
      </section>

      <div className="text-center my-5">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleComenzarClick}
        >
          Comenzar
        </button>
      </div>

      <footer className="home-container-footer">
        <p>&copy; 2025 Exa-Gammer. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
