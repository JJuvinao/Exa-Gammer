import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NaNvbar from "./Navbar";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Obtener usuarios desde la API al cargar
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch("https://localhost:7248/api/usuarios");
      const datos = await respuesta.json();
      setUsuarios(datos);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?"))
      return;

    try {
      const respuesta = await fetch(
        `https://localhost:7248/api/usuarios/${id}`,
        {
          method: "DELETE",
        }
      );
      const texto = await respuesta.text();
      if (respuesta.ok) {
        alert(texto);
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      } else {
        alert("No se pudo eliminar el usuario.");
        console.error("Error al eliminar usuario:", respuesta.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <>
      <NaNvbar />
      <div
        className="min-vh-100 py-5"
        style={{
          background:
            "radial-gradient(circle at top left, #f8f9fa, #dee2e6, #ced4da)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="card shadow bg-white rounded-4">
            <div className="card-header bg-secondary text-white text-center rounded-top-4">
              <h4>Lista de Usuarios</h4>
            </div>
            {cargando ? (
              <div className="p-4 text-center text-muted">
                Cargando usuarios...
              </div>
            ) : (
              <ul className="list-group list-group-flush">
                {usuarios.length > 0 ? (
                  usuarios.map((usuario) => (
                    <li
                      key={usuario.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <strong>{usuario.nombre}</strong>
                        <div className="text-muted small">{usuario.rol}</div>
                        <div className="text-muted small">{usuario.correo}</div>
                      </div>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => eliminarUsuario(usuario.id)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-center text-muted">
                    No hay usuarios registrados.
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaUsuarios;
