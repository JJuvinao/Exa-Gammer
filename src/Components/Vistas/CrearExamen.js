import { useState, useContext } from "react";
import { StoreContext } from "../../Store/StoreProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function CrearExamen() {
  const { store } = useContext(StoreContext);
  const { clase, token, user } = store;
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [tema, setTema] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("/avatars/avatar1.jpg");

  const avatarList = [
    "/avatars/avatar1.jpg",
    "/avatars/avatar2.jpg",
    "/avatars/avatar3.jpg",
    "/avatars/avatar5.jpg",
    "/avatars/avatar6.jpg",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newexamen = {
      Nombre: nombre,
      Tema: tema,
      Autor: user.name,
      Descripcion: descripcion,
      ImagenExamen: selectedAvatar,
      Id_Clase: clase.id_clase,
    };

    try {
      const response = await fetch("https://localhost:7248/api/Examenes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.t}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newexamen),
      });

      const responseText = await response.text();

      if (response.ok) {
        alert("Examen creado correctamente.");
        navigate("/clase");
      } else {
        alert("Error al crear el examen: " + responseText);
      }
    } catch (error) {
      console.error("Error al enviar examen:", error);
      alert("Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <Navbar />
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Crear Examen - {clase?.name}</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre del Examen
              </label>
              <input
                type="text"
                id="nombre"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tema" className="form-label">
                Tema
              </label>
              <input
                type="text"
                id="tema"
                className="form-control"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <textarea
                id="descripcion"
                className="form-control"
                rows="4"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              ></textarea>
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

            <button
              type="submit"
              className="btn btn-success"
              disabled={isLoading}
            >
              {isLoading ? "Creando..." : "Crear Examen"}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-3"
              onClick={() => navigate("/clase")}
              disabled={isLoading}
            >
              Cancelar
            </button>

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
          </form>
        </div>
      </div>
    </div>
  );
}
