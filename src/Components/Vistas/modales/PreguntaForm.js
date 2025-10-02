import { useState, useImperativeHandle, forwardRef } from "react";

const PreguntaForm = forwardRef(({}, ref) => {
  const [pregunta, setPregunta] = useState("");
  const [respuestav, setRespuestav] = useState("");
  const [respuesta1, setRespuesta1] = useState("");
  const [respuesta2, setRespuesta2] = useState("");
  const [respuesta3, setRespuesta3] = useState("");
  const [errors, setErrors] = useState({});
  const [errorslist, setErrorslist] = useState({});
  const [preheroe, setPreheroe] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!pregunta) newErrors.pregunta = "La pregunta es obligatoria";
    else if (pregunta.length < 10)
      newErrors.pregunta = "La pregunta debe tener al menos 10 caracteres";
    if (!respuestav)
      newErrors.respuestav = "La respuesta correcta es obligatoria";
    if (!respuesta1)
      newErrors.respuesta1 = "La respuesta incorrecta 1 es obligatoria";
    if (!respuesta2)
      newErrors.respuesta2 = "La respuesta incorrecta 2 es obligatoria";
    if (!respuesta3)
      newErrors.respuesta3 = "La respuesta incorrecta 3 es obligatoria";
    return newErrors;
  };

  const validatelist = () => {
    const newErrors = {};
    if (preheroe.length < 5)
      newErrors.lista =
        "La lista de las preguntas debe de tener al menos 5 preguntas";
    return newErrors;
  };

  const Addpreheroe = () => {
    const errors = validate();
    setErrors(errors);
    if (!(errors && Object.keys(errors).length > 0)) {
      const newpreheroe = {
        Pregunta: pregunta,
        RespuestaV: respuestav,
        RespuestaF1: respuesta1,
        RespuestaF2: respuesta2,
        RespuestaF3: respuesta3,
      };
      setPreheroe([...preheroe, newpreheroe]);
    }
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      const newErrors = validatelist();
      setErrorslist(newErrors);
      if (Object.keys(newErrors).length > 0) {
        return { errors: newErrors, data: null };
      }
      return {
        errors: {},
        data: {
          lispreheroe: preheroe,
        },
      };
    },
  }));

  return (
    <div>
      <h1>Formulario de Pregunta</h1>
      <div className="imag-contenedor text-center mb-4">
        <img
          src={"/avatars/heroes1.png"}
          alt="Perfil"
          width="50%"
          height="300"
        />
        <img
          src={"/avatars/heroes2.png"}
          alt="Perfil"
          width="40%"
          height="300"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="pregunta" className="form-label">
          Pregunta
        </label>
        <input
          type="text"
          id="pregunta"
          className="form-control"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
        />
        {errors.pregunta && <p className="text-danger">{errors.pregunta}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="respuestav" className="form-label">
          Respuesta Correcta
        </label>
        <input
          type="text"
          id="respuestav"
          className="form-control"
          value={respuestav}
          onChange={(e) => setRespuestav(e.target.value)}
        />
        {errors.respuestav && (
          <p className="text-danger">{errors.respuestav}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="respuesta1" className="form-label">
          Respuesta Incorrecta 1
        </label>
        <input
          type="text"
          id="respuesta1"
          className="form-control"
          value={respuesta1}
          onChange={(e) => setRespuesta1(e.target.value)}
        />
        {errors.respuesta1 && (
          <p className="text-danger">{errors.respuesta1}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="respuesta2" className="form-label">
          Respuesta Incorrecta 2
        </label>
        <input
          type="text"
          id="respuesta2"
          className="form-control"
          value={respuesta2}
          onChange={(e) => setRespuesta2(e.target.value)}
        />
        {errors.respuesta2 && (
          <p className="text-danger">{errors.respuesta2}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="respuesta3" className="form-label">
          Respuesta Incorrecta 3
        </label>
        <input
          type="text"
          id="respuesta3"
          className="form-control"
          value={respuesta3}
          onChange={(e) => setRespuesta3(e.target.value)}
        />
        {errors.respuesta3 && (
          <p className="text-danger">{errors.respuesta3}</p>
        )}
      </div>

      <div>
        <button type="button" className="btn btn-success" onClick={Addpreheroe}>
          Agregar Pregunta
        </button>
      </div>

      <div>
        <h2 className="mb-4">Preguntas agregadas:</h2>
        {preheroe.length === 0 && (
          <div className="col">
            <div className="alert alert-info text-center">
              No hay preguntas agregadas.
            </div>
          </div>
        )}
        {preheroe.map((preh, inx) => (
          <div key={inx}>
            <div className="card h-100 shadow">
              <div className="card-body text-content-modal">
                <h1 className="card-title">Pregunta #{inx + 1}</h1>
                <p className="card-text">Pregunta: {preh.Pregunta}</p>
                <p className="card-text">
                  Respuesta Correcta: {preh.RespuestaV}
                </p>
                <p className="card-text">
                  Respuesta Incorrecta 1: {preh.RespuestaF1}
                </p>
                <p className="card-text">
                  Respuesta Incorrecta 2: {preh.RespuestaF2}
                </p>
                <p className="card-text">
                  Respuesta Incorrecta 3: {preh.RespuestaF3}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {errorslist.lista && <p className="text-danger">{errorslist.lista}</p>}
    </div>
  );
});

export default PreguntaForm;
