import React from "react";
import { connect } from "react-redux";
import PostList from "../components/PostList";
import { fetchPosts, deletePostById, votePostById } from "../actions/post";
import sortBy from "sort-by";

const getPostsByCategory = (ids, posts, order) => {
  const byOrder = {
    date: "timestamp",
    vote: "voteScore"
  };
  const postsByCategory = ids.map(id => posts[id]);
  if (order) {
    return postsByCategory.sort(sortBy(`-${byOrder[order]}`));
  }
  return postsByCategory;
};

class PostListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onDeletePost = this.onDeletePost.bind(this);
    this.onVotePost = this.onVotePost.bind(this);
  }

  componentDidMount() {
    this.props.getPosts(this.props.category);
  }

  componentDidUpdate(prevProps) {
    const { category, getPosts } = this.props;
    if (category !== prevProps.category) {
      getPosts(category);
    }
  }

  // deleta o post
  onDeletePost(postId) {
    this.props.deletePost(postId);
  }

  // vota no post
  onVotePost(postId, option) {
    this.props.votePost(postId, option);
  }

  render() {
    const { posts, isFetching } = this.props;
    return isFetching && !posts ? (
      <tr>
        <td>..Loading</td>
      </tr>
    ) : (
      <PostList
        posts={posts}
        onDeletePost={this.onDeletePost}
        onVotePost={this.onVotePost}
      />
    );
  }
}

// mapeamento da store para a Props do componente
const mapStateToProps = (state, ownProp) => {
  const {
    match: {
      params: { category = "all", order }
    }
  } = ownProp;
  return {
    category: category,
    posts: state.postByCategory[category]
      ? getPostsByCategory(
          state.postByCategory[category].ids,
          state.entities.post,
          order
        )
      : [],
    isFetching: state.postByCategory.isFetching
  };
};

// mapeamento das actions que seram dispara via dispach para a Props do componente
const mapDispatchToProps = dispatch => {
  return {
    getPosts: category => {
      dispatch(fetchPosts(category));
    },
    deletePost: postId => {
      dispatch(deletePostById(postId));
    },
    votePost: (postId, option) => {
      dispatch(votePostById(postId, option));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListContainer);
