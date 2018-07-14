import React from "react";
import PropTypes from "prop-types";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        id: "",
        title: "",
        author: "",
        category: "",
        body: ""
      },
      edit: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.post && props.post.category !== state.form.category) {
      const { id, title, author, category, body } = props.post;
      return {
        form: { id, title, author, category, body },
        edit: true
      };
    }
    return null;
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
  }

  render() {
    const { categories } = this.props;
    const { form, edit } = this.state;

    return (
      <tr>
        <td>
          <form onSubmit={this.handleSubmit}>
            <table border="0">
              <tbody>
                <tr>
                  <td>Title</td>
                  <td>
                    <input
                      type="text"
                      name="title"
                      size="50"
                      required
                      value={form.title}
                      onChange={this.handleChange}
                    />
                    <span style={{ marginLeft: "10px" }} />
                  </td>
                </tr>
                <tr>
                  <td>Author</td>
                  <td>
                    <input
                      type="text"
                      name="author"
                      size="50"
                      required
                      value={form.author}
                      onChange={this.handleChange}
                      disabled={edit}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>
                    <select
                      name="category"
                      required
                      value={form.category}
                      onChange={this.handleChange}
                      disabled={edit}
                    >
                      <option value="">Select a category</option>
                      {categories ? (
                        categories.map(categ => (
                          <option key={categ} value={categ}>
                            {categ}
                          </option>
                        ))
                      ) : (
                        <option value={form.category}>{form.category}</option>
                      )}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td />
                </tr>
                <tr>
                  <td>Body</td>
                  <td>
                    <textarea
                      name="body"
                      rows="4"
                      cols="49"
                      required
                      value={form.body}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td>
                    <input type="submit" value="submit" />
                  </td>
                </tr>
                <tr style={{ height: "20px" }} />
                <tr>
                  <td />
                  <td>Please, fill in all the inputs for create a new Post.</td>
                </tr>
              </tbody>
            </table>
          </form>
        </td>
      </tr>
    );
  }
}

PostForm.propTypes = {
  post: PropTypes.object,
  categories: PropTypes.arrayOf(PropTypes.string),
  onSubmmit: PropTypes.func.isRequired
};

export default PostForm;
