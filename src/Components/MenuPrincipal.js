import "./stylesApi.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Store/StoreProvider";
import { types } from "../Store/StoreReducer";

export default function MenuPrincipal() {
  const [clases, setClases] = useState([]);
  const [UserClases, setUserClases] = useState([]);
  const navigate = useNavigate();

  const {store, dispatch} = useContext(StoreContext);
  const { user, token } = store;

  const CragarClase = async () => {

    fetch("https://localhost:7248/api/Clases", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token.t}`, // <- Aquí va el token
      "Content-Type": "application/json"
    }
  }).then((res) => {
      if (!res.ok) throw new Error("Error en la respuesta del servidor");
      return res.json();
    })
    .then((data) => {
    setClases(data);   
  })
    .catch(err => console.error("No funciona:", err));   
  };

  useEffect(() => {
    CragarClase();
  }, []);

  useEffect(() => {
    
  if (user) {
    CragarClase_Profe();
  } else {
    setUserClases([]); 
  }
}, [clases, user]);

  const CragarClase_Profe = async () => {

    fetch(`https://localhost:7248/api/Clases/Profe_Clases/${user.id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token.t}`, // <- Aquí va el token
      "Content-Type": "application/json"
    }
  }).then((res) => {
      if (!res.ok) throw new Error("Error en la respuesta del servidor");
      return res.json();
    })
    .then((data) => {
    setUserClases(data);   
  })
    .catch(err => console.error("No funciona:", err));   
  };

  const IrClase = ({ id_c, nom_c }) => {
    const clase = { name: nom_c, id: id_c };
    dispatch({ type: types.SET_CLASE, payload: clase });
    navigate("/clase");
  };

  const handelCerre = () => {
    dispatch({ type: types.SET_USER, payload: null });
    dispatch({ type: types.SET_TOKEN, payload: null });
    localStorage.removeItem("store");
    navigate("/");
  }

  return (
    <main className="menu-principal-container">
      <div className="menu-principal-layout">
        <nav className="menu-principal-nav">
          <div className="profile-container">
            <img
              src="https://via.placeholder.com/100"
              alt="Foto de perfil"
              className="profile-picture"
            />
            <p className="profile-name">{user?.name}</p>
            <p className="profile-name">{token?.t}</p>
          </div>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/clases">Clases</a></li>
            <li><a href="/clases">Notificaciones</a></li>
            <li ></li>
          </ul>
          <button onClick={handelCerre}
          className="form-button
          ">
            Cerrar session
          </button>
        </nav>
        <section className="menu-principal-content">
          <header className="menu-principal-header">
            <h1 className="menu-principal-title">Exa - Gammer</h1>
          </header>
          <div className="large-section">
            <p>Clases disponibles</p>

            <div className="clase-container">
              {/* Article de mostrar las clases  */}
              {user && user.rol === "Profesor" && <CrearClase />}
              {user && user.rol === "Estudiante" && <UnirseClase />}
              {UserClases.map((clase) => (
                <article
                  key={clase.id}
                  className="article-clase"
                  onClick={() => IrClase({ id_c: clase.id , nom_c: clase.nombre })}
                >
                  <div className="article-image-container">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Imagen de la clase"
                      className="article-image"
                    />
                  </div>
                  <div className="article-text">
                    <p>{clase.nombre}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
      <footer className="menu-principal-footer">
        <p>&copy; 2025 Exa-Gammer. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}

export function CrearClase() {
  const navigate = useNavigate();
  const handleArticleClick = () => {
    navigate("/crearclase");
  };
  return (
    <article className="article-clase" onClick={handleArticleClick}>
      <div className="article-image-container">
        <img
          src="https://via.placeholder.com/150"
          alt="Imagen del clase"
          className="article-image"
        />
      </div>
      <div className="article-text">
        <p>Crear Clase...</p>
      </div>
    </article>
  );
}

export function UnirseClase(){
  const navigate = useNavigate();
  const handleArticleClick = () => {
    navigate("/clase");
  };
  return (
    <article className="article-clase" onClick={handleArticleClick}>
      <div className="article-image-container">
        <img
          src="https://via.placeholder.com/150"
          alt="Imagen del clase"
          className="article-image"
        />
      </div>
      <div className="article-text">
        <p>Unirse a Clase...</p>
      </div>
    </article>
  );

}
