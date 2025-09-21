import { useState } from "react";
import "../stylesheroes.css";
import { useNavigate } from "react-router-dom";

export function ModalRendirse({ rendirse }) {
  const [modalrendirse, setModalRendirse] = useState(rendirse);
  const navigate = useNavigate();

  return (
    <>
      {modalrendirse && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setModalRendirse(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Rendirse</h5>
              </div>
              <div className="modal-body rendirse-contenedor">
                <h5>¿Estas seguro que quieres rendirte?</h5>
                <button
                  className="btn btn-secondary btn-light button-nav text-black button-accion"
                  onClick={() => {
                    setModalRendirse(false);
                    navigate("/heroes/menu");
                  }}
                >
                  "Rendirse"
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
