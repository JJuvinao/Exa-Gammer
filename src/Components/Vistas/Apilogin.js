import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { types } from "../../Store/StoreReducer";
import { StoreContext } from "../../Store/StoreProvider";
import Navbar from "./Navbar";

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
      const response = await fetch("https://localhost:7248/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Usuario),
      });

      if (response.ok) {
        const usuari = await response.json();
        const user = {
          name: usuari.user.nombre,
          id: usuari.user.id,
          rol: usuari.user.rol,
          correo: usuari.user.correo,
          img: usuari.user.imagen,
        };
        Cargarusuario(user, usuari.token);
        navigate("/menu");
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
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

  const Cargarusuario = (user, token) => {
    const tokenData = { t: token };
    dispatch({ type: types.SET_USER, payload: user });
    dispatch({ type: types.SET_TOKEN, payload: tokenData });
  };

  return (
    <div className="Apilogin-page">
      <Navbar />
      <div className="container d-flex flex-column align-items-center pt-5">
        <div className="card shadow-sm w-100" style={{ maxWidth: "600px" }}>
          <div className="card-body">
            <h4 className="card-title text-center mb-4">Iniciar Sesión</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Iniciar Sesión"}
              </button>
            </form>
            <div className="text-center mt-3">
              <span>¿No tienes cuenta? </span>
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => navigate("/registro")}
              >
                {" "}
                Registrate
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
          </div>
        </div>
      </div>
    </div>
  );
}
