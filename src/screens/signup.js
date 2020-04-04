import React, { Component } from "react";
import { ButtonToggle } from "reactstrap";
import { toast } from "react-toastify";
import "../styles/style.css";
import "../styles/toast.css";
toast.configure();

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: ""
    };
  }

  login() {
    const obj = {
      email: this.state.email,
      password: this.state.password
    };
    if (obj.email === "" || obj.password === "") {
      toast.error("All fields are required !", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    } else {
      fetch("http://localhost:3000/login", {
        method: "Post",
        headers: {
          "Content-Type": "user/json"
        },
        body: JSON.stringify(this.state)
      }).then(res => {
        res.json().then(resp => {   
          toast.success("user is added !", {
            position: toast.POSITION.TOP_RIGHT
          });
        });
      });
    }
  }
  render() {
    return (
      <div className="container">    
        <div className="lg-card">
          <h4 className="mb">Signup</h4>
          <div>
            <input
              className="mb"
              type="text"
              placeholder="John"
              name="user"
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
            ></input>
          </div>

          <div>
            <input
              className="mb"
              type="password"
              placeholder="******"
              name="password"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            ></input>
          </div>

          <ButtonToggle
            className="aln-lft"
            color="secondary"
            onClick={() => {
              this.login();
            }}
          >
            Signup
          </ButtonToggle>
        </div>
      </div>
    );
  }
}
