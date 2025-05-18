import "./stylesApi.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Store/StoreProvider";

export default function Apiclase() {
  const [clases, setClases] = useState([]);
  const [estado, setestado] = useState(true);
  const [claseupdate,setclaseupdate] = useState([]);
  const navigate = useNavigate();
  const [store] = useContext(StoreContext);
  const { user } = store;

  useEffect(() => {
    fetch("https://localhost:7248/api/Clases")
      .then((res) => res.json())
      .then((data) => setClases(data))
      .catch((error) =>
        console.error("Error consultado al recibir clases", error)
      );
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const nombre = form.nombre.value;
    const tema = form.tema.value;
    const autor = user.name;
    const codigo = form.codigo.value;
    const estado = true;
    const fecha = new Date().toISOString();

    const claseEncontrada = clases.find((clase) => clase.nombre === nombre);

    if (claseEncontrada) {
      alert("Nombre de clase ya existente: " + claseEncontrada.nombre);
    } else {
      const nuevaClase = {
        nombre: nombre,
        tema: tema,
        autor: autor,
        codigo: codigo,
        estado: estado,
        fecha: fecha,
      };

      /*guardar clase */
      try {
        await fetch("https://localhost:7248/api/Clases", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevaClase),
        });
        alert("primero clase")
      } catch (error) {
        console.error("Error al enviar los datos a clase:", error);
      }

      /* guardar en profe-clase*/
      try{
        handleProfeClase({ clasenom: nombre })
      }catch (error){
        console.error("Error al enviar los datos:", error);
      }
    }
  };

  const handleProfeClase = ({ clasenom }) => {
    // Llamada no asincrónica a la API
    fetch("https://localhost:7248/api/Clases")
        .then((res) => res.json())
        .then((data) => {
            setclaseupdate(data);
            console.log("Clases actualizadas:", data);

            const Claseid = data.find((clase) => clase.nombre === clasenom);

            if (Claseid != null) {
                const fecha2 = new Date().toISOString();
                const nuevaProClase = {
                    id_profesor: user.id,
                    id_clase: Claseid.id,
                    fecha_creacion: fecha2,
                };

                fetch("https://localhost:7248/api/Profe_Clase", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(nuevaProClase),
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log("Clase registrada correctamente en profe-clase");
                        } else {
                            console.error("Error al registrar la clase en profe-clase");
                        }
                    })
                    .catch((error) => {
                        console.error("Error al enviar los datos a profe-clase:", error);
                    });
            } else {
                console.error("Clase no encontrada:", clasenom);
            }
        })
        .catch((error) => {
            console.error("Error al actualizar las clases:", error);
        });
};

  const handleInicio = () => {
    navigate("/menu");
  };

  return (
    <div>
      <h1>API Crear Clases</h1>
      <button className="inicio-button" onClick={handleInicio}>
        {" "}
        Volver{" "}
      </button>
      <div className="form-container">
        <form id="claseForm" className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required />
          </div>
          <div className="form-group">
            <label htmlFor="tema">Tema:</label>
            <input type="text" id="tema" name="tema" required />
          </div>
          <div className="form-group">
            <label htmlFor="autor">Autor:</label>
            <input type="text" id="autor" name="autor" value={user.name} readOnly required />
          </div>
          <div className="form-group">
            <label htmlFor="codigo">Código:</label>
            <input type="text" id="codigo" name="codigo" required />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado:</label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={estado}
              readOnly
            />
          </div>
          <button type="submit" className="form-button">
            Registrar Clase
          </button>
        </form>
      </div>
    </div>
  );
}

export function UnirClase({ id, nomclase }) {
  const [clases, setClases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:7248/api/Clases")
      .then((res) => res.json())
      .then((data) => setClases(data))
      .catch((error) =>
        console.error("Error consultado al recibir clases", error)
      );
  }, []);

  const unir = () => {
    const claseEncontrada = clases.find((clase) => clase.nombre === nomclase);

    if (claseEncontrada) {
      alert("Clase Encontrada: ");
      Profe_clase_post(claseEncontrada.id);
    } else {
      console.log("No se encontro la clase");
    }
  };

  const Profe_clase_post = async (event) => {
    const [id_profe] = useState(1);
    const [id_cla] = useState(4);
    const fecha = new Date().toISOString();

    const nuevaClase = {
      id_profesor: id_profe,
      id_clase: id_cla,
      fecha_creacion: fecha,
    };

    try {
      const response = await fetch("https://localhost:7248/api/Profe_Clase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaClase),
      });

      if (response.ok) {
        alert("Clase registrada correctamente");
        navigate("clase");
      } else {
        alert("Error al registrar la clase");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return Profe_clase_post();
}
