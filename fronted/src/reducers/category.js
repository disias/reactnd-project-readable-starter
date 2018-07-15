import { actionTypes } from "../actions/actionTypes";

export const category = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        ...action.categories.entities.category
      };
    default:
      return state;
  }
};
