import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../Store/StoreProvider";
import { types } from "../Store/StoreReducer";
import Navbar from "./Navbar";

export default function ExamenDetalle() {
    const { state } = useLocation();
    const examens = state?.examen;
    const navigate = useNavigate();
    const { dispatch } = useContext(StoreContext);


    if (!examens) {
        return <p className="text-center mt-5">No hay examen seleccionado.</p>;
    }

    const entrarAlExamen = () => {
        const exa = {
            id: examens.id_Examen,
            nombre: examens.nombre,
            codigo: examens.codigo,
        };
        dispatch({ type: types.SET_EXAMEN, payload: exa });
        navigate("/juego");
    };

    return (
        <div className="container mt-4">
            <Navbar />
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="card-title">{examens.nombre}</h2>
                    <p><strong>Código:</strong> {examens.id_Examen}</p>
                    <p><strong>Fecha:</strong> {new Date(examens.fecha).toLocaleDateString()}</p>
                    <p><strong>Descripción:</strong> {examens.descripcion || "Sin descripción."}</p>

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
