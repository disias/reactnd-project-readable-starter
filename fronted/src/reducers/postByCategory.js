import { actionTypes } from "../actions/actionTypes";

function posts(
  state = {
    isFetching: false,
    errorMsg: "",
    ids: []
  },
  action
) {
  switch (action.type) {
    case actionTypes.FETCH_POST_FAILURE:
      return Object.assign({}, state, {
        errorMsg: action.errorMsg
      });
    case actionTypes.FETCH_POST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errorMsg: ""
      });
    case actionTypes.FETCH_POST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errorMsg: "",
        ids: action.posts.result
      });
    case actionTypes.NEW_POST:
      return Object.assign({}, state, {
        isFetching: false,
        errorMsg: "",
        ids: [...state.ids, action.post.result]
      });
    case actionTypes.DELETE_POST:
      return Object.assign({}, state, {
        isFetching: false,
        errorMsg: "",
        ids: state.ids.filter(id => id !== action.postId)
      });
    default:
      return state;
  }
}

export const postByCategory = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POST_SUCCESS:
    case actionTypes.FETCH_POST_REQUEST:
      return Object.assign({}, state, {
        [action.category]: posts(state[action.category], action)
      });
    case actionTypes.DELETE_POST:
    case actionTypes.NEW_POST:
      return Object.assign({}, state, {
        [action.category]: posts(state[action.category], action),
        all: posts(state["all"], action)
      });
    default:
      return state;
  }
};
