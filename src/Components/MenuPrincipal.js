import "./stylesApi.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Store/StoreProvider";
import { types } from "../Store/StoreReducer";

export default function MenuPrincipal() {
  const [clases, setClases] = useState([]);
  const [UserClases, setUserClases] = useState([]);
  const navigate = useNavigate();

  const [store, dispatch] = useContext(StoreContext);
  const { user } = store;

  useEffect(() => {
    fetch("https://localhost:7248/api/Clases")
      .then((res) => res.json())
      .then((data) => setClases(data))
      .catch((error) =>
        console.error("Error consultado al recibir clases", error)
      );
  }, []);

  useEffect(() => {
    setUserClases(clases.filter((clase) => clase.autor === user.name));
  }, [clases]);

  const IrClase = ({ id_c, nom_c }) => {
    const clase = { name: nom_c, id: id_c };
    dispatch({ type: types.SET_CLASE, payload: clase });
    navigate("/clase");
  };
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
            <p className="profile-name">{user?.id}</p>
          </div>
          <ul>
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="/clases">Clases</a>
            </li>
          </ul>
        </nav>
        <section className="menu-principal-content">
          <header className="menu-principal-header">
            <h1 className="menu-principal-title">Exa - Gammer</h1>
          </header>
          <div className="small-section">
            <p> sección pequeña.</p>
          </div>
          <div className="large-section">
            <p>Clases disponibles</p>

            <div className="clase-container">
              {/* Article de mostrar las clases  */}
              <CrearClase />
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
