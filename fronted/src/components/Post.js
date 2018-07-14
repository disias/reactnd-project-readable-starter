import React from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import Vote from "./Vote";
import PropTypes from "prop-types";

const Post = ({ post, onPostDelete, onPostVote, metaData }) => (
  <table border="0" cellPadding="0" cellSpacing="0">
    <tbody>
      <tr className="athing">
        <td align="right" valign="top" className="title" />
        <Vote onVote={onPostVote} id={post.id} score={post.voteScore} />
        <td className="title">
          <NavLink to={`/${post.id}/detail`} activeClassName="storylink">
            {post.title}
          </NavLink>
          <span className="sitebit comhead"> ({post.category})</span>
        </td>
      </tr>
      <tr>
        <td colSpan="2" />
        <td className="subtext">
          by {post.author}{" "}
          <span className="age">{moment(post.timestamp).format("LLLL")}</span>{" "}
          <span>
            {" "}
            | <NavLink to={`/${post.id}/edit`}>Edit</NavLink>
          </span>{" "}
          |{" "}
          <a
            onClick={() => {
              onPostDelete(post.id);
            }}
          >
            Delete
          </a>{" "}
          |{" "}
          <NavLink to={`/${post.id}/edit`}>
            {post.commentCount}&nbsp;comments
          </NavLink>
        </td>
      </tr>

      {metaData && <tr style={{ height: "10px" }} />}
      {metaData && (
        <tr>
          <td colSpan="2" />
          <td style={{ height: "10px", paddingLeft: "10px" }}>{post.body}</td>
        </tr>
      )}
      {metaData && <tr style={{ height: "10px" }} />}
    </tbody>
  </table>
);

Post.defaultProps = {
  metaData: false
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    timestamp: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string
  }).isRequired,
  onPostDelete: PropTypes.func.isRequired,
  onPostVote: PropTypes.func.isRequired,
  metaData: PropTypes.bool.isRequired
};

export default Post;
