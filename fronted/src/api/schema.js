import { schema } from "normalizr";

const categorySchema = new schema.Entity("categories", undefined, {
  idAttribute: value => value.name
});
export const categoryListSchema = new schema.Array(categorySchema);
