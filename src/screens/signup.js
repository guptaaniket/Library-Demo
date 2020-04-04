import React, { Component } from "react";
import { ButtonToggle } from "reactstrap"
import { NavLink,withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/style.css";
import "../styles/toast.css";
toast.configure();

 class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      usertype: "",
    };
  }

  signUp() {
    const obj = {
      name: this.state.name,
      password: this.state.password,
      usertype: this.state.usertype,
    };

    if (obj.name === "" || obj.password === "" || obj.usertype === "") {
      toast.error("All fields are required !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else {
      console.log("obj>>>>>>>", obj);
      fetch("http://localhost:3000/signup/", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }).then((res) => {
        res.json().then((resp) => {
          this.props.history.push("/login");

          toast.success("user is added !", {
            position: toast.POSITION.TOP_RIGHT,
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
              className="form-control mb"
              type="text"
              placeholder="John"
              name="email"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            ></input>
          </div>
          <div>
            <select
              class="form-control mb"
              id="exampleFormControlSelect1"
              onChange={(e) => {
                this.setState({ usertype: e.target.value });
              }}
            >
              <option selected>Select User</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
            <NavLink to="/login" className="text-decoration-none">
              Already have account ?
            </NavLink>
            <ButtonToggle
            className="aln-lft"
            color="secondary"
            onClick={() => {
              this.signUp();
            }}
          >
            Signup
          </ButtonToggle>
            </div>
         
        </div>
      </div>
    );
  }
}

export default withRouter(Signup)