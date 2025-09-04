const types = {
  SET_USER: "SET_USER",
  SET_CLASE: "SET_CLASE",
  SET_TOKEN: "SET_TOKEN",
  SET_EXAMEN: "SET_EXAMEN",
};

const initialState = {
  user: { name: null, id: null, rol: null, correo: null, img: null },
  clase: {
    name: null,
    id_clase: null,
    imagen: null,
    tema: null,
    autor: null,
    codigo: null,
  },
  token: { t: null },
  examen: {
    id: null,
    nombre: null,
    tema: null,
    autor: null,
    descripcion: null,
    codigo: null,
    fecha: null,
    imagenexamen: null,
    id_juego: null,
  },
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case types.SET_CLASE:
      return {
        ...state,
        clase: action.payload,
      };
    case types.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case types.SET_EXAMEN:
      return {
        ...state,
        examen: action.payload,
      };
    default:
      return state;
  }
};

export default storeReducer;
export { initialState, types };
