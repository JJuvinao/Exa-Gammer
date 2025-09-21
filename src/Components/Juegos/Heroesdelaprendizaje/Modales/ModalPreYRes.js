import "../stylesheroes.css";
import { useState } from "react";

export function ModalPreYRes({ preYres, respuesta, cerrarmodal }) {
  const [modalpreYres, setModalpreYres] = useState(preYres);

  return (
    <>
      {modalpreYres && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setModalpreYres(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pregunta y respuesta</h5>
              </div>
              <div className="modal-body">
                <p className="informacion">
                  ¿Cuál de las siguientes estructuras de control en Python se
                  utiliza para ejecutar un bloque de código repetidamente
                  mientras una condición sea verdadera?
                </p>
              </div>
              <div className="modal-body  navbar-contenedor">
                <button
                  className="btn btn-success btn-light mb-2 button-nav text-black button-respuestas"
                  onClick={() => {
                    respuesta("if");
                    cerrarmodal();
                  }}
                >
                  "if"
                </button>
                <button
                  className="btn btn-success btn-light mb-2 button-nav text-black button-respuestas"
                  onClick={() => {
                    respuesta("for");
                    cerrarmodal();
                  }}
                >
                  "for"
                </button>
              </div>
              <div className="modal-body navbar-contenedor">
                <button
                  className="btn btn-success btn-light mb-2 button-nav text-black button-respuestas"
                  onClick={() => {
                    respuesta("while");
                    cerrarmodal();
                  }}
                >
                  "while"
                </button>
                <button
                  className="btn btn-secondary btn-light mb-2 button-nav text-black button-respuestas"
                  onClick={() => {
                    respuesta("switch");
                    cerrarmodal();
                  }}
                >
                  "switch"
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
