import React from "react";
import Joi from "joi-browser";
import { PasswordChange } from "../../../service/authService/authService";
import Form from "./../../form/form";
import Spiner from "./../../spiner/spiner";

class ChangePasswordAdmin extends Form {
  state = {
    data: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    errors: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    loader: false
  };

  schema = {
    oldPassword: Joi.string()
      .required()
      .min(5)
      .max(50)
      .label("Old Password"),
    newPassword: Joi.string()
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
      const { data } = await PasswordChange(this.state.data);
      this.props.history.push("/admin/" + data);
    } catch (error) {
      this.ShowServerErrors(error);
      this.setState({ loader: false });
    }
  };

  render() {
    const { data, errors, loader } = this.state;

    return (
      <div className="white-section">
        <div className="enter-padding">
          <Spiner loader={loader} />
          <h2 className="user-section_title"> Change Password </h2>
          <p className="form-text text-danger">{this.state.genericErrors}</p>
          <form className=" form-section" onSubmit={this.handelSubmit}>
            {this.renderInput(
              "oldPassword",
              data.oldPassword,
              "Enter Old Password",
              errors.oldPassword,
              "oldPassword"
            )}
            {this.renderInput(
              "newPassword",
              data.newPassword,
              "Enter New Password",
              errors.newPassword,
              "password"
            )}
            {this.renderInput(
              "confirmPassword",
              data.confirmPassword,
              "Confirm newPassword",
              errors.confirmPassword,
              "password"
            )}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default ChangePasswordAdmin;
