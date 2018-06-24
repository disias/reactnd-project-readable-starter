import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getCategories } from "./api/readableApi";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    getCategories().then(categories => {
      this.setState({ categories });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {this.state.categories.length > 0 &&
            this.state.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
