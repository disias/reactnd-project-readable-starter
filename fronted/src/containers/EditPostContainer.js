import React from "react";
import { connect } from "react-redux";
import PostForm from "../components/PostForm";
import { Link } from "react-router-dom";
import { editPostById, fetchPostById } from "../actions/post";

class EditPostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // em caso de refresh na pagina
    const { postId, post, getPost } = this.props;
    if (!post) {
      getPost(postId);
    }
  }

  // edita o post e volta para pagina anterior
  onSubmit = form => {
    const { postId, history, editPost } = this.props;
    editPost(postId, {
      title: form.title,
      body: form.body
    });
    history.goBack();
  };

  render() {
    const { post, isFetching, isError } = this.props;
    return (isFetching && !post) || (!isFetching && !post) ? (
      <tr>
        {isError ? (
          <td style={{ textAlign: "center" }}>
            <Link to={"/"}>404 Post Not Found</Link>
          </td>
        ) : (
          <td style={{ textAlign: "center" }}>..Loading</td>
        )}
      </tr>
    ) : (
      <PostForm
        post={post}
        onSubmit={this.onSubmit}
        metaData={"Please, fill in all the inputs for edit a Post."}
      />
    );
  }
}

// mapeamento da store para a Props do componente
const mapStateToProps = (state, ownProps) => {
  const {
    history,
    match: {
      params: { post }
    }
  } = ownProps;
  return {
    postId: post,
    post: state.entities.post[post],
    history,
    isFetching: state.entities.isFetching,
    isError: state.entities.errorMsg !== ""
  };
};

// mapeamento das actions que seram dispara via dispach para a Props do componente
const mapDispatchToProps = dispatch => {
  return {
    editPost: (postId, post) => dispatch(editPostById(postId, post)),
    getPost: postId => dispatch(fetchPostById(postId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostContainer);
