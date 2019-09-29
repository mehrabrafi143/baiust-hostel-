import React, { Component } from "react";
import Table from "../../table/table";
import { Link } from "react-router-dom";
import Spiner from "./../../spiner/spiner";
import { GetFoodMenu } from "./../../../service/foodMenuService/foodMenuService";

class MenuDetailsUser extends Component {
  state = {
    menu: {},
    loader: true,
    foodItems: []
  };

  headerNames = [
    { label: "Food Name", path: "name" },
    { label: "Price/Kg", path: "pricePerKg" },
    { label: "People/Kg", path: "peoplePerKg" },
    { label: "Price/Head", path: "pricePerHead" }
  ];

  async componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ loader: true });
    try {
      const { data: menu } = await GetFoodMenu(id);
      const { foodItems } = menu;
      if (menu) this.setState({ menu, foodItems, loader: false });
    } catch (error) {}
  }

  render() {
    const { menu, loader, foodItems } = this.state;
    return (
      <div className="user-section">
        <Spiner loader={loader} />
        <div className="text-center section-title">
          <Link to={""}>{menu.name}</Link>
        </div>
        <Table headerNames={this.headerNames} data={foodItems} />
        <div>
          Total Price <bold className="price">{menu.fullPrice}</bold>
        </div>
      </div>
    );
  }
}

export default MenuDetailsUser;
