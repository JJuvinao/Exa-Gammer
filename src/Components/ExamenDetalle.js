import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../Store/StoreProvider";
import { types } from "../Store/StoreReducer";
import Navbar from "./Navbar";

export default function ExamenDetalle() {
  const navigate = useNavigate();
  const { dispatch } = useContext(StoreContext);
  const { store } = useContext(StoreContext);
  const { user, token, examen } = store;

  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchResultados = async () => {
      // Asegúrate de que tenemos un ID de examen
      if (!examen?.id) return;

      cargarResultados();
    };

    fetchResultados();
  }, []);

  if (!examen) {
    return <p className="text-center mt-5">No hay examen seleccionado.</p>;
  }

  const entrarAlExamen = () => {
    navigate("/juego");
  };

  const cargarResultados = async () => {
    setCargando(true);
    try {
      const est_exa = {
        Id_Estudiane: user.id,
        Id_Examen: examen.id,
      };
      const res = await fetch(
        `https://localhost:7248/api/Estudi_Examen/get_estu_exa`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.t}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(est_exa),
        }
      );

      if (res.ok) {
        setResultados(await res.json());
        setCargando(true);
      } else if (res.status === 401) {
        throw new Error("No autorizado");
      } else {
        throw new Error("Error al cargar los resultados");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-4">
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
          Exa-Gammer - Examne: {examen.nombre}
        </div>
        <button
          onClick={() => navigate("/menu")}
          className="btn btn-outline-light"
        >
          Volver al menú
        </button>
      </nav>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">{examen.nombre}</h2>
          <p>
            <strong>Código:</strong> {examen.codigo}
          </p>
          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(examen.fecha).toLocaleDateString()}
          </p>
          <p>
            <strong>Descripción:</strong>{" "}
            {examen.descripcion || "Sin descripción."}
          </p>

          <button className="btn btn-success mt-3" onClick={entrarAlExamen}>
            Ingresar al Examen
          </button>
          <button
            className="btn btn-secondary mt-3 ms-3"
            onClick={() => navigate(-1)}
          >
            V olver
          </button>
        </div>
      </div>

      {/* Sección de Resultados */}
      <div className="card shadow mt-4">
        <div className="card-body">
          <h3 className="card-title">Resultados del Examen</h3>

          {/* 4. Manejo de casos (carga, resultados, sin resultados) */}
          {cargando ? (
            <p>Cargando resultados...</p>
          ) : resultados.length > 0 ? (
            <div className="list-group">
              {resultados.map((r) => (
                <div
                  key={r.id}
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <small>
                      Nota:{" "}
                      <span className="badge bg-primary rounded-pill">
                        {r.nota}
                      </span>
                    </small>
                  </div>
                  <p className="mb-1">
                    <strong>Intentos:</strong> {r.intentos} |
                    <strong> Aciertos:</strong> {r.aciertos} |
                    <strong> Fallos:</strong> {r.fallos}
                  </p>
                  <small>
                    <strong>Recomendación:</strong>{" "}
                    {r.recomendacion || "Ninguna"}
                  </small>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay resultados para mostrar.</p>
          )}
        </div>
      </div>
    </div>
  );
}
