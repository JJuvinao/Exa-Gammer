import "./stylesApi.css";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../Store/StoreProvider";
import { useNavigate } from "react-router-dom";

export default function Clase() {
  const [examenes, setExamenes] = useState([]);
  const { store } = useContext(StoreContext);
  const { user, token, clase } = store;
  const navigate = useNavigate();

  useEffect(() => {
    const cargarExamenes = async () => {
      try {
        const response = await fetch(`https://localhost:7248/api/Examenes/Clase/${clase.id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token?.t || token}`,
            "Content-Type": "application/json"
          }
        });
        if (response.ok) {
          const data = await response.json();
          setExamenes(data);
        } else {
          console.error(await response.text());
        }
      } catch (error) {
        console.error("Error al cargar los examenes", error);
      }
    };
    if (clase?.id) cargarExamenes();
  }, [clase, token]);

  const verExamen = (examen) => {
    navigate("/examen", { state: { examen } });
  };

  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <nav className="navbar d-flex justify-content-between align-items-center px-4" style={{ backgroundColor: "#586068" }}>
        <div className="logo d-flex align-items-center text-white fw-bold" style={{ fontSize: "1.5rem" }}>
          <img src="/logo_del_sitio.png" alt="Logo" style={{ height: "60px", marginRight: "8px" }} />
          Exa-Gammer - Clase: {clase.name}
        </div>
        <button onClick={() => navigate("/menu")} className="btn btn-outline-light">Volver al menú</button>
      </nav>

      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-3 bg-light p-3 min-vh-100">
          <div className="text-center mb-4">
            <img src={user?.img || "https://via.placeholder.com/100"} alt="Perfil" className="rounded-circle mb-2" width="100" height="100" />
            <h5>{user?.name}</h5>
            <p className="text-muted">{user?.id}</p>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button className="btn btn-secondary w-100" onClick={() => navigate("/menu")}>Volver</button>
            </li>
          </ul>
        </nav>

        {/* Contenido principal */}
        <main className="col-md-9 p-4">
          <h2 className="mb-4">Exámenes disponibles</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {examenes.length === 0 && (
              <div className="col">
                <div className="alert alert-info text-center">
                  No hay exámenes disponibles.
                </div>
              </div>
            )}
            {examenes.map((exam) => (
              <div className="col" key={exam.id}>
                <div className="card h-100 shadow" onClick={() => verExamen(exam)} style={{ cursor: "pointer" }}>
                  <img
                    src="https://via.placeholder.com/150"
                    className="card-img-top"
                    alt="Imagen del examen"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{exam.nombre}</h5>
                    <p className="card-text">{exam.descripcion?.slice(0, 100)}...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <footer className="text-center p-3 bg-light mt-4">
        <p>&copy; 2025 Exa-Gammer. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}