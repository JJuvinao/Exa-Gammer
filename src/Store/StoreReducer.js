const types = {
  SET_USER: "SET_USER",
  SET_CLASE: "SET_CLASE",
  SET_TOKEN: "SET_TOKEN",
  SET_EXAMEN: "SET_EXAMEN",
};

const initialState = {
  user: { name: null, id: null, rol: null, correo: null, img: null },
  clase: { name: null, id_clase: null },
  token: { t: null},
  examen: { id: null, nombre: null, codigo: null },
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
