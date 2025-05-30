import { useState, useContext } from "react";
import { StoreContext } from "../Store/StoreProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function CrearExamen() {
  const { store } = useContext(StoreContext);
  const { clase, token, user } = store;
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [tema, setTema] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("Nombre", nombre);
    formData.append("Tema", tema);
    formData.append("Autor", user.name);
    formData.append("Descripcion", descripcion);
    formData.append("ImagenExamen", imagen);
    formData.append("ClaseId", clase.id); // Asumiendo que tu backend usa este nombre o lo infiere por la relación

    try {
      const response = await fetch("https://localhost:7248/api/Examenes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.t}`,
        },
        body: formData,
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
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">
                Imagen del Examen
              </label>
              <input
                type="file"
                id="imagen"
                className="form-control"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                required
              />
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
          </form>
        </div>
      </div>
    </div>
  );
}
