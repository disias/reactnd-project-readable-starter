import React from "react";
import Vote from "./Vote";
import moment from "moment";
import PropTypes from "prop-types";

const Comment = ({
  comment,
  onCommentVote,
  onCommentEdit,
  onCommentDelete
}) => (
  <tr className="athing comtr ">
    <td>
      <table border="0">
        <tbody>
          <tr>
            <td className="ind">
              <img src="s.gif" height="1" width="0" alt="" />
            </td>

            <Vote
              onVote={onCommentVote}
              id={comment.id}
              score={comment.voteScore}
            />

            <td className="default">
              <div style={{ padding: "10px" }}>
                <span className="comhead">
                  <a className="hnuser">{comment.author}</a>{" "}
                  <span className="age">
                    {moment(comment.timestamp).format("LLLL")}
                  </span>
                </span>
              </div>
              <br />
              <div className="comment">
                <span className="c00">
                  {comment.body}
                  <div className="reply">
                    <p>
                      <font size="1">
                        <u>
                          <a onClick={() => onCommentEdit(comment)}>edit</a>
                        </u>
                        {"     "}
                        <u>
                          <a onClick={e => onCommentDelete(comment.id, e)}>
                            delete
                          </a>
                        </u>
                      </font>
                    </p>
                  </div>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
);

Comment.prototype = {
  coment: PropTypes.shape({
    id: PropTypes.number,
    timestamp: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    parentId: PropTypes.number
  }).isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  onCommentEdit: PropTypes.func.isRequired,
  onCommentVote: PropTypes.func.isRequired
};

export default Comment;
