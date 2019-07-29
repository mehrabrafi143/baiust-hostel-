import React, { Component } from "react";
import Select from "react-dropdown-select";
import { GetFoodItems } from "../../../service/FoodItemServices/foodItemServices";
import Input from "./../../form-elements/input";
import Loader from "react-loader-spinner";
import {
  AddFoodMenu,
  GetFoodMenu
} from "./../../../service/foodMenuService/foodMenuService";

class FoodMenuForm extends Component {
  state = {
    foodItems: [],
    data: {
      id: 0,
      name: "",
      servicePrice: "",
      foodItemsId: []
    },
    selectedItems: [],
    genericErrors: "",
    servicePriceError: "",
    loader: false
  };

  async componentDidMount() {
    const { data: foodItems } = await GetFoodItems();
    this.setState({ foodItems });
    try {
      const id = this.props.match.params.id;
      if (id) {
        this.setState({ loader: true });
        const { data } = (await GetFoodMenu(id)) || {};
        const foodItemsId = [];
        data.foodItems.map(f => foodItemsId.push(f.id));
        this.setState({
          data: {
            id: id,
            name: data.name,
            foodItemsId,
            servicePrice: data.servicePrice
          },
          selectedItems: data.foodItems,
          loader: false
        });
      }
    } catch (error) {}
  }

  setValue = v => {
    const { data } = this.state;
    if (v) {
      data.foodItemsId = [];
      v.map(f => {
        if (!data.foodItemsId.includes(f.id)) data.foodItemsId.push(f.id);
      });
      this.setState({ data, selectedItems: [...v] });
    }
  };

  handelChange = ({ currentTarget }) => {
    this.setState({ genericErrors: "" });
    const { name, value } = currentTarget;
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
  };

  validate = () => {
    return (
      this.state.data.name &&
      this.state.data.foodItemsId.length &&
      this.state.data.servicePrice &&
      !this.state.genericErrors
    );
  };

  handelChangeServicePrice = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    if (isNaN(value)) {
      this.setState({ servicePriceError: "value must be a number" });
    } else {
      this.setState({ servicePriceError: null });
    }
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
  };

  doSubmit = async () => {
    this.setState({ loader: true });
    try {
      const { data } = await AddFoodMenu(this.state.data);
      this.props.history.push("/admin/foodmenu/" + data.id);
      if (data) this.setState({ loader: false });
    } catch (error) {
      this.setState({ genericErrors: error.response.data.message });
    }
  };

  render() {
    const { loader, data, foodItems, genericErrors } = this.state;

    return (
      <div className="container mt-4">
        <div className="row section-card section-card-md">
          <div className="col-6">
            {loader ? (
              <div className="full-body">
                <div className="center">
                  <Loader type="Oval" color="#1B3A5E" height={60} width={60} />
                </div>
              </div>
            ) : null}
            <h2 className="mt-2"> Create Menu </h2>
            <p className="text-danger">
              {genericErrors ? genericErrors : null}
            </p>
            <form className="form" onSubmit={e => e.preventDefault()}>
              <Input
                name="name"
                value={data.name}
                label="Enter Name"
                onChange={this.handelChange}
              />
              <div className="form-group">
                <Select
                  multi
                  create
                  placeholder="Select Food Items"
                  labelField="name"
                  valueField="id"
                  options={foodItems}
                  values={this.state.selectedItems}
                  onChange={v => this.setValue(v)}
                  className="form-input"
                />
              </div>
              <Input
                name="servicePrice"
                value={data.servicePrice}
                error={this.state.servicePriceError}
                label="Service Price"
                onChange={this.handelChangeServicePrice}
              />
              <button
                className="btn btn-primary mt-3"
                type="submit"
                disabled={!this.validate()}
                onClick={this.doSubmit}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodMenuForm;
