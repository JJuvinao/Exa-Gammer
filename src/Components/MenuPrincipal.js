import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Store/StoreProvider";
import { types } from "../Store/StoreReducer";

export default function MenuPrincipal() {
  const [UserClases, setUserClases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [codigoClase, setCodigoClase] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { store, dispatch } = useContext(StoreContext);
  const { user, token, clase } = store;

  const cargarClasesUsuario = async () => {
    try {
      const response = await fetch(
        `https://localhost:7248/api/Estudi_Clases/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token.t}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Error cargando clases");

      const data = await response.json();
      setUserClases(data);
      console.log(data["mensaje"]);

      unirseAClase();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    if (user.rol === "Admin") {
      navigate("/admin");
      return;
    }
    if (user) cargarClasesUsuario();
  }, [user]);

  const irAClase = (id, nombre) => {
    const clased = {
      name: nombre,
      id_clase: id,
    };
    dispatch({ type: types.SET_CLASE, payload: clased });
    navigate("/clase");
  };

  const cerrarSesion = () => {
    dispatch({ type: types.SET_USER, payload: null });
    dispatch({ type: types.SET_TOKEN, payload: null });
    localStorage.removeItem("store");
    navigate("/");
  };

  const unirseAClase = async () => {
    if (!codigoClase.trim()) {
      setError("Por favor ingresa un código de clase");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const estu_clase = {
        Id_Usuario: user.id,
        Id_Clase: clase.id_clase,
        Codigo: codigoClase,
      };
      console.log(estu_clase);
      const response = await fetch(
        `https://localhost:7248/api/Estudi_Clases/Ingresar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.t}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(estu_clase),
        }
      );

      // Si la respuesta no es exitosa (código de estado 200-299), lanzar un error
      if (!response.ok) {
        // Intentar obtener el mensaje de error del cuerpo de la respuesta
        const errorData = await response.json();
        const errorMessage =
          errorData.message || `Error del servidor: ${response.status}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      // Si la respuesta es exitosa
      const responseData = await response.json();
      await cargarClasesUsuario();
      setShowModal(false);
      setCodigoClase("");
      alert("Te has unido a la clase correctamente");
    } catch (err) {
      // Capturar y mostrar el error, ya sea de la red o del servidor
      setError(err.message || "Error al unirse a la clase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <nav
        className="navbar d-flex justify-content-between align-items-center px-4"
        style={{ backgroundColor: "#586068" }}
      >
        <div
          className="logo d-flex align-items-center text-white fw-bold"
          style={{ fontSize: "1.5rem" }}
        >
          <img
            src="/logo_del_sitio.png"
            alt="Logo"
            style={{ height: "100px", marginRight: "8px" }}
          />
          Exa-Gammer
        </div>
        <button onClick={cerrarSesion} className="btn btn-primary">
          Cerrar sesión
        </button>
      </nav>

      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-3 bg-light p-3 min-vh-100">
          <div className="text-center mb-4">
            <img
              src={user.img || "https://via.placeholder.com/100"}
              alt="Perfil"
              className="rounded-circle mb-3 border border-secondary"
              width="200"
              height="200"
              style={{
                borderWidth: "6px",
                borderStyle: "solid",
                borderColor: "#6c757d",
              }}
            />
            <h5>{user?.name}</h5>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <p>{user?.rol}</p>
              <p>{user?.correo}</p>
            </li>
          </ul>
        </nav>

        {/* Contenido Principal */}
        <main className="col-md-9 p-4">
          <h2 className="mb-4">Bienvenido, {user?.name}</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {user?.rol === "Profesor" && (
              <div className="col">
                <div
                  className="card h-100 border-primary text-primary"
                  onClick={() => navigate("/crearclase")}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="/avatars/avatar1.jpg"
                    className="card-img-top"
                    alt="crearclase"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Crear Clase</h5>
                  </div>
                </div>
              </div>
            )}

            {user?.rol === "Estudiante" && (
              <div className="col">
                <div
                  className="card h-100 border-success text-success"
                  onClick={() => setShowModal(true)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="/avatars/avatar1.jpg"
                    className="card-img-top"
                    alt="Unirse a clase"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Unirse a Clase</h5>
                  </div>
                </div>
              </div>
            )}

            {UserClases.map((clase, idx) => (
              <div className="col" key={clase.id_Clase || idx}>
                <div
                  className="card h-100 shadow"
                  onClick={() => irAClase(clase.id_Clase, clase.nombre)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={clase.imagenClase || "https://via.placeholder.com/150"}
                    className="card-img-top"
                    alt="Clase"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {clase.nombre} {clase.id_Clase}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal Unirse */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Unirse a una Clase</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="codigoClase" className="form-label">
                  Código de la Clase
                </label>
                <input
                  type="text"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  id="codigoClase"
                  value={codigoClase}
                  onChange={(e) => setCodigoClase(e.target.value.toUpperCase())}
                  disabled={loading}
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-success"
                  onClick={unirseAClase}
                  disabled={loading || !codigoClase.trim()}
                >
                  {loading ? "Uniéndose..." : "Unirse"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center p-3 bg-light mt-4">
        <p>&copy; 2025 Exa-Gammer. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
