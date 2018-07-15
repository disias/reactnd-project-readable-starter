import { actionTypes } from "../actions/actionTypes";

export const comment = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        ...action.comments.entities.comment
      };
    case actionTypes.EDIT_COMMENT:
    case actionTypes.NEW_COMMENT:
      return {
        ...state,
        ...action.comment.entities.comment
      };
    case actionTypes.DELETE_COMMENT:
      const { [action.commentId]: omit, ...rest } = state;
      return { ...rest };
    case actionTypes.DELETE_POST:
      const newState = { ...state };
      if (Object.keys(newState).length > 0) {
        for (var comment in newState) {
          if (newState[comment].parentId === action.postId) {
            delete newState[comment];
          }
        }
      }
      return newState;
    case actionTypes.VOTE_COMMENT:
      return {
        ...state,
        [action.commentId]: {
          ...state[action.commentId],
          voteScore:
            action.option === "upVote"
              ? state[action.commentId].voteScore + 1
              : state[action.commentId].voteScore - 1
        }
      };

    default:
      return state;
  }
};
