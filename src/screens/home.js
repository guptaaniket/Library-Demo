import React, { Component } from "react";
import Navbar from "../components/navbar";
import "../styles/style.css";

export default class Home extends Component {
  render() {
    const userType = localStorage.getItem("login");
    const data = JSON.parse(userType);
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="partition"></div>
          <div className="lg-card">
            <h4 className="loader"> Welcome to library</h4>
            <h4 className="loader mt-5"> User Id : { data[0].id }</h4>
            <h4 className="loader mt-5"> User Name : { data[0].name }</h4>
          </div>
        </div>
      </div>
    );
  }
}
