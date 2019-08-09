import React from "react";
import Form from "../form/form";
import Joi from "joi-browser";
import { login } from "./../../service/authService/authService";
import Spiner from "../spiner/spiner";
import {
  getUserName,
  getUserRole
} from "../../service/authService/authService";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {
      email: "",
      password: ""
    },
    loader: false
  };

  schema = {
    email: Joi.string().required(),
    password: Joi.string().required()
  };

  handelChangePage = () => {
    const user = getUserName(),
      role = getUserRole();
    if (!user) return this.props.history.push("/login");
    let location = "";
    location = user && role === "Amoi" ? "/admin" : "/user";
    this.props.history.push(location);
  };

  handelRedirect = () => {
    const user = getUserName(),
      role = getUserRole();
    if (!user) return (window.location = "/login");

    return (window.location = user && role === "Amoi" ? "/admin" : "/user");
  };

  dosubmit = async () => {
    this.setState({ loader: true });
    const response = await login(this.state.data);

    response
      ? this.setState({
          loader: false,
          genericErrors: response
        })
      : this.handelRedirect();
  };

  componentDidMount() {
    this.handelChangePage();
  }

  render() {
    const { data, errors } = this.state;
    return (
      <div className=" login-form">
        <Spiner loader={this.state.loader} />
        <div className="row login-form__body">
          <div className="col-6 login-form__blue-body">
            <div className="login-form__blue-body-content">
              <h1 className="login-form__blue-body-content-header">
                Welcome
                <div className="login-form__blue-body-content-header-border" />
              </h1>

              <p className="login-form__blue-body-content-des">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.{" "}
              </p>
            </div>
          </div>
          <div className="col-6 login-form__white-body">
            <div className="login-form__white-body-content">
              <h2 className="login-form__white-body-content-header">
                Login Form
              </h2>
              <p className="form-text text-danger">
                {this.state.genericErrors}
              </p>
              <form className="form" onSubmit={this.handelSubmit}>
                {this.renderInput(
                  "email",
                  data.email,
                  "Enter email",
                  errors.email,
                  "email"
                )}
                {this.renderInput(
                  "password",
                  data.password,
                  "Enter password",
                  errors.password,
                  "password"
                )}
                {this.renderButton("Log in")}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
