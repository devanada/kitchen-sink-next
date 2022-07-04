const initialState = {
  news: [],
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NEWS":
      return {
        ...state,
        news: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
