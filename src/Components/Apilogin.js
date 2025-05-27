import "./stylesApi.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { types } from "../Store/StoreReducer";
import { StoreContext } from "../Store/StoreProvider";

export default function ApiLogin() {
  const navigate = useNavigate();
  const { dispatch } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;

    const Usuario = {
      username: form.username.value,
      password: form.password.value,
    };

    try {
      const response = await fetch(
        "https://localhost:7248/api/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Usuario),
        }
      );

      if (response.ok) {
        const usuari = await response.json();
        const user = { name: usuari.user.nombre, id: usuari.user.id, rol: usuari.user.rol, correo: usuari.user.correo };
        Cargarusuario(user, usuari.token);
        navigate("/menu");

      } else if (response.status === 400) {
        const errorMessage = await response.text();
        alert(errorMessage);

      } else if (response.status === 401) {
        const errorMessage = await response.text();
        alert(errorMessage);

      } else if (response.status === 500) {
        const errorMessage = await response.text();
        alert("Error en la solicitud: " + errorMessage);

      } else {
        alert("Error en el servidor. Intenta de nuevo.");
        console.log("Error en el servidor:", response.status);
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

  const Cargarusuario = (user,token) => {
    const tokenData = { t: token };
    dispatch({ type: types.SET_USER, payload: user });
    dispatch({ type: types.SET_TOKEN, payload: tokenData });
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
