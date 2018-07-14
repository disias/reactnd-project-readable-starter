import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

const CommentList = ({
  comments,
  onDeleteComment,
  onVoteComment,
  onEditComment
}) => (
  <table border="0" className="comment-tree">
    <tbody>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          onCommentDelete={onDeleteComment}
          onCommentVote={onVoteComment}
          onCommentEdit={onEditComment}
        />
      ))}
    </tbody>
  </table>
);

CommentList.prototype = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onVoteComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired
};

export default CommentList;
