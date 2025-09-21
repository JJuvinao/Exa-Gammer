import { useNavigate } from "react-router-dom";
import "./stylesheroes.css";

export default function InicioHeroes() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/heroes/menu");
  };
  const handleSalir = () => {
    navigate("/inicio");
  };

  return (
    <div className="page-container">
      <section className="homes-container">
        <div className="inicio-heroes">
          <div className="inicio-contenedor">
            <h2 className="inicio-titulo">Heroes del aprendizaje</h2>
            <button className="inicio-btn" onClick={handleStart}>
              Empezar
            </button>
            <button className="inicio-btn" onClick={handleSalir}>
              Salir
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
