import "./styleAhorcado.css";
import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../Store/StoreProvider";
import NaNvbar from "../Components/Navbar";

const palabrasConPista = [
  {
    palabra: "programacion",
    pista: "Disciplina de crear software y aplicaciones.",
  },
  { palabra: "javascript", pista: "Lenguaje de programación muy usado en la web." },
  {
    palabra: "computadora",
    pista: "Dispositivo electrónico para procesar datos.",
  },
  {
    palabra: "desarrollo",
    pista: "Proceso de creación y mejora de software.",
  },
  {
    palabra: "internet",
    pista: "Red global que conecta millones de computadoras.",
  },
  {
    palabra: "algoritmo",
    pista: "Conjunto de pasos para resolver un problema.",
  },
  {
    palabra: "variable",
    pista: "Espacio donde se almacena información temporalmente.",
  },
  {
    palabra: "funcion",
    pista: "Bloque de código reutilizable que realiza una tarea.",
  },
  {
    palabra: "react",
    pista: "Librería de JavaScript para construir interfaces de usuario.",
  },
  {
    palabra: "frontend",
    pista: "Parte visual de una aplicación web, vista por el usuario.",
  },
];

function obtenerPalabraYPistaAleatoria() {
  const indice = Math.floor(Math.random() * palabrasConPista.length);
  return palabrasConPista[indice];
}

export default function Ahorcado() {
  const [palabra, setPalabra] = useState("");
  const [pista, setPista] = useState("");
  const [letrasUsadas, setLetrasUsadas] = useState([]);
  const [intentos, setIntentos] = useState(6);
  const [juegoActivo, setJuegoActivo] = useState(true);
  const [reinicios, setReinicios] = useState(0);
  const [resultados, setResultados] = useState(null);

  const { store } = useContext(StoreContext);
  const { user, token, examen } = store;

  // Al iniciar el juego
  useEffect(() => {
    const seleccion = obtenerPalabraYPistaAleatoria();
    setPalabra(seleccion.palabra);
    setPista(seleccion.pista);
  }, []);

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
      setJuegoActivo(false);
      const resultado = {
        usuario: user.name,
        aciertos: palabra.length,
        intentos: intentos,
        fallos: nuevasLetrasUsadas.filter((l) => !palabra.includes(l)).length,
        estado: "Ganó",
        palabra: palabra
      };

      const resultadoExamen = {
        id_Estudiane: user.id,
        id_Examen: examen.id,
        intentos: intentos,
        aciertos: palabra.length,
        fallos: nuevasLetrasUsadas.filter((l) => !palabra.includes(l)).length,
    }

      setResultados(resultado);
      guardarResultadosAPI(resultadoExamen);
    } else if (intentos - 1 === 0 && !palabra.includes(letra)) {
      setJuegoActivo(false);
      const resultado = {
        usuario: user.name,
        aciertos: palabra.split("").filter((l) => nuevasLetrasUsadas.includes(l)).length,
        intentos: 0,
        fallos: nuevasLetrasUsadas.filter((l) => !palabra.includes(l)).length,
        estado: "Perdió",
        palabra: palabra
      };

      const resultadoExamen = {
        id_Estudiane: user.id,
        id_Examen: examen.id,
        intentos: intentos,
        aciertos: palabra.length,
        fallos: nuevasLetrasUsadas.filter((l) => !palabra.includes(l)).length,
    }

      setResultados(resultado);
      guardarResultadosAPI(resultadoExamen);
    }
  };

  const renderizarPalabra = () => {
    return palabra
      .split("")
      .map((letra) => (letrasUsadas.includes(letra) ? letra : "_"))
      .join(" ");
  };

  async function guardarResultadosAPI(resultados) {
    try {
      const response = await fetch("https://localhost:7248/api/Clases/Profe_Clases/IngresarExa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Si tu API requiere autenticación
        },
        body: JSON.stringify(resultados)
      });
      if (!response.ok) {
        throw new Error("Error al guardar los resultados");
      }
      // Opcional: manejar respuesta
      // const data = await response.json();
    } catch (error) {
      console.error("Error al guardar resultados:", error);
    }
  }

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
            <p className="text-muted mb-0"> En proceso desarrollo</p>
            {/* Resultados debajo del menú lateral */}
            {resultados && (
              <div className="card mt-3 border-info" style={{ fontSize: "1.35rem" }}>
                <div className="card-header bg-info text-white text-center p-3" style={{ fontSize: "1.5rem" }}>
                  <strong>Resultados</strong>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item py-3">
                    <strong>Aciertos:</strong> {resultados.aciertos}
                  </li>
                  <li className="list-group-item py-3">
                    <strong>Intentos restantes:</strong> {resultados.intentos}
                  </li>
                  <li className="list-group-item py-3">
                    <strong>Fallos:</strong> {resultados.fallos}
                  </li>
                  <li className="list-group-item py-3">
                    <strong>Estado:</strong> {resultados.estado}
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Juego */}
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-header bg-primary text-white text-center">
                <h2 className="mb-0">Ahorcado</h2>
              </div>
              <div className="card-body">
                <p className="palabra text-center my-4">
                  Palabra:{" "}
                  <span
                    className="fw-bold"
                    style={{ fontSize: "3rem", letterSpacing: "0.5em" }}
                  >
                    {renderizarPalabra()}
                  </span>
                </p>
                <p className="text-center">
                  <span className="badge bg-warning text-dark fs-5">
                    Intentos restantes: {intentos}
                  </span>
                </p>
                <p className="text-center mb-3">
                  <span className="badge bg-info text-dark fs-6">
                    Pista: {pista}
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
                      style={{
                        width: "36px",
                        height: "36px",
                        fontWeight: "bold",
                      }}
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
                      setResultados(null);
                      const seleccion = obtenerPalabraYPistaAleatoria();
                      setPalabra(seleccion.palabra);
                      setPista(seleccion.pista);
                    }}
                  >
                    Reiniciar Juego
                  </button>
                </div>
                {/* Mostrar la palabra al finalizar el juego */}
                {!juegoActivo && (
                  <div className="alert alert-info mt-4 text-center">
                    <strong>La palabra era:</strong>
                    <span
                      style={{
                        fontSize: "2.5rem",
                        marginLeft: "10px",
                        letterSpacing: "0.3em",
                      }}
                    >
                      {palabra}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}