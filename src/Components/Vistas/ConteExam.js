import { useEffect, useState } from "react";
import { ConteExamService } from "../Logica/ExamService";

export default function ConteExam({ codigo, token, id_Juego }) {
  const [contenido, setContenido] = useState();

  useEffect(() => {
    cargarContenido();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cargarContenido = async () => {
    var resul = await ConteExamService({
      codigoe: codigo,
      tokene: token,
      idjuego: id_Juego,
    });
    switch (id_Juego) {
      case 2:
        setContenido(MostarPregunHeroes({ Preguntas: resul }));
        break;
      case 1:
        setContenido(
          MostrarAhorcado({ palabra: resul.palabra, pista: resul.pista })
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="card shadow mt-4">
      <div className="card-body">
        <h3 className="card-title">Contenido del Examen</h3>
        {contenido}
      </div>
    </div>
  );
}

function MostarPregunHeroes({ Preguntas }) {
  return (
    <div className="list-group">
      {Preguntas.length > 0 ? (
        <div className="list-group">
          {Preguntas.map((r, idx) => (
            <div
              key={idx}
              className="list-group-item list-group-item-action flex-column align-items-start"
            >
              <p>#preguntas: {idx + 1}</p>
              <div className="d-flex w-100 justify-content-between">
                <p>
                  <strong> Pregunta:</strong> {r.pregunta}
                </p>
              </div>
              <p className="mb-1">
                <strong> Respuesta correcta:</strong> {r.respuestaV}
              </p>
              <p className="mb-1">
                <strong> Respuesta incorrecta 1:</strong> {r.respuestaF1}
              </p>
              <p className="mb-1">
                <strong> Respuesta incorrecta 2:</strong> {r.respuestaF2}
              </p>
              <p className="mb-1">
                <strong> FaRespuesta incorrecta 3:</strong> {r.respuestaF3}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay resultados para mostrar.</p>
      )}
    </div>
  );
}

function MostrarAhorcado({ palabra, pista }) {
  return (
    <div className="list-group">
      <div className="list-group">
        <div className="d-flex w-100 justify-content-between">
          <p>
            <strong> Palabra: </strong>
            {palabra}
          </p>
        </div>
        <p className="mb-1">
          <strong> Respuesta correcta:</strong> {pista}
        </p>
      </div>
    </div>
  );
}
