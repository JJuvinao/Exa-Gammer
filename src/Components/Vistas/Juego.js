import "./stylesApi.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreContext } from "../../Store/StoreProvider";
import Navbar from "./Navbar";

function CrearJuego() {
  const [juegos, setJuegos] = useState([]);
  const [nuevoJuego, setNuevoJuego] = useState({
    nombre: "",
    genero: "",
    tema: "",
  });

  const navigate = useNavigate();
  const { store } = useContext(StoreContext);
  const { user } = store;

  const handleChange = (e) => {
    setNuevoJuego({
      ...nuevoJuego,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nuevoJuego.nombre || !nuevoJuego.genero || !nuevoJuego.tema) return;

    setJuegos([...juegos, nuevoJuego]);
    setNuevoJuego({ nombre: "", genero: "", tema: "" });
  };

  const eliminarJuego = (index) => {
    const juegosActualizados = juegos.filter((_, i) => i !== index);
    setJuegos(juegosActualizados);
  };

  const iraUsuario = () => {
    navigate("/usuario");
  };

  return (
    <>
      <Navbar />
      <div
        className="min-vh-100 py-5"
        style={{
          background: `radial-gradient(circle at top left, #f8f9fa, #dee2e6, #ced4da)`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="row">
            {/* Panel lateral izquierdo más largo */}
            <div className="col-md-4 mb-4">
              <div
                className="card shadow-sm text-center bg-white rounded-4 h-100"
                style={{ minHeight: "500px" }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={user.img || "https://via.placeholder.com/100"}
                    alt="Avatar"
                    className="rounded-circle mb-3 border border-secondary"
                    width="200"
                    height="200"
                    style={{
                      borderWidth: "6px",
                      borderStyle: "solid",
                      borderColor: "#6c757d",
                    }}
                  />
                  <h5 className="card-title">{user.name}</h5>
                  <p className="text-muted">{user.rol}</p>
                </div>
                <button
                  onClick={iraUsuario}
                  className="btn btn-danger btn-lg w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
                  style={{ fontWeight: "bold", letterSpacing: "1px" }}
                >
                  <i className="bi bi-person-x-fill"></i>
                  Eliminar Usuario
                </button>
              </div>
            </div>

            {/* Área principal derecha */}
            <div className="col-md-8">
              {/* Formulario */}
              <div className="card bg-white shadow rounded-4 mb-4">
                <div className="card-header bg-secondary text-white text-center rounded-top-4">
                  <h4>Crear Juego</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Nombre:</label>
                      <input
                        type="text"
                        name="nombre"
                        className="form-control"
                        value={nuevoJuego.nombre}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Género:</label>
                      <input
                        type="text"
                        name="genero"
                        className="form-control"
                        value={nuevoJuego.genero}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tema:</label>
                      <input
                        type="text"
                        name="tema"
                        className="form-control"
                        value={nuevoJuego.tema}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-secondary">
                        Crear
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Lista de Juegos */}
              <div className="card bg-white shadow rounded-4">
                <div className="card-header bg-dark text-white text-center rounded-top-4">
                  <h5>Juegos Creados</h5>
                </div>
                <ul className="list-group list-group-flush">
                  {juegos.map((juego, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{juego.nombre}</strong> - {juego.genero} -{" "}
                        {juego.tema}
                      </div>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => eliminarJuego(index)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                  {juegos.length === 0 && (
                    <li className="list-group-item text-center text-muted">
                      No hay juegos creados.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CrearJuego;
