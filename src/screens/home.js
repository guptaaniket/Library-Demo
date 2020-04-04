import React, { Component } from "react";
import Navbar from "../components/navbar";
import "../styles/style.css";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
        <div className="partition"></div>
                <h4 className="loader mt-5"> Welcome to library</h4>
        </div>
      </div>
    );
  }
}
