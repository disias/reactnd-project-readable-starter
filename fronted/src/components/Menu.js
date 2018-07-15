import React from "react";
import logo from "../assets/logo.png";
import PropTypes from "prop-types";
import CategoryListContainer from "../containers/CategoryListContainer";
import { NavLink } from "react-router-dom";

const Menu = ({
  history,
  title,
  option,
  match: {
    params: { category = "all" }
  }
}) => (
  <tr>
    <td bgcolor="#ff6600">
      <table
        border="0"
        cellPadding="0"
        cellSpacing="0"
        width="100%"
        style={{ padding: "2px" }}
      >
        <tbody>
          <tr>
            <td style={{ width: "18px", paddingRight: "4px" }}>
              <NavLink to={"/"}>
                <img
                  alt="logo"
                  src={logo}
                  width="18"
                  height="18"
                  style={{ border: "1px white solid" }}
                />
              </NavLink>
            </td>
            <td style={{ lineHeight: "12pt", height: "10px" }}>
              <span className="pagetop">
                <b className="hnname">{title} </b>

                {option && <CategoryListContainer />}
              </span>
            </td>

            {option ? (
              <td style={{ textAlign: "right", paddingRight: "4px" }}>
                <span className="pagetop">
                  Order By (<NavLink to={`/${category}/order/vote`}>
                    {" "}
                    Vote
                  </NavLink>|
                  <NavLink to={`/${category}/order/date`}> Date</NavLink>) |{" "}
                  <NavLink to={`/post/new`}>New Post</NavLink>{" "}
                </span>
              </td>
            ) : (
              <td style={{ textAlign: "right", paddingRight: "4px" }}>
                <span className="pagetop">
                  <NavLink to={""} onClick={() => history.goBack()}>
                    Back
                  </NavLink>{" "}
                </span>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
);

Menu.propTypes = {
  title: PropTypes.string.isRequired,
  option: PropTypes.bool.isRequired
};

export default Menu;
