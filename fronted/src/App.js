import React, { Component } from "react";
import "./App.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import * as readableApi from "./api/readableApi";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import PostListContainer from "./containers/PostListContainer";
import NewPostContainer from "./containers/NewPostContainer";
import EditPostContainer from "./containers/EditPostContainer";
import PostDetailContainer from "./containers/PostDetailContainer";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(readableApi), createLogger())
);

const NoMatch = ({ location }) => (
  <div style={{ textAlign: "center" }}>
    <h3>
      404 No found <code>{location.pathname}</code>
    </h3>
    <h4>
      <Link to={"/"}>Back Home</Link>
    </h4>
  </div>
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <MainLayout
              exact
              path="/"
              title={"Readable"}
              option
              component={PostListContainer}
            />
            <MainLayout
              exact
              path="/post/new"
              title={"New Post"}
              component={NewPostContainer}
            />

            <MainLayout
              exact
              path="/:post/edit"
              title={"Edit Post"}
              component={EditPostContainer}
            />

            <MainLayout
              exact
              path="/:category/:post"
              title={"Readable"}
              component={PostDetailContainer}
            />

            <MainLayout
              exact
              path="/:category"
              title={"Readable"}
              option
              component={PostListContainer}
            />

            <MainLayout
              exact
              path="/:category/order/:order(vote|date)"
              title={"Readable"}
              option={true}
              component={PostListContainer}
            />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
