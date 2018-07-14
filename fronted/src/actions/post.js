import { postSchema, arrayOfPosts, normalizedResponse } from "./schema";
import { actionTypes } from "./actionTypes";
import { fetchComments } from "./comment";

function requestPosts(category) {
  return {
    type: actionTypes.FETCH_POST_REQUEST,
    category
  };
}

function successPosts(json, category) {
  return {
    type: actionTypes.FETCH_POST_SUCCESS,
    posts: json,
    category
  };
}

function failurePosts() {
  return {
    type: actionTypes.FETCH_POST_FAILURE,
    errorMsg: "Error when fetch datas"
  };
}

function successNewPost(json, category) {
  return {
    type: actionTypes.NEW_POST,
    post: json,
    category
  };
}

function successEditPost(json, postId) {
  return {
    type: actionTypes.EDIT_POST,
    post: json,
    postId
  };
}

function successVotePost(postId, option) {
  return {
    type: actionTypes.VOTE_POST,
    postId,
    option
  };
}

function successDeletePost(json, postId, category) {
  return {
    type: actionTypes.DELETE_POST,
    post: json,
    postId,
    category
  };
}

export function fetchPosts(category) {
  return (dispatch, getState, readableApi) => {
    const apiRequest =
      category === "all"
        ? readableApi.getPosts()
        : readableApi.getPostsByCategory(category);

    dispatch(requestPosts(category));
    return apiRequest.then(
      response => {
        const result = normalizedResponse(response, arrayOfPosts);
        dispatch(successPosts(result, category));
        normalizedResponse.result.map(postId =>
          dispatch(fetchComments(postId))
        );
      },
      error => dispatch(failurePosts(error))
    );
  };
}

export function fetchPostById(postId) {
  return (dispatch, getState, readableApi) => {
    return readableApi.getPostById(postId).then(
      response => {
        const { category } = response;
        const result = normalizedResponse(response, postSchema);
        dispatch(successNewPost(result, category));
        dispatch(fetchComments(postId));
      },
      error => dispatch(failurePosts(error))
    );
  };
}

export function addNewPost(post) {
  return (dispatch, getState, readableApi) => {
    return readableApi.addNewPost(post).then(response => {
      const { category } = response;
      const result = normalizedResponse(response, postSchema);
      dispatch(successNewPost(result, category));
    }, error => error);
  };
}

export function editPostById(postId, post) {
  return (dispatch, getState, readableApi) => {
    return readableApi.updatePost(postId, post).then(response => {
      const result = normalizedResponse(response, postSchema);
      dispatch(successEditPost(result, postId));
    }, error => error);
  };
}

export function votePostById(postId, option) {
  return (dispatch, getState, readableApi) => {
    return readableApi.votePost(postId, option).then(response => {
      dispatch(successVotePost(postId, option));
    }, error => error);
  };
}

export function deletePostById(postId) {
  return (dispatch, getState, readableApi) => {
    return readableApi.deletePostById(postId).then(response => {
      const { category } = response;
      const result = normalizedResponse(response, postSchema);
      dispatch(successDeletePost(result, postId, category));
    }, error => error);
  };
}
