import React from "react";
import { Route, Redirect } from "react-router-dom";
import {
  getUserName,
  getUserRole
} from "../../service/authService/authService";

const ProtectedRoute = ({ component: Component, path }) => {
  const user = getUserName(),
    role = getUserRole();
  return (
    <Route
      path={path}
      render={props => {
        if (user && role === "Amoi") return <Component {...props} />;
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default ProtectedRoute;
