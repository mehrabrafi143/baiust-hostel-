import React from "react";
import Joi from "joi-browser";
import { PasswordChange } from "../../../service/authService/authService";
import Loader from "react-loader-spinner";
import Form from "./../../form/form";

class ChangePassword extends Form {
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
      this.props.history.push("/admin/studentform/" + data);
    } catch (error) {
      this.ShowServerErrors(error);
      this.setState({ loader: false });
    }
  };

  render() {
    const { data, errors, loader } = this.state;

    return (
      <div className="user-section">
        <div className="container">
          <div className="">
            {loader ? (
              <div className="full-body">
                <div className="center">
                  <Loader type="Oval" color="#1B3A5E" height={60} width={60} />
                </div>
              </div>
            ) : null}
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
      </div>
    );
  }
}

export default ChangePassword;
