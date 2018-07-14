import { arrayOfCategories, normalizedResponse } from "./schema";
import { actionTypes } from "./actionTypes";

//Action Creators
function requestCategories() {
  return {
    type: actionTypes.FETCH_CATEGORY_REQUEST
  };
}

function successCategories(json) {
  return {
    type: actionTypes.FETCH_CATEGORY_SUCCESS,
    categories: json
  };
}

function failureCategories() {
  return {
    type: actionTypes.FETCH_CATEGORY_FAILURE,
    errorMsg: "Error when fetch datas"
  };
}

//thunk
export function fetchCategories() {
  return (dispatch, getState, readableApi) => {
    dispatch(requestCategories(true));
    return readableApi.getCategories().then(
      response => {
        const result = normalizedResponse(response, arrayOfCategories);
        dispatch(successCategories(result));
      },
      error => dispatch(failureCategories(error))
    );
  };
}
