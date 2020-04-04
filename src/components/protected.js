import React from "react";
import { Route, Redirect } from "react-router-dom";

const Protected = ({ component: Cmp, ...props }) => (
  <Route
    {...props}
    render={(props) => (
      localStorage.getItem("login") ? (
        <Cmp {...props} />
      ) : (
        <Redirect to="login" />
      )
    )}
  />
);
export default Protected;
