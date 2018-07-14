import { schema, normalize } from "normalizr";

/*
https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
Normalizr is a small, but powerful utility for taking JSON with a schema definition 
and returning nested entities with their IDs, gathered in dictionaries.
*/

//normalizr
export const categorySchema = new schema.Entity("category", undefined, {
  idAttribute: value => value.name
});

export const commentSchema = new schema.Entity("comment");

export const postSchema = new schema.Entity("post", {
  category: categorySchema,
  coments: [commentSchema]
});

export const arrayOfCategories = {
  categories: [categorySchema]
};

export const arrayOfPosts = new schema.Array(postSchema);
export const arrayOfComments = new schema.Array(commentSchema);

export const normalizedResponse = (json, schema) => {
  return normalize(json, schema);
};
