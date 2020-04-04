import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink as Link,
} from "react-router-dom";
import "../styles/style.css";

export default class Navbar extends Component {
  render() {
    const userType = localStorage.getItem("login");
    const data = JSON.parse(userType);
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light nav-clr mb">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/booklist"} className="nav-link">
                  Booklist
                </Link>
              </li>
            </ul>
            {
              typeof data === "undefined" ? '' : data[0].usertype == "user" ? (
              <ul class="navbar-nav">
                <li className="nav-item">
                  <Link to={"/cart"} className="nav-link">
                    Cart
                  </Link>
                </li>
              </ul>
            ):''}

            {localStorage.getItem("login") ? (
              <ul class="navbar-nav">
                <li className="nav-item">
                  <Link to={"/logout"} className="nav-link">
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            )}
          </div>
        </nav>
      </div>
    );
  }
}
