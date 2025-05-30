import "./styleAhorcado.css";
import { useState, useContext } from "react";
import { StoreContext } from "../Store/StoreProvider";
import NaNvbar from "../Components/Navbar";

export default function Ahorcado() {
  const [palabra, setPalabra] = useState("programacion");
  const [letrasUsadas, setLetrasUsadas] = useState([]);
  const [intentos, setIntentos] = useState(6);
  const [juegoActivo, setJuegoActivo] = useState(true);
  const [reinicios, setReinicios] = useState(0);

  const { store } = useContext(StoreContext);
  const { user } = store;

  const manejarClick = (letra) => {
    if (!juegoActivo || letrasUsadas.includes(letra)) return;

    const nuevasLetrasUsadas = [...letrasUsadas, letra];
    setLetrasUsadas(nuevasLetrasUsadas);

    if (!palabra.includes(letra)) {
      setIntentos(intentos - 1);
    }

    const palabraRenderizada = palabra
      .split("")
      .map((letra) => (nuevasLetrasUsadas.includes(letra) ? letra : "_"))
      .join("");

    if (!palabraRenderizada.includes("_")) {
      alert("¡Ganaste!");
      setJuegoActivo(false);
    } else if (intentos - 1 === 0 && !palabra.includes(letra)) {
      alert("¡Perdiste! La palabra era: " + palabra);
      setJuegoActivo(false);
    }
  };

  const renderizarPalabra = () => {
    return palabra
      .split("")
      .map((letra) => (letrasUsadas.includes(letra) ? letra : "_"))
      .join(" ");
  };

  return (
    <>
    <NaNvbar />
    <div className="container py-4">
      <div className="row">
        {/* Menú lateral */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm bg-light">
            <div className="card-body">
              <h5 className="card-title mb-3">Menú</h5>
              <ul className="list-group mb-3">
                <li className="list-group-item">Palabra</li>
                <li className="list-group-item">Oración</li>
                <li className="list-group-item">Párrafo</li>
              </ul>
              <p className="text-muted mb-0">
                <small>Desarrollado por: {user.name}</small>
              </p>
            </div>
          </div>
        </div>

        {/* Juego */}
        <div className="col-md-9">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h2 className="mb-0">Ahorcado</h2>
            </div>
            <div className="card-body">
              <p className="palabra fs-4 text-center">
                Palabra: <span className="fw-bold">{renderizarPalabra()}</span>
              </p>
              <p className="text-center">
                <span className="badge bg-warning text-dark fs-5">
                  Intentos restantes: {intentos}
                </span>
              </p>
              <div className="letras d-flex flex-wrap justify-content-center gap-2 mb-3">
                {"abcdefghijklmnopqrstuvwxyz".split("").map((letra) => (
                  <button
                    key={letra}
                    onClick={() => manejarClick(letra)}
                    disabled={!juegoActivo || letrasUsadas.includes(letra)}
                    className={`btn btn-outline-dark btn-sm m-1 ${
                      letrasUsadas.includes(letra) ? "disabled" : ""
                    }`}
                    style={{ width: "36px", height: "36px", fontWeight: "bold" }}
                  >
                    {letra}
                  </button>
                ))}
              </div>
              <div className="text-center mb-3">
                <span className="text-secondary">Reinicios: {reinicios}</span>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-success btn-lg"
                  disabled={juegoActivo}
                  onClick={() => {
                    setJuegoActivo(true);
                    setLetrasUsadas([]);
                    setIntentos(6);
                    setReinicios(reinicios + 1);
                  }}
                >
                  Reiniciar Juego
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}