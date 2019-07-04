import React from "react";
import Form from "./../../form/form";
import Joi from "joi-browser";
import { AddFoodItem } from "./../../../service/FoodItemServices/foodItemServices";

class FoodIteFrom extends Form {
  state = {
    data: {
      name: "",
      pricePerKg: "",
      peoplePerKg: ""
    },

    errors: {
      name: "",
      pricePerKg: "",
      peoplePerKg: ""
    },
    genericErrors: ""
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    pricePerKg: Joi.number().label("Price/Kg"),
    peoplePerKg: Joi.number().label("People/Kg")
  };

  handelChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
    const error = this.validateProperty(currentTarget);
    const errors = { ...this.state.errors };
    errors[name] = error;
    if (data.peoplePerKg.trim() === "") errors.peoplePerKg = "";
    if (data.pricePerKg.trim() === "") errors.pricePerKg = "";
    this.setState({ errors });
  };

  validate = () => {
    const { data } = this.state;
    const option = { abortEarly: false };
    const errors = {};
    const { error } = Joi.validate(this.state.data, this.schema, option);
    if (error) {
      error.details.map(e => (errors[e.path[0]] = e.message));
    }
    if (data.peoplePerKg.trim() === "") delete errors.peoplePerKg;
    if (data.pricePerKg.trim() === "") delete errors.pricePerKg;
    return Object.keys(errors).length === 0 ? null : errors;
  };

  dosubmit = async () => {
    try {
      await AddFoodItem(this.state.data);
    } catch (error) {
      console.log();
      this.ShowCustomeServerErrors(error.response);
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-1" />
          <div className="col-6">
            <h2> Add Food Item </h2>
            <p className="form-text text-danger">{this.state.genericErrors}</p>
            <form className="form" onSubmit={this.handelSubmit}>
              {this.renderInput(
                "name",
                data.name,
                "Enter Food Name",
                errors.name
              )}
              {this.renderInput(
                "pricePerKg",
                data.pricePerKg,
                "Enter Price/Kg (optional)",
                errors.pricePerKg
              )}
              {this.renderInput(
                "peoplePerKg",
                data.peoplePerKg,
                "Enter People/Kg (optional)",
                errors.peoplePerKg
              )}
              {this.renderButton("Add")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodIteFrom;
