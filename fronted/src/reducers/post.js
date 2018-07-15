import { actionTypes } from "../actions/actionTypes";

export const post = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POST_SUCCESS:
      return {
        ...state,
        ...action.posts.entities.post
      };
    case actionTypes.EDIT_POST:
    case actionTypes.NEW_POST:
      return {
        ...state,
        [action.post.result]: {
          ...state[action.post.result],
          ...action.post.entities.post[action.post.result]
        }
      };
    case actionTypes.DELETE_POST:
      const { [action.postId]: omit, ...rest } = state;
      return { ...rest };
    case actionTypes.FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: [...action.comments.result]
        }
      };
    case actionTypes.NEW_COMMENT:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          commentCount: state[action.postId].commentCount + 1,
          comments: [...state[action.postId].comments, action.comment.result]
        }
      };
    case actionTypes.DELETE_COMMENT:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          commentCount: state[action.postId].commentCount - 1,
          comments: state[action.postId].comments.filter(
            id => id !== action.commentId
          )
        }
      };
    case actionTypes.VOTE_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          voteScore:
            action.option === "upVote"
              ? state[action.postId].voteScore + 1
              : state[action.postId].voteScore - 1
        }
      };
    default:
      return state;
  }
};
