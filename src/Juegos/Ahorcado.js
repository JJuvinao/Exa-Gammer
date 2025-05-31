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
  {
    palabra: "constitucion",
    pista: "Conjunto de leyes fundamentales de un país.",
  },
  {
    palabra: "arqueologia",
    pista: "Ciencia que estudia las civilizaciones antiguas a través de sus restos.",
  },
  {
    palabra: "biodiversidad",
    pista: "Variedad de especies animales y vegetales en un entorno.",
  },
  {
    palabra: "democracia",
    pista: "Sistema político donde el pueblo elige a sus gobernantes.",
  },
  {
    palabra: "filosofia",
    pista: "Disciplina que estudia cuestiones fundamentales sobre la existencia y el conocimiento.",
  },
  {
    palabra: "literatura",
    pista: "Arte de la expresión escrita o hablada.",
  },
  {
    palabra: "astronomia",
    pista: "Ciencia que estudia los astros y el universo.",
  },
  {
    palabra: "prehistoria",
    pista: "Período anterior a la invención de la escritura.",
  },
  {
    palabra: "ecosistema",
    pista: "Conjunto de seres vivos y su entorno natural.",
  },
  {
    palabra: "mitologia",
    pista: "Conjunto de mitos y leyendas de una cultura.",
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
  const [palabrasUsadas, setPalabrasUsadas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const { store } = useContext(StoreContext);
  const { user, token, examen } = store;

  // Al iniciar el juego
  useEffect(() => {
    const seleccion = obtenerPalabraYPistaSinRepetir();
    setPalabra(seleccion.palabra);
    setPista(seleccion.pista);
    // eslint-disable-next-line
  }, [reinicios]);

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
      setMostrarModal(true); // <-- agrega esto
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
      setMostrarModal(true); // <-- agrega esto
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
      const response = await fetch("https://localhost:7248/api/Estudi_Examen/IngresarExa", {
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

  // Nueva función para obtener palabra sin repetir
  function obtenerPalabraYPistaSinRepetir() {
    const disponibles = palabrasConPista.filter(
      (item) => !palabrasUsadas.includes(item.palabra)
    );
    if (disponibles.length === 0) {
      // Si ya se usaron todas, reinicia la lista
      setPalabrasUsadas([]);
      return palabrasConPista[Math.floor(Math.random() * palabrasConPista.length)];
    }
    const seleccion = disponibles[Math.floor(Math.random() * disponibles.length)];
    setPalabrasUsadas([...palabrasUsadas, seleccion.palabra]);
    return seleccion;
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const letra = event.key.toLowerCase();
      if (/^[a-zñ]$/.test(letra)) {
        manejarClick(letra);
      }
    };
    if (juegoActivo) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line
  }, [juegoActivo, letrasUsadas, intentos, palabra]);

  useEffect(() => {
    const handleEnter = (event) => {
      if (mostrarModal && event.key === "Enter") {
        setJuegoActivo(true);
        setLetrasUsadas([]);
        setIntentos(6);
        setReinicios(reinicios + 1);
        setResultados(null);
        setMostrarModal(false);
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [mostrarModal, reinicios]);

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
                      setMostrarModal(false); // <-- agrega esto
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

      {mostrarModal && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "3rem 2rem",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 0 30px #0008",
        minWidth: "350px"
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        {resultados?.estado === "Ganó" ? "¡Felicidades, ganaste!" : "¡Perdiste!"}
      </h1>
      <p style={{ fontSize: "2rem" }}>
        La palabra era: <strong>{palabra}</strong>
      </p>
      <button
        className="btn btn-primary btn-lg mt-4"
        onClick={() => setMostrarModal(false)}
      >
        Cerrar
      </button>
    </div>
  </div>
)}
    </>
  );
}