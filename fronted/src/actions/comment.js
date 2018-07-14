import { arrayOfComments, commentSchema, normalizedResponse } from "./schema";
import { actionTypes } from "./actionTypes";

//action creater
function successNewComment(json, postId) {
  return {
    type: actionTypes.NEW_COMMENT,
    comment: json,
    postId
  };
}

function successEditComment(json, commentId) {
  return {
    type: actionTypes.EDIT_COMMENT,
    comment: json,
    commentId
  };
}

function successVoteComment(commentId, option) {
  return {
    type: actionTypes.VOTE_COMMENT,
    commentId,
    option
  };
}

function successDeleteComment(json, commentId, postId) {
  return {
    type: actionTypes.DELETE_COMMENT,
    comment: json,
    commentId,
    postId
  };
}

function requestComments(postId) {
  return {
    type: actionTypes.FETCH_COMMENT_REQUEST,
    postId
  };
}

function successComments(json, postId) {
  return {
    type: actionTypes.FETCH_COMMENT_SUCCESS,
    comments: json,
    postId
  };
}

function failureComments() {
  return {
    type: actionTypes.FETCH_COMMENT_FAILURE,
    errorMsg: "Error when fetch datas"
  };
}

//thunk
export function fetchComments(postId) {
  return (dispatch, getState, readableApi) => {
    dispatch(requestComments(postId));
    return readableApi.getCommentByPost(postId).then(
      response => {
        const result = normalizedResponse(response, arrayOfComments);
        dispatch(successComments(result, postId));
      },
      error => dispatch(failureComments(error))
    );
  };
}

export function addNewComment(comment) {
  return (dispatch, getState, readableApi) => {
    return readableApi.addNewComment(comment).then(response => {
      const { parentId } = response;
      const result = normalizedResponse(response, commentSchema);
      dispatch(successNewComment(result, parentId));
    }, error => error);
  };
}

export function editCommentById(commentId, comment) {
  return (dispatch, getState, readableApi) => {
    return readableApi.updateComment(commentId, comment).then(response => {
      const result = normalizedResponse(response, commentSchema);
      dispatch(successEditComment(result, commentId));
    }, error => error);
  };
}

export function voteCommentPostById(commentId, option) {
  return (dispatch, getState, readableApi) => {
    return readableApi.voteComment(commentId, option).then(response => {
      dispatch(successVoteComment(commentId, option));
    }, error => error);
  };
}

export function deleteCommentById(commentId) {
  return (dispatch, getState, readableApi) => {
    return readableApi.deleteCommentById(commentId).then(response => {
      const { parentId } = response;
      const result = normalizedResponse(response, commentSchema);
      dispatch(successDeleteComment(result, commentId, parentId));
    }, error => error);
  };
}
