import React from "react";
import Joi from "joi-browser";
import Form from "../form/form";
import { registration } from "../../service/authService/authService";
import Loader from "react-loader-spinner";

class RegistrationForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    errors: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    loader: false
  };

  schema = {
    email: Joi.string()
      .required()
      .min(5)
      .max(50)
      .label("Email"),
    password: Joi.string()
      .required()
      .min(6)
      .label("password"),
    confirmPassword: Joi.string()
      .required()
      .min(6)
      .label("password")
  };

  dosubmit = async () => {
    this.setState({ loader: true });
    try {
      const { data } = await registration(this.state.data);
      this.props.history.push("/admin/studentform/" + data);
    } catch (error) {
      this.ShowServerErrors(error);
    }
  };

  render() {
    const { data, errors, loader } = this.state;

    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-6">
            {loader ? (
              <div className="full-body">
                <div className="center">
                  <Loader type="Oval" color="#1B3A5E" height={60} width={60} />
                </div>
              </div>
            ) : null}
            <h2> Registration Form </h2>
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
              {this.renderInput(
                "confirmPassword",
                data.confirmPassword,
                "Confirm password",
                errors.confirmPassword,
                "password"
              )}
              {this.renderButton("Register")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
