import "./stylesApi.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;
    const rol = form.category.value;
    const correo = form.correo.value;

    await BuscarUser(username);

    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.nombre === username
    );

    if (usuarioEncontrado) {
      alert("Nombre de usuario ya existente: " + usuarioEncontrado.username);
    } else {
      const nuevoUsuario = {
        nombre: username,
        contrasena: password,
        rol: rol,
        correo: correo,
      };

      try {
        const response = await fetch("https://localhost:7248/api/Usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoUsuario),
        });

        if (response.ok) {
          alert("Usuario registrado correctamente");
          navigate("/login");
        } else {
          alert("Error al registrar el usuario");
        }
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("Ocurrió un error al registrar el usuario.");
      }finally {
      setIsLoading(false);
    }
    }
  };

  const handleInicio = () => {
    navigate("/");
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
            <label htmlFor="username">Nombre:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">contraseña:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="category">Rol:</label>
            <select
              id="category"
              name="category"
              required
              className="form-select"
            >
              <option value="rol">Selecionar su rol</option>
              <option value="Profesor">Profesor</option>
              <option value="Estudiante">Estudiante</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo electronico:</label>
            <input type="text" id="correo" name="correo" required />
          </div>
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? "Creando usuario..." : "Registro"}
          </button>
        </form>
      </div>
    </div>
  );
}
