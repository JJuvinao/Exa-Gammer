import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../Store/StoreProvider";
import { types } from "../../Store/StoreReducer";
import ConteExam from "./ConteExam";

export default function ExamenDetalle() {
  const navigate = useNavigate();
  const { store, dispatch } = useContext(StoreContext);
  const { user, token, examen } = store;

  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchResultados = async () => {
      // Asegúrate de que tenemos un ID de examen
      if (!examen?.id) return;

      cargarResultados();
    };
    if (user?.rol === "Profesor") {
      CragarUsuariosExamen();
    }

    fetchResultados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!examen) {
    return <p className="text-center mt-5">No hay examen seleccionado.</p>;
  }

  const entrarAlExamen = () => {
    navigate("/juego");
  };

  const CragarUsuariosExamen = async () => {
    try {
      const response = await fetch(
        `https://localhost:7248/api/Estudi_Examen/UsersExamen/${examen.id}`,
        {
          headers: {
            Authorization: `Bearer ${token.t}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          console.warn("No se encontraron usuarios para este examen.");
          return; // No sigue ejecutando
        }
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al cargar los examenes", error);
    }
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

  const cargaruserresul = (iduser, nombre) => {
    const estu_exa = {
      id_user: iduser,
      id_examen: examen.id,
      nombre_user: nombre,
    };
    dispatch({ type: types.SET_USERRESUL, payload: estu_exa });
    navigate("/resultados");
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
            onClick={() => navigate("/clase")}
          >
            V olver
          </button>
        </div>
      </div>

      {/* Seccu¿ion de Contenido del examen, solo docentes*/}
      {user?.rol === "Profesor" && (
        <ConteExam
          codigo={examen.codigo}
          token={token.t}
          id_Juego={examen.id_juego}
        />
      )}

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

      {/* sección de clalificar estudiantes */}
      {user?.rol === "Profesor" && (
        <div className="container mt-4">
          <h3>Estudiantes registrados en la clase</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((est, idx) => (
                  <tr key={est.id || idx}>
                    <td>{est.id}</td>
                    <td>{est.nombre}</td>
                    <td>{est.rol}</td>
                    <td>{est.correo}</td>
                    <td>
                      <button
                        onClick={() => cargaruserresul(est.id, est.nombre)}
                        className="btn btn-outline-light btn-sm ms-3 border-primary text-primary"
                      >
                        Calificar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No hay estudiantes registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
