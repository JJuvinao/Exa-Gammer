import "./stylesApi.css";
import Navbar from "./Navbar";

export default function Inicio() {
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
      <footer className="home-container-footer">
        <p>&copy; 2025 Exa-Gammer. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}