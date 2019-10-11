import React from "react";
import Form from "./../../form/form";
import Joi from "joi-browser";
import {
  AddFoodItem,
  GetFoodItem
} from "./../../../service/FoodItemServices/foodItemServices";
import Loader from "react-loader-spinner";
import Spiner from "./../../spiner/spiner";
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
    genericErrors: "",
    id: 0,
    loader: false
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      if (id) {
        const { data } = (await GetFoodItem(id)) || {};
        this.setState({ id: data.id });
        this.setState({
          data: {
            name: data.name,
            pricePerKg: data.pricePerKg || "",
            peoplePerKg: data.peoplePerKg || ""
          }
        });
      }
    } catch (error) {}
  }

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
    if (data.peoplePerKg.toString().trim() === "") errors.peoplePerKg = "";
    if (data.pricePerKg.toString().trim() === "") errors.pricePerKg = "";
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
    if (data.peoplePerKg.toString().trim() === "") delete errors.peoplePerKg;
    if (data.pricePerKg.toString().trim() === "") delete errors.pricePerKg;
    return Object.keys(errors).length === 0 ? null : errors;
  };

  dosubmit = async () => {
    try {
      const data = { ...this.state.data };
      data.id = this.state.id;
      await AddFoodItem(data);
      this.props.history.goBack();
    } catch (error) {
      console.log();
      this.ShowCustomeServerErrors(error.response);
      this.setState({ loader: false });
    }
  };

  render() {
    const { data, errors, loader } = this.state;
    return (
      <div className="white-section">
        <Spiner loader={loader} />
        <div className="enter-padding">
          <h2 className="section-title"> Add Food Item </h2>
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
    );
  }
}

export default FoodIteFrom;
