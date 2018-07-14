import React from "react";
import "../s.gif";
import Post from "./Post";
import CommentList from "./CommentList";
import PropTypes from "prop-types";

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        id: "",
        author: "",
        body: ""
      },
      edit: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      form: { ...this.state.form, [name]: value }
    });
  }

  handleSubmit(event) {
    const { form } = this.state;
    event.preventDefault();
    this.props.onSubmmit(form);
    this.clearForm();
  }

  handleForm(comment) {
    this.setState({
      form: { id: comment.id, author: comment.author, body: comment.body },
      edit: false
    });
  }

  clearForm() {
    this.setState({
      form: {
        id: "",
        author: "",
        body: ""
      },
      edit: true
    });
  }

  render() {
    const {
      post,
      comments,
      onDeletePost,
      onVotePost,
      onDeleteComment,
      onVoteComment
    } = this.props;

    const { form, edit } = this.state;

    return (
      <tr>
        <td>
          <table className="fatitem" border="0">
            <tbody>
              <tr>
                <td>
                  <Post.Title
                    post={post}
                    onPostDelete={onDeletePost}
                    onPostVote={onVotePost}
                    metaData
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <br />

                  <form
                    method="post"
                    onSubmit={this.handleSubmit}
                    style={{ marginLeft: "20px" }}
                  >
                    Author :{" "}
                    <input
                      type="text"
                      name="author"
                      size="50"
                      required
                      value={form.author}
                      disabled={edit}
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    <textarea
                      name="body"
                      rows="6"
                      cols="56"
                      required
                      value={form.body}
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    <input type="submit" value="save" />{" "}
                    <input
                      type="button"
                      onClick={this.clearForm}
                      value="clear"
                    />
                  </form>

                  <br />
                  <br />

                  <CommentList
                    comments={comments}
                    onDeleteComment={onDeleteComment}
                    onVoteComment={onVoteComment}
                    onEditComment={this.handleForm}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    );
  }
}

PostDetail.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object),
  onDeletePost: PropTypes.func.isRequired,
  onVotePost: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onVoteComment: PropTypes.func.isRequired
};

export default PostDetail;
