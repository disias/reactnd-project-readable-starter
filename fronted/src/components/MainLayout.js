import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

/*
render: func
This allows for convenient inline rendering and wrapping without the undesired remounting explained above.
Instead of having a new React element created for you using the component prop, you can pass in a function 
to be called when the location matches. The render prop receives all the same route props as the component 
render prop.
*/

// wrapping/composing
const MainLayout = ({ component: Component, title, option, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <div className="app">
        <center>
          <table
            id="hnmain"
            border="0"
            cellPadding="0"
            cellSpacing="0"
            width="85%"
            bgcolor="#f6f6ef"
          >
            <tbody>
              <Menu title={title} option={option} {...props} />
              <tr style={{ height: "10px" }} />
              <Component {...props} />
              <Footer />
            </tbody>
          </table>
        </center>
      </div>
    )}
  />
);

MainLayout.defaultProps = {
  option: false
};

MainLayout.prototype = {
  component: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  option: PropTypes.bool.isRequired
};

export default MainLayout;
