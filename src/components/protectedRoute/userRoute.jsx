import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserName } from "../../service/authService/authService";

const UserRoute = ({ component: Component, path, render }) => {
  const user = getUserName();

  return (
    <Route
      path={path}
      render={props => {
        if (user && Component) return <Component {...props} />;
        if (user && render) return render(props);
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default UserRoute;
