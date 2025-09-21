import { useState, useEffect, use } from "react";
import { useContext } from "react";
import { StoreContext } from "../../Store/StoreProvider";
import CalificarYRecomendar from "./CalificaryRecomendar";

export default function EstuResultados() {
  const { store } = useContext(StoreContext);
  const { token, userresul } = store;
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarResultados();
  }, []);

  const cargarResultados = async () => {
    setCargando(true);
    try {
      const est_exa = {
        Id_Estudiane: userresul.id_user,
        Id_Examen: userresul.id_examen,
      };
      const res = await fetch(
        `https://localhost:7248/api/Estudi_Examen/get_estu_exa`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.t}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(est_exa),
        }
      );

      if (res.ok) {
        setResultados(await res.json());
        setCargando(true);
      } else if (res.status === 401) {
        throw new Error("No autorizado");
      } else {
        throw new Error("Error al cargar los resultados");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Resultados del Estudiante {userresul?.nombre_user}</h3>
      {/* Sección de Resultados */}
      <div className="card shadow ">
        <div className="card-body">
          {/* 4. Manejo de casos (carga, resultados, sin resultados) */}
          {cargando ? (
            <p>Cargando resultados...</p>
          ) : resultados.length > 0 ? (
            <div className="list-group mt-4">
              {resultados.map((r, idx) => (
                <div
                  key={r.id}
                  className="list-group-item list-group-item-action flex-column align-items-start mt-4"
                  onClick={() => setMostrarModal(true)}
                >
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Intentos</th>
                        <th>Aciertos</th>
                        <th>Fallos</th>
                        <th>Nota</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={r.id || idx}>
                        <td>{r.intentos}</td>
                        <td>{r.aciertos}</td>
                        <td>{r.fallos}</td>
                        <td>{r.nota}</td>
                      </tr>
                    </tbody>
                  </table>
                  <strong>Recomendación:</strong> {r.recomendacion || "Ninguna"}
                </div>
              ))}
            </div>
          ) : (
            <p>No hay resultados para mostrar.</p>
          )}
        </div>
      </div>

      {mostrarModal && (
        <CalificarYRecomendar
          show={mostrarModal}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
}
