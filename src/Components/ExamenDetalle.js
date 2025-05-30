import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../Store/StoreProvider";
import Navbar from "./Navbar";

export default function ExamenDetalle() {
    const { state } = useLocation();
    const examen = state?.examen;
    const navigate = useNavigate();
    const { store } = useContext(StoreContext);

    if (!examen) {
        return <p className="text-center mt-5">No hay examen seleccionado.</p>;
    }

    const entrarAlExamen = () => {
        alert("Aquí se cargaría el examen real. Pronto disponible...");
    };

    return (
        <div className="container mt-4">
            <Navbar />
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="card-title">{examen.nombre}</h2>
                    <p><strong>Fecha:</strong> {new Date(examen.fecha).toLocaleDateString()}</p>
                    <p><strong>Descripción:</strong> {examen.descripcion || "Sin descripción."}</p>

                    <button className="btn btn-success mt-3" onClick={entrarAlExamen}>
                        Ingresar al Examen
                    </button>
                    <button
                        className="btn btn-secondary mt-3 ms-3"
                        onClick={() => navigate(-1)}
                    >
                    V   olver
                    </button>
            </div>
        </div>
    </div>
    );
}
