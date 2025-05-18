import "./stylesApi.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { types } from "../Store/StoreReducer";
import { StoreContext } from "../Store/StoreProvider";

export default function ApiLogin() {
  const navigate = useNavigate();
  const [dispatch] = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;

    const Usuario = {
      Nombre: form.username.value,
      Contrasena: form.password.value,
      Rol: "Usuario",
      Correo: "temporal@ejemplo.com",
    };

    try {
      const response = await fetch(
        "https://localhost:7248/api/Usuarios/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Usuario),
        }
      );

      if (response.ok) {
        const usuarioEncontrado = await response.json();
        Cargarusuario(usuarioEncontrado.nombre, usuarioEncontrado.id);
        navigate("/menu");
      } else if (response.status === 401) {
        const errorMessage = await response.text();
        alert(errorMessage);
      } else if (response.status === 500) {
        const errorMessage = await response.text();
        console.log("Error 500:", errorMessage);
        alert("Error en la solicitud: " + errorMessage);
      } else {
        alert("Error en el servidor. Intenta de nuevo.");
        console.log("Error en el servidor:", response.status, Usuario.Nombre);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInicio = () => {
    navigate("/");
  };

  const Cargarusuario = (username, id) => {
    const user = { name: username, id: id };
    dispatch({ type: types.SET_USER, payload: user });
  };

  return (
    <div>
      <h1>Exa_Gammer</h1>
      <button className="inicio-button" onClick={handleInicio}>
        {" "}
        Volver{" "}
      </button>
      <div className="form-container">
        <form id="loginForm" className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
