import "./stylesApi.css";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../Store/StoreProvider";
import { useNavigate } from "react-router-dom";
import { types } from "../../Store/StoreReducer";

export default function Clase() {
  const [examenes, setExamenes] = useState([]);
  const [users, setUsers] = useState([]);
  const { store, dispatch } = useContext(StoreContext);
  const { user, token, clase } = store;
  const navigate = useNavigate();

  useEffect(() => {
    if (clase?.id_clase) {
      cargarExamenes();
      CragarUsuariosClase();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clase]);

  const verExamen = (examen) => {
    const exa = {
      id: examen.id_Examen,
      nombre: examen.nombre,
      tema: examen.tema,
      autor: examen.autor,
      descripcion: examen.descripcion,
      codigo: examen.codigo,
      fecha: examen.fechaCreacion,
      imagenexamen: examen.imagenExamen,
      id_juego: examen.id_Juego,
    };
    dispatch({ type: types.SET_EXAMEN, payload: exa });

    navigate("/examen");
  };

  const cargarExamenes = async () => {
    try {
      const response = await fetch(
        `https://localhost:7248/api/Examenes/ExamenesClase/${clase.id_clase}`,
        {
          headers: {
            Authorization: `Bearer ${token.t}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setExamenes(data);
      } else {
        console.error(await response.text());
      }
    } catch (error) {
      console.error("Error al cargar los examenes", error);
    }
  };

  const CragarUsuariosClase = async () => {
    try {
      const response = await fetch(
        `https://localhost:7248/api/Estudi_Clases/usersclase/${clase.id_clase}`,
        {
          headers: {
            Authorization: `Bearer ${token.t}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else if (response.status === 404) {
        console.error(await response.text());
      }
    } catch (error) {
      console.error("Error al cargar los examenes", error);
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
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
          Exa-Gammer - Clase: {clase.name}
        </div>
        <button
          onClick={() => navigate("/menu")}
          className="btn btn-outline-light"
        >
          Volver al menú
        </button>
      </nav>

      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-3 bg-light p-3 min-vh-100">
          <div className="text-center mb-4">
            <img
              src={clase.imagen || "https://via.placeholder.com/100"}
              alt="Perfil"
              className="rounded-circle mb-2"
              width="100"
              height="100"
            />
            <h5>{clase?.name}</h5>
            <p className="text-center mb-4"> Docente:</p>
            <p className="text-muted"> {clase?.autor}</p>
            <p className="text-center mb-4">Tema:</p>
            <p className="text-muted"> {clase?.tema}</p>
            <p className="text-center mb-4">Codigo de la clase:</p>
            <p className="text-muted"> {clase?.codigo}</p>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                className="btn btn-secondary w-100"
                onClick={() => navigate("/menu")}
              >
                Volver
              </button>
            </li>
          </ul>
        </nav>

        {/* Contenido principal */}
        <main className="col-md-9 p-4">
          {user?.rol === "Profesor" && (
            <div className="row justify-content-center mb-4">
              <div className="col-lg-4 col-md-6">
                <div
                  className="card h-100 border-primary text-primary"
                  onClick={() => navigate("/crear-examen")}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="/avatars/avatar1.jpg"
                    className="card-img-top"
                    alt="crearclase"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Crear examen</h5>
                  </div>
                </div>
              </div>
            </div>
          )}

          <h2 className="mb-4">Exámenes disponibles</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {examenes.length === 0 && (
              <div className="col">
                <div className="alert alert-info text-center">
                  No hay exámenes disponibles.
                </div>
              </div>
            )}
            {examenes.map((exam, idex) => (
              <div className="col" key={exam.id || idex}>
                <div
                  className="card h-100 shadow"
                  onClick={() => verExamen(exam)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={
                      exam?.imagenExamen || "https://via.placeholder.com/150"
                    }
                    className="card-img-top"
                    alt="Imagen del examen"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{exam.nombre}</h5>
                    <p className="card-text">
                      {exam.descripcion?.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="container mt-4">
            <h3>Estudiantes registrados en la clase</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Correo</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((est, idx) => (
                    <tr key={est.id_Usuario || idx}>
                      <td>{est.nombre}</td>
                      <td>{est.rol}</td>
                      <td>{est.correo}</td>
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
        </main>
      </div>

      <footer className="text-center p-3 bg-light mt-4">
        <p>&copy; 2025 Exa-Gammer. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
