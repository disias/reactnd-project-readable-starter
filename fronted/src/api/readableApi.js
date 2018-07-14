const api = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};

//categories
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data);

//Posts
export const getPostsByCategory = category => {
  return fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);
};

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getPostById = postId =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const addNewPost = post =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(data => data);

export const votePost = (postId, option) =>
  fetch(`${api}/posts/${postId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option })
  })
    .then(res => res.json())
    .then(data => data);

export const updatePost = (postId, option) =>
  fetch(`${api}/posts/${postId}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(option)
  })
    .then(res => res.json())
    .then(data => data);

export const deletePostById = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: "DELETE",
    headers
  })
    .then(res => res.json())
    .then(data => data);

// Coments
export const getCommentByPost = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getCommentById = commentId =>
  fetch(`${api}/Comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const addNewComment = comment =>
  fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(data => data);

export const voteComment = (commentId, option) =>
  fetch(`${api}/comments/${commentId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option })
  })
    .then(res => res.json())
    .then(data => data);

export const updateComment = (commentId, option) =>
  fetch(`${api}/Comments/${commentId}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(option)
  })
    .then(res => res.json())
    .then(data => data);

export const deleteCommentById = commentId =>
  fetch(`${api}/comments/${commentId}`, {
    method: "DELETE",
    headers
  })
    .then(res => res.json())
    .then(data => data);
