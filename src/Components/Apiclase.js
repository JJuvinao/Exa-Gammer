import "./stylesApi.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Store/StoreProvider";
import Navbar from "./Navbar";

export default function Apiclase() {
  const [isLoading, setIsLoading] = useState(false);
  const [UserClases, setUserClases] = useState([]);

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("/avatars/avatar1.jpg");

  const avatarList = [
    "/avatars/avatar1.jpg",
    "/avatars/avatar2.jpg",
    "/avatars/avatar3.jpg",
    "/avatars/avatar5.jpg",
    "/avatars/avatar6.jpg",
  ];

  const { store } = useContext(StoreContext);
  const [imag, setImagen] = useState(null);
  const navigate = useNavigate();
  const { user, token } = store;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;

    const newclase = {
      nombre: form.nombre.value,
      tema: form.tema.value,
      autor: user.name,
      ImagenClase: selectedAvatar,
      Id_Profe: user.id,
    };

    // Guardar clase
    try {
      const response = await fetch("https://localhost:7248/api/Clases", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.t}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newclase),
      });
      const reponText = await response.text();
      if (response.ok) {
        alert(reponText);
        navigate("/menu");
      } else {
        alert(reponText);
      }
    } catch (error) {
      console.error("Error al enviar los datos a clase:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cargarClasesUsuario = async () => {
    try {
      const response = await fetch(
        `https://localhost:7248/api/Clases/Profe_Clases/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token.t}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Error cargando clases");

      const data = await response.json();
      setUserClases(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    if (user) cargarClasesUsuario();
  }, [user]);

  return (
    <div className="container-fluid p-0">
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          {/* usuario */}
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
            </div>
          </div>

          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-header bg-primary text-white text-center">
                <h3>Crear Clase</h3>
              </div>
              <div className="card-body">
                <form id="claseForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre:
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tema" className="form-label">
                      Tema:
                    </label>
                    <input
                      type="text"
                      id="tema"
                      name="tema"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="autor" className="form-label">
                      Autor:
                    </label>
                    <input
                      type="text"
                      id="autor"
                      name="autor"
                      className="form-control"
                      value={user.name}
                      readOnly
                      required
                    />
                  </div>

                  <div className="mb-4 text-center">
                    <label className="form-label">Imagen</label>
                    <div>
                      <img
                        src={selectedAvatar}
                        alt="Avatar seleccionado"
                        className="rounded-circle mb-2 border border-secondary"
                        width="100"
                        height="100"
                        style={{
                          borderWidth: "8px",
                          borderStyle: "solid",
                          borderColor: "#6c757d",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-primary mt-2"
                      onClick={() => setShowAvatarModal(true)}
                    >
                      Seleccionar Avatar
                    </button>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg w-100 py-2"
                      style={{ fontSize: "1.5rem", maxWidth: "500px" }}
                      disabled={isLoading}
                    >
                      {isLoading ? "Cargando..." : "Crear"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Lista de clases */}
          <div className="card bg-white shadow rounded-4">
            <div className="card-header bg-dark text-white text-center rounded-top-4">
              <h5>Clases Creadas</h5>
            </div>
            <ul className="list-group list-group-flush">
              {UserClases.map((clase, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{clase.nombre}</strong> - {clase.tema}
                  </div>
                </li>
              ))}
              {UserClases.length === 0 && (
                <li className="list-group-item text-center text-muted">
                  No hay clases creadas.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {showAvatarModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowAvatarModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Selecciona un avatar</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAvatarModal(false)}
                ></button>
              </div>
              <div className="modal-body d-flex flex-wrap justify-content-center gap-3">
                {avatarList.map((avatar, idx) => (
                  <img
                    key={idx}
                    src={avatar}
                    alt={`Avatar ${idx + 1}`}
                    className="rounded-circle border border-primary"
                    width="80"
                    height="80"
                    style={{ cursor: "pointer", objectFit: "cover" }}
                    onClick={() => {
                      setSelectedAvatar(avatar);
                      setShowAvatarModal(false);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
