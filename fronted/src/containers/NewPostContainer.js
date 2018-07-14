import React from "react";
import PostForm from "../components/PostForm";
import { addNewPost } from "../actions/post";
import { fetchCategories } from "../actions/category";
import { connect } from "react-redux";

class NewPostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // em caso de refresh da pagina
    const { categories, getCategories } = this.props;
    if (categories.length === 0) {
      getCategories();
    }
  }

  // cria o post e volta para pagina principal
  onSubmit = form => {
    const { history, newPost } = this.props;
    newPost({
      id: Date.now().toString(),
      timestamp: Date.now(),
      title: form.title,
      body: form.body,
      author: form.author,
      category: form.category
    });

    history.push("/");
  };

  render() {
    const { categories, isFetching } = this.props;
    return isFetching && !categories ? (
      <tr>
        <td style={{ textAlign: "center" }}>..Loading</td>
      </tr>
    ) : (
      <PostForm
        categories={categories}
        onSubmit={this.onSubmit}
        metaData={"Please, fill in all the inputs for create a Post."}
      />
    );
  }
}

// mapeamento da store para a Props do componente
const mapStateToProps = (state, ownProps) => {
  const { history } = ownProps;
  return {
    categories: state.categories.names.filter(category => category !== "all"),
    history,
    isFetching: state.categories.isFetching
  };
};

// mapeamento das actions que seram dispara via dispach para a Props do componente
const mapDispatchToProps = dispatch => {
  return {
    newPost: post => {
      dispatch(addNewPost(post));
    },
    getCategories: () => dispatch(fetchCategories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostContainer);
