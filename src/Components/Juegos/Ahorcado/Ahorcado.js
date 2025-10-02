import "./styleAhorcado.css";
import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../../Store/StoreProvider";
import { useNavigate } from "react-router-dom";

const palabrasConPista = [
  {
    palabra: "programacion",
    pista: "Disciplina de crear software y aplicaciones.",
  },
  {
    palabra: "javascript",
    pista: "Lenguaje de programación muy usado en la web.",
  },
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
    pista:
      "Ciencia que estudia las civilizaciones antiguas a través de sus restos.",
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
    pista:
      "Disciplina que estudia cuestiones fundamentales sobre la existencia y el conocimiento.",
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

export default function Ahorcado() {
  const [palabra, setPalabra] = useState("");
  const [pista, setPista] = useState("");
  const [letrasUsadas, setLetrasUsadas] = useState([]);
  const [intentos, setIntentos] = useState(6);
  const [juegoActivo, setJuegoActivo] = useState(true);
  const [resultados, setResultados] = useState(0);
  const [palabrasUsadas, setPalabrasUsadas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const { store } = useContext(StoreContext);
  const { user, token, examen } = store;
  const navigate = useNavigate();

  // Al iniciar el juego
  useEffect(() => {
    const seleccion = obtenerPalabraYPistaSinRepetir();
    setPalabra(seleccion.palabra);
    setPista(seleccion.pista);
    // eslint-disable-next-line
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
      setMostrarModal(true);
      const resultado = {
        usuario: user.name,
        aciertos: palabra.length,
        intentos: intentos,
        fallos: nuevasLetrasUsadas.filter((l) => !palabra.includes(l)).length,
        estado: "Ganó",
        palabra: palabra,
      };

      const resultadoExamen = {
        Id_Estudiane: user.id,
        Id_Examen: examen.id,
        Intentos: intentos,
        Aciertos: palabra.length,
        Fallos: nuevasLetrasUsadas.filter((l) => !palabra.includes(l)).length,
        Notas: 1,
        Recomendaciones: "hola",
      };

      setResultados(resultado);
      guardarResultadosAPI(resultadoExamen);
    } else if (intentos - 1 === 0 && !palabra.includes(letra)) {
      setJuegoActivo(false);
      setMostrarModal(true);
      const resultado = {
        usuario: user.name,
        aciertos: palabra
          .split("")
          .filter((l) => nuevasLetrasUsadas.includes(l)).length,
        intentos: 0,
        fallos: nuevasLetrasUsadas.filter((l) => !palabra.includes(l)).length,
        estado: "Perdió",
        palabra: palabra,
      };

      const resultadoExamen = {
        Id_Estudiane: user.id,
        Id_Examen: examen.id,
        Intentos: intentos,
        Aciertos: palabra.length,
        Fallos: nuevasLetrasUsadas.filter((l) => !palabra.includes(l)).length,
        Notas: 1,
        Recomendaciones: "hola",
      };

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
      const response = await fetch(
        "https://localhost:7248/api/Estudi_Examen/IngresarExa",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.t}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultados),
        }
      );
      if (response.ok) {
        console.log("Resultados guardados exitosamente.");
      } else if (response.status === 401) {
        console.error("Error de autenticación");
      } else {
        throw new Error("Error al guardar los resultados");
      }
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
      return palabrasConPista[
        Math.floor(Math.random() * palabrasConPista.length)
      ];
    }
    const seleccion =
      disponibles[Math.floor(Math.random() * disponibles.length)];
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
        setMostrarModal(false);
        navigate("/examen", { state: { examen } });
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [mostrarModal, navigate, examen]);

  return (
    <>
      <nav
        className="navbar d-flex justify-content-between align-items-center px-4"
        style={{ backgroundColor: "#586068" }}
      >
        <div
          className="logo d-flex align-items-center text-white fw-bold"
          style={{ fontSize: "1.5rem" }}
        >
          <img
            src="/logo_del_sitio.png"
            alt="Logo"
            style={{ height: "60px", marginRight: "8px" }}
          />
          Exa-Gammer - Juego de ahorcado - Examen :{examen.nombre}
        </div>
        <button
          onClick={() => navigate("/menu")}
          className="btn btn-outline-light"
        >
          Volver al menú
        </button>
      </nav>
      <div className="container py-4">
        <div className="row">
          {/* Menú lateral */}
          <div className="col-md-3 mb-4">
            {/* Resultados debajo del menú lateral */}
            <div
              className="card mt-3 border-info"
              style={{ fontSize: "1.35rem" }}
            >
              <div
                className="card-header bg-info text-white text-center p-3"
                style={{ fontSize: "1.5rem" }}
              >
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
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-secondary btn-lg"
                    onClick={() => navigate("/examen")}
                  >
                    Volver al Examen
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
              minWidth: "350px",
            }}
          >
            <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              {resultados?.estado === "Ganó"
                ? "¡Felicidades, ganaste!"
                : "¡Perdiste!"}
            </h1>
            <button
              className="btn btn-primary btn-lg mt-4"
              onClick={() => {
                setMostrarModal(false);
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
