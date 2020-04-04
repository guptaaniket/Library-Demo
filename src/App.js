import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./screens/login";
import Home from "./screens/home";
import Signup from "./screens/signup";
import Booklist from "./screens/booklist";
import Logout from "./components/logout";
import Protected from "./components/protected";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        {/* protected route */}
          <Protected exact path="/booklist" component={Booklist} />
          <Protected exact path="/" component={Home} />

        {/* public route */}
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route
            exact
            path="/login"
            render={props => <Login {...props} />}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
