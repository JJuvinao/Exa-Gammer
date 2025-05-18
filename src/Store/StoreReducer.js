const types = {
  SET_USER: "SET_USER",
  SET_CLASE: "SET_CLASE",
  SET_TOKEN: "SET_TOKEN",
};

const initialState = {
  user: { name: "f", id: null },
  clase: { name: "ff", id: null },
  token: { token: "ff"}
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
    default:
      return state;
  }
};

export default storeReducer;
export { initialState, types };
