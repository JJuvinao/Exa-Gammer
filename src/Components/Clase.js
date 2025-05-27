import "./stylesApi.css";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../Store/StoreProvider";
import { useNavigate } from "react-router-dom";

export default function Clases() {

  const [examenes,setexamenes] = useState([]);
  const {store} = useContext(StoreContext);
  const { user, token, clase } = store;


  const CragarExamenes = async () => {
    try{
      const reponse = fetch("https://localhost:7248/api/Examenes", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`, // <- Aquí va el token
      "Content-Type": "application/json"
    }
  });
    if(reponse.ok){
      const data = await reponse.json();
      setexamenes(data);
    }else{
      console.error((await reponse).text);
    }
    }catch(error){
      console.error("Error al cargar los examenes", error);
    }
    
  };

/*
  const EliminarClase = async () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta clase?");
    if (confirmacion) {
      try{
        const response = await fetch(`https://localhost:7248/api/Clases/${clases.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        })
        if (response.ok) {
          alert("Clase eliminada correctamente");
          navigate("/menu");
        } else {
          alert("Error al eliminar la clase");
        }
      }catch(error){
        console.error("Error al eliminar la clase", error);
      }
    }
  }
*/
  return (
    <>
    <main className="menu-principal-container" onLoad={CragarExamenes}>
      <div className="menu-principal-layout">
        <nav className="menu-principal-nav">

          <div className="profile-container">
             <p className="profile-name">{user?.name}</p>
            <p className="profile-name">{user?.id}</p>
          </div>

          <ul>
            <li>
              <a href="/menu">Volver</a>
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
            <p>Examenes disponibles</p>

            <div className="clase-container">
              {examenes.map((exam) => (
                <article
                  key={exam.Id_Examen}
                  className="article-clase"

                >
                  <div className="article-image-container">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Imagen de la clase"
                      className="article-image"
                    />
                  </div>

                  <div className="article-text">
                    <p>{exam.nombre}</p>
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
    </>
  );
}