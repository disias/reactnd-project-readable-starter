import React from "react";
import PropTypes from "prop-types";
import Category from "./Category";

const CategoryList = ({ categories }) => {
  return categories.map((category, index) => (
    <span key={index}>
      <Category category={category} /> |{" "}
    </span>
  ));
};

CategoryList.prototype = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CategoryList;
