import React from "react";
import Form from "../form/form";
import Joi from "joi-browser";
import { login } from "./../../service/authService/authService";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {
      email: "",
      password: ""
    }
  };

  schema = {
    email: Joi.string().required(),
    password: Joi.string().required()
  };

  dosubmit = async () => {
    try {
      const { data } = await login(this.state.data);
      localStorage.setItem("token", data.access_token);
      this.props.history.push("/");
    } catch (error) {
      this.setState({
        genericErrors: "Username and password don't match!"
      });
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-6">
            <h2> Login Form </h2>
            <p className="form-text text-danger">{this.state.genericErrors}</p>
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
    );
  }
}

export default Login;
