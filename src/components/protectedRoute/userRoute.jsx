import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserName } from "../../service/authService/authService";

const UserRoute = ({ component: Component, path }) => {
  const user = getUserName();

  return (
    <Route
      path={path}
      render={props => {
        if (user) return <Component {...props} />;
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default UserRoute;
