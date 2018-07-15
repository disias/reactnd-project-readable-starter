import { actionTypes } from "../actions/actionTypes";

function comments(
  state = {
    isFetching: false,
    errorMsg: "",
    ids: []
  },
  action
) {
  switch (action.type) {
    case actionTypes.FETCH_COMMENT_FAILURE:
      return Object.assign({}, state, {
        errorMsg: action.errorMsg
      });
    case actionTypes.FETCH_COMMENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errorMsg: ""
      });
    case actionTypes.FETCH_COMMENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errorMsg: "",
        ids: action.comments.result
      });
    case actionTypes.NEW_COMMENT:
      return Object.assign({}, state, {
        isFetching: false,
        errorMsg: "",
        ids: [...state.ids, action.comment.result]
      });
    case actionTypes.DELETE_COMMENT:
      return Object.assign({}, state, {
        isFetching: false,
        errorMsg: "",
        ids: state.ids.filter(id => id !== action.commentId)
      });
    default:
      return state;
  }
}

export const commentbyPost = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMMENT_SUCCESS:
    case actionTypes.FETCH_COMMENT_REQUEST:
      return Object.assign({}, state, {
        [action.postId]: comments(state[action.postId], action)
      });
    case actionTypes.DELETE_COMMENT:
    case actionTypes.NEW_COMMENT:
      return Object.assign({}, state, {
        [action.postId]: comments(state[action.postId], action)
      });
    case actionTypes.DELETE_POST:
      const newState = { ...state };
      if (Object.keys(newState).length > 0) {
        for (var post in newState) {
          if (post === action.postId) {
            delete newState[post];
          }
        }
      }
      return newState;
    default:
      return state;
  }
};
