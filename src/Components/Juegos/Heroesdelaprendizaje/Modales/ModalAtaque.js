import "../stylesheroes.css";
import { useState } from "react";

export function ModalAtaque({ matk, recibiropcATK, cerrarmodal, modalpyr }) {
  const [modalatk, setModalAtk] = useState(matk);

  return (
    <>
      {modalatk && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setModalAtk(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ataques</h5>
              </div>
              <div className="modal-body  navbar-contenedor">
                <button
                  className="btn btn-success btn-light mb-2 button-nav text-black button-accion"
                  onClick={() => {
                    recibiropcATK(1);
                    modalpyr();
                    cerrarmodal();
                  }}
                >
                  "Ataque Basico"
                </button>
                <button
                  className="btn btn-success btn-light mb-2 button-nav text-black button-accion"
                  onClick={() => {
                    recibiropcATK(2);
                    modalpyr();
                    cerrarmodal();
                  }}
                >
                  "Hablilidad 1"
                </button>
              </div>
              <div className="modal-body navbar-contenedor">
                <button
                  className="btn btn-success btn-light mb-2 button-nav text-black button-accion"
                  onClick={() => {
                    recibiropcATK(3);
                    modalpyr();
                    cerrarmodal();
                  }}
                >
                  "Hablilidad 2"
                </button>
                <button
                  className="btn btn-secondary btn-light mb-2 button-nav text-black button-accion"
                  onClick={() => setModalAtk(false)}
                >
                  "Cancelar"
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
