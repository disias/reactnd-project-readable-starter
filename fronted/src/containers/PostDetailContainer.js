import React from "react";
import { connect } from "react-redux";
import PostDetail from "../components/PostDetail";
import { deletePostById, votePostById, fetchPostById } from "../actions/post";
import {
  addNewComment,
  deleteCommentById,
  voteCommentPostById,
  editCommentById
} from "../actions/comment";
import { Link } from "react-router-dom";
import sortBy from "sort-by";

const getCommentsByPost = (ids, comments) => {
  const commentsByPost = ids.map(id => comments[id]);
  return commentsByPost.sort(sortBy(`-timestamp`));
};

class PostDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onDeletePost = this.onDeletePost.bind(this);
    this.onVotePost = this.onVotePost.bind(this);
    this.onDeleteComment = this.onDeleteComment.bind(this);
    this.onVoteComment = this.onVoteComment.bind(this);
  }

  componentDidMount() {
    // em caso de refresh na pagina
    const { postId, post, getPost, category } = this.props;
    if (!post) {
      getPost(postId, category);
    }
  }

  // deleta o post e volta para pagina inicial
  onDeletePost(postId) {
    const { history, deletePost } = this.props;
    deletePost(postId);
    history.push("/");
  }

  // vota no post de acordo com a opção + ou - que
  // é tratado no Api
  onVotePost(postId, option) {
    this.props.votePost(postId, option);
  }

  // deleta o post
  onDeleteComment(commentId) {
    this.props.deleteComment(commentId);
  }

  // vota no comentario do post
  onVoteComment(commentId, option) {
    this.props.voteComment(commentId, option);
  }

  // recebi o formulario do comentario e verifica
  // se o id, se estiver preenchido é alteração em algum post
  // se não é um inclusão
  onEditComment = form => {
    const { newComment, editComment } = this.props;
    if (form.id === "") {
      newComment({
        id: Date.now().toString(),
        timestamp: Date.now(),
        title: form.title,
        author: form.author,
        body: form.body,
        parentId: this.props.postId
      });
    } else {
      editComment(form.id, {
        timestamp: Date.now(),
        body: form.body
      });
    }
  };

  // edita o post e volta para pagina de detalhe do post
  onEditPost = form => {
    const { editPost, history, postId } = this.props;
    editPost(postId, {
      title: form.title,
      body: form.body
    });

    history.push(`/${postId}/detail`);
  };

  render() {
    const { post, isFetching, comments, isError } = this.props;
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
      <PostDetail
        post={post}
        onEditPost={this.onEditPost}
        onDeletePost={this.onDeletePost}
        onVotePost={this.onVotePost}
        onDeleteComment={this.onDeleteComment}
        onVoteComment={this.onVoteComment}
        onSubmit={this.onEditComment}
        comments={comments}
      />
    );
  }
}

// mapeamento da store para a Props do componente
const mapStateToProps = (state, ownProps) => {
  const {
    history,
    match: {
      params: { category, post }
    }
  } = ownProps;
  return {
    postId: post,
    category: category,
    post: state.entities.post[post],
    comments: state.commentbyPost[post]
      ? getCommentsByPost(state.commentbyPost[post].ids, state.entities.comment)
      : [],
    history,
    isFetching: state.entities.isFetching,
    isError: state.entities.errorMsg !== ""
  };
};

// mapeamento das actions que seram dispara via dispach para a Props do componente
const mapDispatchToProps = dispatch => {
  return {
    newComment: comment => {
      dispatch(addNewComment(comment));
    },
    deleteComment: commentId => {
      dispatch(deleteCommentById(commentId));
    },
    voteComment: (commentId, option) => {
      dispatch(voteCommentPostById(commentId, option));
    },
    editComment: (commentId, comment) =>
      dispatch(editCommentById(commentId, comment)),

    deletePost: postId => {
      dispatch(deletePostById(postId));
    },
    votePost: (postId, option) => {
      dispatch(votePostById(postId, option));
    },
    getPost: (postId, category) => dispatch(fetchPostById(postId, category))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailContainer);
