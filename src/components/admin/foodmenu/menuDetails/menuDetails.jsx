import React, { Component } from "react";
import {
  GetFoodMenu,
  DeleteItem
} from "../../../../service/foodMenuService/foodMenuService";
import _ from "lodash";
import Table from "./../../../table/table";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import Spiner from "../../../spiner/spiner";
import { getUserRole } from "../../../../service/authService/authService";

class MenuDetails extends Component {
  state = {
    menu: {},
    currentOrder: {
      name: "name",
      order: "asc"
    },
    query: "",
    loader: false
  };

  headerNames = [
    { label: "Food Name", path: "name" },
    { label: "Price/Kg", path: "pricePerKg" },
    { label: "People/Kg", path: "peoplePerKg" },
    { label: "Price/Head", path: "pricePerHead" },
    {
      key: "delete",
      content: item => (
        <span
          className="btn btn-danger hover"
          onClick={() => this.handelDelete(item)}
        >
          Delete
        </span>
      )
    },
    {
      key: "update",
      content: item => (
        <span
          className="btn btn-primary hover"
          onClick={() => this.redirectTo(item)}
        >
          Update
        </span>
      )
    }
  ];

  redirectTo = item => {
    this.props.history.push("/admin/addfood/" + item.id);
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ loader: true });
    try {
      const { data: menu } = await GetFoodMenu(id);
      this.setState({ menu, loader: false });
    } catch (error) {}
  }

  handelOrder = path => {
    const currentOrder = { ...this.state.currentOrder };
    if (currentOrder.name === path && currentOrder.order === "asc")
      currentOrder.order = "desc";
    else currentOrder.order = "asc";

    currentOrder.name = path;

    this.setState({ currentOrder });
  };
  handelDelete = async item => {
    try {
      const { menu } = this.state;
      const foodItems = menu.foodItems.filter(f => f.id !== item.id);
      menu.foodItems = foodItems;

      const data = {
        menuId: menu.id,
        itemId: item.id
      };
      await DeleteItem(data);
      this.setState({ menu });
    } catch (error) {}
  };
  render() {
    const { menu, loader } = this.state;
    const { currentOrder } = this.state;
    const { foodItems: data } = menu;

    const foodItems = _.orderBy(data, currentOrder.name, currentOrder.order);
    return (
      <div className="white-section">
        <div className="enter-padding">
          <Spiner loader={loader} />
          <div className="text-center section-title">
            <Link to={"/admin/addmenu/" + menu.id}>{menu.name}</Link>
          </div>
          <Table
            headerNames={this.headerNames}
            onDelete={this.handelDelete}
            data={foodItems}
            redirectTo={this.redirectTo}
            orderBy={this.handelOrder}
          />
          <div>
            Total Price <bold className="price">{menu.fullPrice}</bold>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuDetails;
