import { useEffect, useState } from "react";
import "../stylesheroes.css";

export function Modalmostarinfo({
  mostarinfo,
  nombre,
  opcion,
  danio,
  mana,
  onClose,
}) {
  const [modalmostarinfo, setModalMostrarinfo] = useState(mostarinfo);
  const [NomAccion, setNomAccion] = useState("");

  useEffect(() => {
    switch (opcion) {
      case 1:
        setNomAccion("Ataque basico");
        break;
      case 2:
        setNomAccion("Habilidad 1");
        break;
      case 3:
        setNomAccion("Habilidad 2");
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      {modalmostarinfo && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => onClose()}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Informacion de la accion</h5>
              </div>
              <div className="modal-body infoaccion-contenedor">
                <h5>Nombre: {nombre}</h5>
                <h5>Accion realizada: {NomAccion}</h5>
                <h5>Danio: {danio}</h5>
                <h5>Mana: {mana}</h5>

                <button
                  className="btn btn-secondary btn-light text-black button-info"
                  onClick={() => {
                    setModalMostrarinfo(false);
                    onClose();
                  }}
                >
                  "Cerrar"
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
