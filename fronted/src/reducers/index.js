import { actionTypes } from "../actions/actionTypes";
import { combineReducers } from "redux";
import { categories } from "./categories";
import { postByCategory } from "./postByCategory";
import { commentbyPost } from "./commentbyPost";
import { post } from "./post";
import { comment } from "./comment";
import { category } from "./category";

function isFetching(state = false, action) {
  switch (action.type) {
    case actionTypes.FETCH_POST_REQUEST_BY_ID:
      return true;
    case actionTypes.NEW_POST:
      return false;
    default:
      return state;
  }
}

function errorMsg(state = "", action) {
  switch (action.type) {
    case actionTypes.FETCH_POST_FAILURE:
      return action.errorMsg;
    default:
      return state;
  }
}

const entities = (state = {}, action) => {
  return {
    category: category(state.category, action),
    post: post(state.post, action),
    comment: comment(state.comment, action),
    isFetching: isFetching(state.isFetching, action),
    errorMsg: errorMsg(state.errorMsg, action)
  };
};

const rootReducer = combineReducers({
  entities,
  categories,
  postByCategory,
  commentbyPost
});

export default rootReducer;
