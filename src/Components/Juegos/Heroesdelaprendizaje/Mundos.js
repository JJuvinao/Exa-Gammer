import "./stylesheroes.css";
import { useNavigate, useLocation } from "react-router-dom";
import mundo1 from "./imagenes/Fondos/fondomontaña.png";
import mundo2 from "./imagenes/Fondos/fondopradera.png";
import mundo3 from "./imagenes/Fondos/fondocastillo.jpg";

export default function Mundos() {
  const navigate = useNavigate();
  const location = useLocation();
  const personaje = location.state?.personaje;
  const img_personaje = location.state?.img_personaje;

  return (
    <div className="row no-gutters main-container-mundo">
      <main className=" p-2 bg-grey text-black">
        <div className="seccion-mundo mt-4">
          {/* Contenido de la sección inferior */}
          <h3>Seleccionar Mundo</h3>
          <div className="mundo-contenedor">
            <div
              className="mundo-personaje card h-10 border-black "
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/heroes/escenario", {
                  state: {
                    img_mundo: mundo1,
                    personaje: personaje,
                    img_personaje: img_personaje,
                  },
                });
              }}
            >
              <img
                src={mundo1}
                className="imag-tamaño-mundo"
                alt="personajes"
              />
              <div className="card-body">
                <h5 className="card-title text-center">Montaña</h5>
              </div>
            </div>

            <div
              className="mundo-personaje card h-10 border-black "
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/heroes/escenario", {
                  state: {
                    img_mundo: mundo2,
                    personaje: personaje,
                    img_personaje: img_personaje,
                  },
                });
              }}
            >
              <img
                src={mundo2}
                className="imag-tamaño-mundo"
                alt="personajes"
              />
              <h5 className="card-title text-center">Pradera</h5>
            </div>

            <div
              className="mundo-personaje card h-10 border-black "
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/heroes/escenario", {
                  state: {
                    img_mundo: mundo3,
                    personaje: personaje,
                    img_personaje: img_personaje,
                  },
                });
              }}
            >
              <img
                src={mundo3}
                className="imag-tamaño-mundo"
                alt="personajes"
              />
              <div className="card-body">
                <h5 className="card-title text-center">Valle</h5>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
