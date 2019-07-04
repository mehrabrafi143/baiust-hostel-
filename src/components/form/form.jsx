import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../form-elements/input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    genericErrors: ""
  };
  handelSubmit = e => {
    e.preventDefault();
    const errors = this.validate() || {};
    this.setState({ errors });
    this.dosubmit();
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const scehma = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, scehma);

    return error ? error.details[0].message : "";
  };

  ShowCustomeServerErrors = ({ data }) => {
    this.setState({ genericErrors: data.message });
  };
  validate = () => {
    const option = { abortEarly: false };
    const errors = {};
    const { error } = Joi.validate(this.state.data, this.schema, option);
    if (error) {
      error.details.map(e => (errors[e.path[0]] = e.message));
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handelChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
    const error = this.validateProperty(currentTarget);
    const errors = { ...this.state.errors };
    errors[name] = error;
    this.setState({ errors });
  };

  ShowServerErrors = error => {
    if (error && error.response) {
      const model = error.response.data.modelState;
      const key = Object.keys(model);
      const genericErrors = key[0].length !== undefined ? model[key[0]] : "";
      this.setState({ genericErrors });
    }
  };

  renderButton(label) {
    return (
      <button
        type="submit"
        disabled={this.validate()}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderInput = (name, value, label, error, type) => {
    return (
      <Input
        name={name}
        value={value}
        type={type}
        label={label}
        error={error}
        onChange={this.handelChange}
      />
    );
  };
}

export default Form;
