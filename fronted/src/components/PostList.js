import React from "react";
import Post from "./Post";
import PropTypes from "prop-types";

const PostList = ({ posts, onDeletePost, onVotePost }) => {
  return posts.length > 0 ? (
    <tr>
      <td>
        <table border="0" cellPadding="0" cellSpacing="0" className="itemlist">
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>
                  <Post
                    post={post}
                    onPostDelete={onDeletePost}
                    onPostVote={onVotePost}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>
    </tr>
  ) : (
    <tr>
      <td style={{ textAlign: "center" }}>No Posts</td>
    </tr>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeletePost: PropTypes.func.isRequired,
  onVotePost: PropTypes.func.isRequired
};

export default PostList;
