import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Apiregistro() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const BuscarUser = async (username) => {
    try {
      const response = await fetch(
        `https://localhost:7248/api/Usuarios/GetUsername/${username}`
      );
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      } else {
        console.error("Error al buscar el usuario:", response.status);
      }
    } catch (error) {
      console.error("Error al buscar el usuario:", error);
    }
  };

  const handleInicio = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;
    const rol = form.category.value;
    const correo = form.correo.value;
    const imge = "/avatars/fotoperfil.png";

    await BuscarUser(username);

    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.nombre === username
    );

    if (usuarioEncontrado) {
      alert("Nombre de usuario ya existente: " + usuarioEncontrado.username);
    } else {
      const newuser = {
        Nombre: username,
        Contrasena: password,
        Rol: rol,
        Correo: correo,
        Imagen: imge,
      };

      try {
        const response = await fetch("https://localhost:7248/api/Usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newuser),
        });
        const responseText = await response.text();
        if (response.ok) {
          alert(responseText);
          navigate("/login");
        } else {
          alert(responseText);
          console.error("Error al registrar el usuario:", responseText);
        }
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("Ocurrió un error al registrar el usuario.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="Apiregistro-page">
        <Navbar />
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form
                onSubmit={handleSubmit}
                className="border p-4 shadow rounded bg-light"
              >
                <div className="mb-4 text-center">
                  <img
                    src="/avatars/fotoperfil.png"
                    alt="Logo"
                    style={{
                      height: "152px",
                      marginRight: "8px",
                      verticalAlign: "middle",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Rol
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    required
                  >
                    <option value="">Seleccionar su rol</option>
                    <option value="Profesor">Profesor</option>
                    <option value="Estudiante">Estudiante</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    name="correo"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Creando usuario..." : "Registrar"}
                </button>

                <div className="text-center mt-3">
                  <span>¿Ya tienes cuenta? </span>
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    onClick={() => navigate("/login")}
                  >
                    {" "}
                    Inicia sesión aquí
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-link mt-3 w-100"
                  onClick={handleInicio}
                >
                  {" "}
                  Volver al inicio
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
