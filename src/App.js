import React from "react";
import MainNavBar from "./components/mainNavBar/mainnavbar";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login/login";
import Admin from "./components/admin/admin";
import NotFound from "./components/not-found/notFound";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <MainNavBar />
      <Switch>
        <Route path="/registration" component={RegistrationForm} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" exact to="/admin" />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
