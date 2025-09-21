import { useState, useEffect } from "react";

export default function CalificarYRecomendar({ show, onClose }) {
  const [nota, setNota] = useState("");
  const [recomendacion, setRecomendacion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!show) {
      setNota("");
      setRecomendacion("");
      setError("");
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const valorNota = parseFloat(nota.replace(",", "."));
    if (isNaN(valorNota) || valorNota < 0 || valorNota > 5) {
      setError("La nota debe ser un número entre 0 y 5.0");
      return;
    }
    setError("");
    // Aquí puedes manejar el envío de los datos (nota y recomendación)
    alert("¡Calificación y recomendación enviadas!");
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          minWidth: 320,
          width: "50%",
          maxWidth: "5000px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
        }}
      >
        <h4>Calificar y Recomendar</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nota (máximo 5.0):</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              className="form-control"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Recomendación:</label>
            <textarea
              className="form-control"
              value={recomendacion}
              onChange={(e) => setRecomendacion(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-success">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
