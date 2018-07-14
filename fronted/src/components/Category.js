import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Category = ({ category }) => {
  return <NavLink to={`/${category}`}>{category}</NavLink>;
};

Category.prototype = {
  category: PropTypes.string.isRequired
};

export default Category;
