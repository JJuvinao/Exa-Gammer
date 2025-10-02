import { useState, useImperativeHandle, forwardRef } from "react";

const AhorcadoForm = forwardRef(({}, ref) => {
  const [palabra, setPalabra] = useState("");
  const [pista, setPista] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!palabra) newErrors.palabra = "La Palabra es obligatoria";
    if (!pista) newErrors.pista = "La pista es obligatoria";
    return newErrors;
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      const newErrors = validate();
      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) {
        return { errors: newErrors, data: null };
      }
      return {
        errors: {},
        data: {
          palabra: palabra,
          pista: pista,
        },
      };
    },
  }));

  return (
    <div>
      <h1>Formulario de Ahorcado</h1>
      <div className="text-center mb-4">
        <img
          src={"/avatars/ahorcado.png"}
          alt="Perfil"
          width="70%"
          height="400"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="pregunta" className="form-label">
          Palabra
        </label>
        <input
          type="text"
          id="pregunta"
          className="form-control"
          value={palabra}
          onChange={(e) => setPalabra(e.target.value)}
        />
        {errors.palabra && <p className="text-danger">{errors.palabra}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="pista" className="form-label">
          Pista
        </label>
        <input
          type="text"
          id="pista"
          className="form-control"
          value={pista}
          onChange={(e) => setPista(e.target.value)}
        />
        {errors.pista && <p className="text-danger">{errors.pista}</p>}
      </div>
    </div>
  );
});

export default AhorcadoForm;
