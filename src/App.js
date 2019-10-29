import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login/login";
import Admin from "./components/admin/admin";
import NotFound from "./components/not-found/notFound";
import LogOut from "./components/logout/logout";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import UserRoute from "./components/protectedRoute/userRoute";
import User from "./components/user/user";
import Home from "./components/home/home";

class App extends Component {
  state = {
    userName: ""
  };

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/logout" component={LogOut} />
          <ProtectedRoute path="/admin" component={Admin} />
          <UserRoute path="/user" component={User} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" to="/home" exact />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
