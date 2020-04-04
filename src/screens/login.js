import React, { Component } from "react";
import { ButtonToggle } from "reactstrap";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/style.css";
import "../styles/toast.css";
toast.configure();

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
    };
  }

  login() {
    const obj = {
      name: this.state.name,
      password: this.state.password,
    };
   
    if (obj.name === "" || obj.password === "") {
      toast.error("All fields are required !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else {
      fetch("http://localhost:3000/signup?q=" + this.state.name).then(
        (data) => {
          data.json().then((resp) => {
            console.log("resp", resp);
            if (resp.length > 0) {
              localStorage.setItem("login", JSON.stringify(resp));
              this.props.history.push("/booklist");
            } else {
              toast.error("Please check user name and password !", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          });
        }
      );
    }
  }
  render() {
    return (
      <div className="container">
        <div className="info-card">
          <div>
            <b>User </b> Name :user Password: user
          </div>
          <div>
            <b>Admin</b> Name :admin Password: admin
          </div>
        </div>
        <div className="lg-card">
          <h4 className="mb">Login</h4>
          <div>
            <input
              className="form-control mb"
              type="text"
              placeholder="John"
              name="name"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            ></input>
          </div>

          <div>
            <input
              className="form-control mb"
              type="password"
              placeholder="******"
              name="password"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            ></input>
          </div>
          <div className="flex">
            <NavLink to="/signup" className="text-decoration-none">
              Don't have account ?
            </NavLink>
            <ButtonToggle
              className="aln-lft"
              color="secondary"
              onClick={() => {
                this.login();
              }}
            >
              Login
            </ButtonToggle>
          </div>
        </div>
      </div>
    );
  }
}
