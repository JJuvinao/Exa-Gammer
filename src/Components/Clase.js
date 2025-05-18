import "./stylesApi.css";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../Store/StoreProvider";
import { useNavigate } from "react-router-dom";

export default function Clases() {
  const [clases, setClases] = useState([]);
  const [store] = useContext(StoreContext);
  const { clase } = store;
  const { isEditing, setIsEditing } = useState(false);
  const  navigate = useNavigate();

  useEffect(() => {
    if (clase.id) {
        fetch(`https://localhost:7248/api/Clases/${clase.id}`)
        .then((res) => res.json())
        .then((data) => setClases(data))
        .catch((error) =>
          console.error("Error consultado al recibir clases", error)
        );
    }else{
        alert("No tienes clases disponibles");
    }
  }, [clase.id]);

  const handleInicio = () => {
    navigate("/menu");
    /*hola*/
  }

  const EditarClase = () => {

  }

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

  return (
    <div className="clasesapi-container">
      <h1 className="clasesapi-title">Detalles de la Clase</h1>
      <button className="inicio-button" onClick={handleInicio}> Volver Menu </button>
      <div className="clasesapi-list">
        <div key={clases.id} className="clasesapi-card">
          <h2 className="clasesapi-nombre">{clases.nombre}</h2>
          <p className="clasesapi-info">
            <strong>Tema:</strong> {clases.tema}
          </p>
          <p className="clasesapi-info">
            <strong>Autor:</strong> {clases.autor}
          </p>
          <p className="clasesapi-info">
            <strong>Código:</strong> {clases.codigo}
          </p>
          <p className="clasesapi-info">
            <strong>Estado:</strong> {clases.estado ? "Activo" : "Inactivo"}
          </p>
          <p className="clasesapi-info">
            <strong>Fecha:</strong> {new Date(clases.fechaCreacion).toLocaleDateString()}
          </p>
          <button className="clasesapi-button" name="BtnEditar" onClick={EditarClase}>Editar Clase</button>
          <button className="clasesapi-button" name="BtnEliminar" onClick={EliminarClase}>Eliminar Clase</button>
        </div>
      </div>
    </div>
  );
}

export function BuscarClase() {
  const [store] = useContext(StoreContext);
  const [Profe_Clase, setProfe_Clase] = useState([]);
  const { user } = store;

  useEffect(() => {
    fetch("https://localhost:7248/api/Profe_Clase")
      .then((res) => res.json())
      .then((data) => setProfe_Clase(data))
      .catch((error) =>
        console.error("Error consultado al recibir clases", error)
      );
  }, []);

  const clase = Profe_Clase.find((clase) => clase.id_profesor === user.id);

  return clase ? clase.id_clase : null;
}
