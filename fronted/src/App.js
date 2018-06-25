import React, { Component } from "react";
import redux_logo from "./redux.svg";
import react_logo from "./react.svg";
import udacity_logo from "./udacity.svg";
import logo from "./logo.png";
import { getCategories } from "./api/readableApi";
import "semantic-ui-css/semantic.min.css";
import { Menu, Feed, Icon, Label } from "semantic-ui-react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ["all"]
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount() {
    getCategories().then(categories => {
      this.setState(prevState => ({
        categories: prevState.categories.concat(categories)
      }));
    });
  }

  render() {
    return (
      <div>
        <Menu stackable>
          <Menu.Item>
            <img src={logo} alt="logo" />
          </Menu.Item>

          {this.state.categories.length > 0 &&
            this.state.categories.map((category, index) => (
              <Menu.Item
                key={index}
                name={category}
                active={category === this.state.activeItem}
                onClick={this.handleItemClick}
              >
                {category}
              </Menu.Item>
            ))}
        </Menu>

        <Feed size="large">
          <Feed.Event>
            <Feed.Label image={udacity_logo} />
            <Feed.Content>
              <Feed.Summary>
                <a>Joe Henderson</a> posted on his page
                <Feed.Date>3 days ago</Feed.Date>
              </Feed.Summary>
              <Feed.Extra text>
                Ours is a life of constant reruns. We're always circling back to
                where we'd we started, then starting all over again. Even if we
                don't run extra laps that day, we surely will come back for more
                of the same another day soon.
              </Feed.Extra>
              <Feed.Meta>
                <Label>
                  <Icon name="comment" />
                  5 Comments
                </Label>
                <a>
                  <Icon name="edit outline" />
                  Edit
                </a>
                <a>
                  <Icon name="delete" />
                  Delete
                </a>
                <Label as="a">
                  <a>
                    <Icon name="plus" />
                  </a>
                </Label>
                <Icon name="like" />
                5 Likes
                <Label as="a">
                  <a>
                    <Icon name="minus" />
                  </a>
                </Label>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>

          <Feed.Event>
            <Feed.Label image={react_logo} />
            <Feed.Content>
              <Feed.Summary>
                <a>Joe Henderson</a> posted on his page
                <Feed.Date>3 days ago</Feed.Date>
              </Feed.Summary>
              <Feed.Extra text>
                Ours is a life of constant reruns. We're always circling back to
                where we'd we started, then starting all over again. Even if we
                don't run extra laps that day, we surely will come back for more
                of the same another day soon.
              </Feed.Extra>
              <Feed.Meta>
                <Label>
                  <Icon name="comment" />
                  5 Comments
                </Label>
                <a>
                  <Icon name="edit outline" />
                  Edit
                </a>
                <a>
                  <Icon name="delete" />
                  Delete
                </a>
                <Label as="a">
                  <a>
                    <Icon name="plus" />
                  </a>
                </Label>
                <Icon name="like" />
                5 Likes
                <Label as="a">
                  <a>
                    <Icon name="minus" />
                  </a>
                </Label>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>

          <Feed.Event>
            <Feed.Label image={redux_logo} />
            <Feed.Content>
              <Feed.Summary>
                <a>Joe Henderson posted on his page</a>
                <Feed.Date>3 days ago</Feed.Date>
              </Feed.Summary>
              <Feed.Extra text>
                Ours is a life of constant reruns. We're always circling back to
                where we'd we started, then starting all over again. Even if we
                don't run extra laps that day, we surely will come back for more
                of the same another day soon.
              </Feed.Extra>
              <Feed.Meta>
                <Label>
                  <Icon name="comment" />
                  5 Comments
                </Label>
                <a>
                  <Icon name="edit outline" />
                  Edit
                </a>
                <a>
                  <Icon name="delete" />
                  Delete
                </a>
                <Label as="a">
                  <a>
                    <Icon name="plus" />
                  </a>
                </Label>
                <Icon name="like" />
                5 Likes
                <Label as="a">
                  <a>
                    <Icon name="minus" />
                  </a>
                </Label>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </div>
    );
  }
}

export default App;
