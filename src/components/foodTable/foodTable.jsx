import React, { Component } from "react";
import Table from "./../table/table";
import { GetFoodItems } from "../../service/FoodItemServices/foodItemServices";
import { DeleteItem } from "./../../service/FoodItemServices/foodItemServices";

class FoodItemTable extends Component {
  state = {
    data: []
  };

  headerNames = [
    { label: "Food Name", path: "name" },
    { label: "Price/Kg", path: "pricePerKg" },
    { label: "People/Kg", path: "peoplePerKg" },
    { label: "Price/Head", path: "pricePerHead" }
  ];

  handelDelete = async item => {
    const originalState = this.state.data;
    try {
      let data = [...this.state.data];
      data = data.filter(d => d.id !== item.id);
      this.setState({ data });
      await DeleteItem(item.id);
    } catch (error) {
      this.setState({ data: originalState });
      console.log(error);
    }
  };

  redirectTo = item => {
    this.props.history.push("/admin/add-food/" + item.id);
  };

  async componentDidMount() {
    try {
      const { data } = await GetFoodItems();
      this.setState({ data });
    } catch (error) {
      console.log(error.response);
    }
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-1" />
          <div className="col">
            <h2 className="section-title">Food Items</h2>
            <Table
              headerNames={this.headerNames}
              onDelete={this.handelDelete}
              data={this.state.data}
              redirectTo={this.redirectTo}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FoodItemTable;
