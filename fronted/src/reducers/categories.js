import { actionTypes } from "../actions/actionTypes";

export const categories = (
  state = {
    isFetching: false,
    errorMsg: "",
    names: []
  },
  action
) => {
  let newNames = null;
  switch (action.type) {
    case actionTypes.FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.NEW_POST:
      newNames = new Set(["all", ...state.names, action.category]);
      return {
        ...state,
        names: [...newNames]
      };
    case actionTypes.FETCH_CATEGORY_SUCCESS:
      newNames = new Set(["all", ...action.categories.result.categories]);
      return {
        ...state,
        isFetching: !state.isFetching,
        names: [...newNames]
      };
    case actionTypes.FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        errorMsg: action.errorMsg
      };
    default:
      return state;
  }
};
