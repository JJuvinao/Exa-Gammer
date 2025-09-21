import "./stylesheroes.css";
import { useNavigate } from "react-router-dom";
import guerrero from "./imagenes/Guerrero/GuerreroIdle.gif";
import mago from "./imagenes/Mago/MagoIdle.gif";
import samurai from "./imagenes/Samurai/SamuraiIdle.gif";
import idlesamu from "./imagenes/Samurai/SamuraiIdle.gif";
import idleguerrero from "./imagenes/Guerrero/GuerreroIdle.gif";
import idlemago from "./imagenes/Mago/MagoIdle.gif";

export default function MenuPrin() {
  const navigate = useNavigate();

  return (
    <div className="row no-gutters main-container">
      <nav
        className="col-md-3 bg-grey p-3 min-vh-100  text-black "
        style={{
          borderWidth: "4px",
          borderStyle: "solid",
          borderColor: "#040404ff",
        }}
      >
        <div className="text-center mb-4">
          <img
            src="/avatars/avatar1.jpg"
            alt="Perfil"
            className="rounded-circle mb-3 border border-secondary"
            width="200"
            height="200"
            style={{
              borderWidth: "6px",
              borderStyle: "solid",
              borderColor: "#040404ff",
            }}
          />
          <h5>Preba</h5>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <p className="text-center mb-4">Rol:</p>
            <p className="text-center mb-4">Administrador</p>
            <p className="text-center mb-4">Correo:</p>
            <p className="text-center mb-4">pruebas@pruebas.com</p>
          </li>
        </ul>
      </nav>

      <main className="col-md-9 p-2 bg-grey text-black">
        <div className="seccion-superior">
          {/* Contenido de la sección superior */}
          <h3>Puntaje</h3>
        </div>
        <div className="seccion-inferior mt-4">
          {/* Contenido de la sección inferior */}
          <h3>Seleccionar personajes</h3>
          <div className="personajes-contenedor">
            <div
              className="seleccion-personaje card h-10 border-black "
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/heroes/mundos", {
                  state: { personaje: "Mago", img_personaje: idlemago },
                });
              }}
            >
              <img src={mago} className="imag-tamaño" alt="personajes" />
              <div className="card-body">
                <h5 className="card-title text-center">Mago</h5>
              </div>
            </div>

            <div
              className="seleccion-personaje card h-10 border-black "
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/heroes/mundos", {
                  state: { personaje: "Guerrero", img_personaje: idleguerrero },
                });
              }}
            >
              <img src={guerrero} className="imag-tamaño" alt="personajes" />
              <h5 className="card-title text-center">Guerrero</h5>
            </div>

            <div
              className="seleccion-personaje card h-10 border-black "
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/heroes/mundos", {
                  state: { personaje: "Samurai", img_personaje: idlesamu },
                });
              }}
            >
              <img src={samurai} className="imag-tamaño" alt="personajes" />
              <div className="card-body">
                <h5 className="card-title text-center">Samurai</h5>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
