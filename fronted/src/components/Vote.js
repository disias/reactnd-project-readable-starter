import React from "react";
import PropTypes from "prop-types";

const Vote = ({ onVote, id, score }) => (
  <td valign="top" className="votelinks">
    <center>
      <a onClick={() => onVote(id, "upVote")}>
        <div className="votearrow" title="upvote" />
      </a>
      <a>{score}</a>
      <a onClick={() => onVote(id, "downVote")}>
        <div className="votearrowdown" title="downvote" />
      </a>
    </center>
  </td>
);

Vote.propTypes = {
  onVote: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired
};

export default Vote;
