import "./stylesmodales.css";

export function ModalMensaje({ mensaje, mostrar, onClose }) {
  return (
    <>
      {mostrar && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={onClose}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Alerta</h5>
              </div>
              <div className="modal-body mensaje-contenedor">
                <h5>{mensaje}</h5>
                <button
                  className="btn button-mensaje"
                  onClick={onClose} // ✅ usa el callback del padre
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
