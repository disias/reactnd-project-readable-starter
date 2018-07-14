import React from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../actions/category";
import CategoryList from "../components/CategoryList";

class CategoryListContainer extends React.Component {
  // lista todos os posto para montar a barra de menu
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories, isFetching } = this.props;
    return isFetching && !categories ? (
      <span> ..Loading </span>
    ) : (
      <CategoryList categories={categories} />
    );
  }
}

// mapeamento da store para a Props do componente
const mapStateToProps = state => {
  return {
    categories: state.categories.names,
    isFetching: state.categories.isFetching
  };
};

// mapeamento das actions que seram dispara via dispach para a Props do componente
const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(fetchCategories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryListContainer);
